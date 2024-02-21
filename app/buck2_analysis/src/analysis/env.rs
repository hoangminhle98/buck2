/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under both the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree and the Apache
 * License, Version 2.0 found in the LICENSE-APACHE file in the root directory
 * of this source tree.
 */

use std::collections::HashMap;
use std::future::Future;
use std::sync::Arc;

use anyhow::Context;
use buck2_build_api::analysis::extra_v::AnalysisExtraValue;
use buck2_build_api::analysis::extra_v::FrozenAnalysisExtraValue;
use buck2_build_api::analysis::registry::AnalysisRegistry;
use buck2_build_api::analysis::AnalysisResult;
use buck2_build_api::deferred::types::DeferredTable;
use buck2_build_api::interpreter::rule_defs::cmd_args::value::FrozenCommandLineArg;
use buck2_build_api::interpreter::rule_defs::context::AnalysisContext;
use buck2_build_api::interpreter::rule_defs::provider::builtin::template_placeholder_info::FrozenTemplatePlaceholderInfo;
use buck2_build_api::interpreter::rule_defs::provider::collection::FrozenProviderCollectionValue;
use buck2_build_api::interpreter::rule_defs::provider::collection::ProviderCollection;
use buck2_core::base_deferred_key::BaseDeferredKey;
use buck2_core::execution_types::execution::ExecutionPlatformResolution;
use buck2_core::provider::label::ConfiguredProvidersLabel;
use buck2_core::target::configured_target_label::ConfiguredTargetLabel;
use buck2_core::unsafe_send_future::UnsafeSendFuture;
use buck2_events::dispatch::get_dispatcher;
use buck2_execute::digest_config::HasDigestConfig;
use buck2_interpreter::dice::starlark_provider::with_starlark_eval_provider;
use buck2_interpreter::error::BuckStarlarkError;
use buck2_interpreter::print_handler::EventDispatcherPrintHandler;
use buck2_interpreter::starlark_profiler::StarlarkProfileModeOrInstrumentation;
use buck2_interpreter::starlark_profiler::StarlarkProfiler;
use buck2_interpreter::starlark_profiler::StarlarkProfilerOrInstrumentation;
use buck2_interpreter::types::rule::FROZEN_PROMISE_ARTIFACT_MAPPINGS_GET_IMPL;
use buck2_interpreter::types::rule::FROZEN_RULE_GET_IMPL;
use buck2_node::nodes::configured::ConfiguredTargetNodeRef;
use buck2_node::rule_type::StarlarkRuleType;
use dice::DiceComputations;
use dupe::Dupe;
use starlark::environment::FrozenModule;
use starlark::environment::Module;
use starlark::eval::Evaluator;
use starlark::values::Value;
use starlark::values::ValueTyped;
use starlark_map::small_map::SmallMap;

use crate::analysis::plugins::plugins_to_starlark_value;
use crate::attrs::resolve::ctx::AnalysisQueryResult;
use crate::attrs::resolve::ctx::AttrResolutionContext;
use crate::attrs::resolve::node_to_attrs_struct::node_to_attrs_struct;

#[derive(buck2_error::Error, Debug)]
enum AnalysisError {
    #[error(
        "Analysis context was missing a query result, this shouldn't be possible. Query was `{0}`"
    )]
    MissingQuery(String),
    #[error("required dependency `{0}` was not found")]
    MissingDep(ConfiguredProvidersLabel),
    #[error("provider_collection already set (internal error)")]
    ProviderCollectionAlreadySet,
}

// Contains a `module` that things must live on, and various `FrozenProviderCollectionValue`s
// that are NOT tied to that module. Must claim ownership of them via `add_reference` before returning them.
pub struct RuleAnalysisAttrResolutionContext<'v> {
    pub module: &'v Module,
    pub dep_analysis_results: HashMap<&'v ConfiguredTargetLabel, FrozenProviderCollectionValue>,
    pub query_results: HashMap<String, Arc<AnalysisQueryResult>>,
    pub execution_platform_resolution: ExecutionPlatformResolution,
}

impl<'v> AttrResolutionContext<'v> for RuleAnalysisAttrResolutionContext<'v> {
    fn starlark_module(&self) -> &'v Module {
        self.module
    }

    fn get_dep(
        &self,
        target: &ConfiguredProvidersLabel,
    ) -> anyhow::Result<FrozenProviderCollectionValue> {
        get_dep(&self.dep_analysis_results, target, self.module)
    }

    fn resolve_unkeyed_placeholder(
        &self,
        name: &str,
    ) -> anyhow::Result<Option<FrozenCommandLineArg>> {
        Ok(resolve_unkeyed_placeholder(
            &self.dep_analysis_results,
            name,
            self.module,
        ))
    }

    fn resolve_query(&self, query: &str) -> buck2_error::Result<Arc<AnalysisQueryResult>> {
        resolve_query(&self.query_results, query, self.module)
    }

    fn execution_platform_resolution(&self) -> &ExecutionPlatformResolution {
        &self.execution_platform_resolution
    }
}

pub fn get_dep<'v>(
    dep_analysis_results: &HashMap<&'v ConfiguredTargetLabel, FrozenProviderCollectionValue>,
    target: &ConfiguredProvidersLabel,
    module: &'v Module,
) -> anyhow::Result<FrozenProviderCollectionValue> {
    match dep_analysis_results.get(target.target()) {
        None => Err(AnalysisError::MissingDep(target.clone()).into()),
        Some(x) => {
            let x = x.lookup_inner(target)?;
            // IMPORTANT: Anything given back to the user must be kept alive
            module.frozen_heap().add_reference(x.value().owner());
            Ok(x.dupe())
        }
    }
}

pub fn resolve_unkeyed_placeholder<'v>(
    dep_analysis_results: &HashMap<&'v ConfiguredTargetLabel, FrozenProviderCollectionValue>,
    name: &str,
    module: &'v Module,
) -> Option<FrozenCommandLineArg> {
    // TODO(cjhopman): Make it an error if two deps provide a value for the placeholder.
    for providers in dep_analysis_results.values() {
        if let Some(placeholder_info) = providers
            .provider_collection()
            .builtin_provider::<FrozenTemplatePlaceholderInfo>()
        {
            if let Some(value) = placeholder_info.unkeyed_variables().get(name) {
                // IMPORTANT: Anything given back to the user must be kept alive
                module
                    .frozen_heap()
                    .add_reference(providers.value().owner());
                return Some(*value);
            }
        }
    }
    None
}

pub fn resolve_query<'v>(
    query_results: &HashMap<String, Arc<AnalysisQueryResult>>,
    query: &str,
    module: &'v Module,
) -> buck2_error::Result<Arc<AnalysisQueryResult>> {
    match query_results.get(query) {
        None => Err(anyhow::anyhow!(AnalysisError::MissingQuery(query.to_owned())).into()),
        Some(x) => {
            for (_, y) in x.result.iter() {
                // IMPORTANT: Anything given back to the user must be kept alive
                module.frozen_heap().add_reference(y.value().owner());
            }
            Ok(x.dupe())
        }
    }
}

pub trait RuleSpec: Sync {
    fn invoke<'v>(
        &self,
        eval: &mut Evaluator<'v, '_>,
        ctx: ValueTyped<'v, AnalysisContext<'v>>,
    ) -> anyhow::Result<Value<'v>>;

    fn promise_artifact_mappings<'v>(
        &self,
        eval: &mut Evaluator<'v, '_>,
    ) -> anyhow::Result<SmallMap<String, Value<'v>>>;
}

/// Container for the environment that analysis implementation functions should run in
struct AnalysisEnv<'a> {
    rule_spec: &'a dyn RuleSpec,
    deps: HashMap<&'a ConfiguredTargetLabel, FrozenProviderCollectionValue>,
    query_results: HashMap<String, Arc<AnalysisQueryResult>>,
    execution_platform: &'a ExecutionPlatformResolution,
    label: ConfiguredTargetLabel,
}

pub(crate) async fn run_analysis<'a>(
    dice: &'a mut DiceComputations<'_>,
    label: &ConfiguredTargetLabel,
    results: Vec<(&'a ConfiguredTargetLabel, AnalysisResult)>,
    query_results: HashMap<String, Arc<AnalysisQueryResult>>,
    execution_platform: &'a ExecutionPlatformResolution,
    rule_spec: &'a dyn RuleSpec,
    node: ConfiguredTargetNodeRef<'a>,
    profile_mode: &'a StarlarkProfileModeOrInstrumentation,
) -> anyhow::Result<AnalysisResult> {
    let analysis_env =
        AnalysisEnv::new(label, results, query_results, execution_platform, rule_spec)?;
    run_analysis_with_env(dice, analysis_env, node, profile_mode).await
}

impl<'a> AnalysisEnv<'a> {
    /// Create a new `AnalysisEnv`, ensuring that all heaps are kept alive that need to be
    fn new(
        label: &ConfiguredTargetLabel,
        results: Vec<(&'a ConfiguredTargetLabel, AnalysisResult)>,
        query_results: HashMap<String, Arc<AnalysisQueryResult>>,
        execution_platform: &'a ExecutionPlatformResolution,
        rule_spec: &'a dyn RuleSpec,
    ) -> anyhow::Result<Self> {
        Ok(AnalysisEnv {
            rule_spec,
            deps: get_deps_from_analysis_results(results)?,
            query_results,
            execution_platform,
            label: label.dupe(),
        })
    }
}

pub fn get_deps_from_analysis_results<'v>(
    results: Vec<(&'v ConfiguredTargetLabel, AnalysisResult)>,
) -> anyhow::Result<HashMap<&'v ConfiguredTargetLabel, FrozenProviderCollectionValue>> {
    results
        .into_iter()
        .map(|(label, result)| Ok((label, result.providers().dupe())))
        .collect::<anyhow::Result<HashMap<&ConfiguredTargetLabel, FrozenProviderCollectionValue>>>()
}

fn run_analysis_with_env<'a, 'd: 'a>(
    dice: &'a mut DiceComputations<'d>,
    analysis_env: AnalysisEnv<'a>,
    node: ConfiguredTargetNodeRef<'a>,
    profile_mode: &'a StarlarkProfileModeOrInstrumentation,
) -> impl Future<Output = anyhow::Result<AnalysisResult>> + Send + 'a {
    let dice = &*dice;
    let fut = async move {
        run_analysis_with_env_underlying(&mut dice.bad_dice(), analysis_env, node, profile_mode)
            .await
    };
    unsafe { UnsafeSendFuture::new_encapsulates_starlark(fut) }
}

async fn run_analysis_with_env_underlying(
    dice: &mut DiceComputations<'_>,
    analysis_env: AnalysisEnv<'_>,
    node: ConfiguredTargetNodeRef<'_>,
    profile_mode: &StarlarkProfileModeOrInstrumentation,
) -> anyhow::Result<AnalysisResult> {
    let env = Module::new();
    let print = EventDispatcherPrintHandler(get_dispatcher());

    let (attributes, plugins) = {
        let resolution_ctx = RuleAnalysisAttrResolutionContext {
            module: &env,
            dep_analysis_results: analysis_env.deps,
            query_results: analysis_env.query_results,
            execution_platform_resolution: node.execution_platform_resolution().clone(),
        };

        (
            node_to_attrs_struct(node, &resolution_ctx)?,
            plugins_to_starlark_value(node, &resolution_ctx)?,
        )
    };

    let registry = AnalysisRegistry::new_from_owner(
        BaseDeferredKey::TargetLabel(node.label().dupe()),
        analysis_env.execution_platform.dupe(),
    )?;

    let mut profiler_opt = profile_mode
        .profile_mode()
        .map(|profile_mode| StarlarkProfiler::new(profile_mode.dupe(), true));

    let mut profiler = match &mut profiler_opt {
        None => StarlarkProfilerOrInstrumentation::disabled(),
        Some(profiler) => StarlarkProfilerOrInstrumentation::for_profiler(profiler),
    };

    let (dice, mut eval, ctx, list_res) = with_starlark_eval_provider(
        dice,
        &mut profiler,
        format!("analysis:{}", node.label()),
        |provider, dice| {
            let (mut eval, _) = provider.make(&env)?;
            eval.set_print_handler(&print);

            let ctx = AnalysisContext::prepare(
                eval.heap(),
                attributes,
                Some(analysis_env.label),
                plugins.into(),
                registry,
                dice.global_data().get_digest_config(),
            );

            let list_res = analysis_env.rule_spec.invoke(&mut eval, ctx)?;

            // TODO(cjhopman): This seems quite wrong. This should be happening after run_promises.
            provider
                .evaluation_complete(&mut eval)
                .context("Profiler finalization failed")?;
            // TODO(cjhopman): This is gross, but we can't await on running the promises within
            // the with_starlark_eval_provider scoped thing (as we may be holding a debugger
            // permit, running the promises may require doing more starlark evaluation which in
            // turn requires those permits). We will actually re-enter a provider scope in the
            // run_promises call when we get back to resolving the promises (and running the starlark
            // Promise::map() lambdas).
            Ok((dice, eval, ctx, list_res))
        },
    )
    .await?;

    ctx.actions
        .run_promises(
            dice,
            &mut eval,
            format!("anon_analysis$promises:{}", node.label()),
        )
        .await?;

    // TODO: Convert the ValueError from `try_from_value` better than just printing its Debug
    let res_typed = ProviderCollection::try_from_value(list_res)?;
    {
        let extra_v = AnalysisExtraValue::get_or_init(&env)?;
        if extra_v.provider_collection.get().is_some() {
            return Err(AnalysisError::ProviderCollectionAlreadySet.into());
        }
        extra_v
            .provider_collection
            .get_or_init(|| env.heap().alloc_typed(res_typed));
    }

    // Pull the ctx object back out, and steal ctx.action's state back
    let analysis_registry = ctx.take_state();
    std::mem::drop(eval);
    let (frozen_env, deferreds) = analysis_registry.finalize(&env)?(env)?;

    profiler
        .visit_frozen_module(Some(&frozen_env))
        .context("Profiler heap visitation failed")?;

    let profile_data = profiler_opt.map(|p| p.finish()).transpose()?.map(Arc::new);

    let extra_v = FrozenAnalysisExtraValue::get(&frozen_env)?;
    let provider_collection = extra_v.try_map(|extra_v| {
        extra_v
            .provider_collection
            .context("provider_collection must be set (internal error)")
    })?;
    let provider_collection = FrozenProviderCollectionValue::from_value(provider_collection);

    // this could look nicer if we had the entire analysis be a deferred
    let deferred = DeferredTable::new(deferreds.take_result()?);
    Ok(AnalysisResult::new(
        provider_collection,
        deferred,
        profile_data,
        HashMap::new(),
    ))
}

pub fn get_user_defined_rule_spec(
    module: FrozenModule,
    rule_type: &StarlarkRuleType,
) -> impl RuleSpec {
    struct Impl {
        module: FrozenModule,
        name: String,
    }

    impl RuleSpec for Impl {
        fn invoke<'v>(
            &self,
            eval: &mut Evaluator<'v, '_>,
            ctx: ValueTyped<'v, AnalysisContext<'v>>,
        ) -> anyhow::Result<Value<'v>> {
            let rule_callable = self
                .module
                .get_any_visibility(&self.name)
                .with_context(|| format!("Couldn't find rule `{}`", self.name))?
                .0;
            let rule_impl = {
                // Need to free up the starlark_ctx borrow before we return
                let rule_callable = rule_callable.owned_value(eval.frozen_heap());
                let rule_callable = rule_callable
                    .unpack_frozen()
                    .context("Must be frozen (internal error)")?;

                (FROZEN_RULE_GET_IMPL.get()?)(rule_callable)?
            };
            eval.eval_function(rule_impl.to_value(), &[ctx.to_value()], &[])
                .map_err(|e| BuckStarlarkError::new(e).into())
        }

        fn promise_artifact_mappings<'v>(
            &self,
            eval: &mut Evaluator<'v, '_>,
        ) -> anyhow::Result<SmallMap<String, Value<'v>>> {
            let rule_callable = self
                .module
                .get_any_visibility(&self.name)
                .with_context(|| format!("Couldn't find rule `{}`", self.name))?
                .0;
            let frozen_promise_artifact_mappings = {
                // Need to free up the starlark_ctx borrow before we return
                let rule_callable = rule_callable.owned_value(eval.frozen_heap());
                let rule_callable = rule_callable
                    .unpack_frozen()
                    .context("Must be frozen (internal error)")?;

                (FROZEN_PROMISE_ARTIFACT_MAPPINGS_GET_IMPL.get()?)(rule_callable)?
            };

            Ok(frozen_promise_artifact_mappings
                .iter()
                .map(|(frozen_string, frozen_func)| {
                    (frozen_string.to_string(), frozen_func.to_value())
                })
                .collect::<SmallMap<_, _>>())
        }
    }

    Impl {
        module,
        name: rule_type.name.clone(),
    }
}
