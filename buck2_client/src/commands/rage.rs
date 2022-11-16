/*
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under both the MIT license found in the
 * LICENSE-MIT file in the root directory of this source tree and the Apache
 * License, Version 2.0 found in the LICENSE-APACHE file in the root directory
 * of this source tree.
 */

#![allow(clippy::needless_return)] // FIXME?

use std::path::Path;

use anyhow::Context;
use async_trait::async_trait;
use buck2_client_ctx::client_ctx::ClientCommandContext;
use buck2_client_ctx::common::CommonBuildConfigurationOptions;
use buck2_client_ctx::common::CommonConsoleOptions;
use buck2_client_ctx::common::CommonDaemonCommandOptions;
use buck2_client_ctx::daemon::client::BuckdClientConnector;
use buck2_client_ctx::exit_result::ExitResult;
use buck2_client_ctx::find_certs::find_tls_cert;
use buck2_client_ctx::streaming::StreamingCommand;
use buck2_client_ctx::subscribers::event_log::file_names::get_local_logs;
use buck2_client_ctx::subscribers::event_log::upload::log_upload_url;
use buck2_client_ctx::subscribers::event_log::EventLogPathBuf;
use buck2_client_ctx::subscribers::event_log::EventLogSummary;
use buck2_core::fs::fs_util::create_dir_all;
use buck2_core::fs::fs_util::remove_dir_all;
use buck2_core::process::async_background_command;
use buck2_core::process::background_command;
use buck2_data::RageInvoked;
use buck2_events::dispatch::EventDispatcher;
use buck2_events::metadata;
use buck2_events::sink::scribe::new_thrift_scribe_sink_if_enabled;
use buck2_events::trace::TraceId;
use chrono::offset::Local;
use chrono::DateTime;
use cli_proto::unstable_dice_dump_request::DiceDumpFormat;
use cli_proto::UnstableDiceDumpRequest;
use futures::stream::FuturesOrdered;
use futures::TryStreamExt;
use thiserror::Error;
use tokio::io::AsyncBufRead;
use tokio::io::AsyncBufReadExt;
use tokio::io::BufReader;

#[derive(Debug, Error)]
enum ManifoldUploadError {
    #[error("Failed to upload dice dump folder `{0}` to manifold with exit code {1}")]
    ManifoldUploadWithExitCodeError(String, i32),
    #[error("Failed to upload dice dump folder `{0}` to manifold due to signal interrupt")]
    ManifoldUploadSignalInterruptError(String),
}

#[derive(Debug, clap::Parser)]
#[clap(
    name = "rage",
    about = "Record information about the previous failed buck2 command"
)]
pub struct RageCommand {
    /// Capture and upload a DICE dump
    #[clap(long)]
    dice_dump: bool,
}

#[async_trait]
impl StreamingCommand for RageCommand {
    const COMMAND_NAME: &'static str = "rage";

    fn existing_only() -> bool {
        true
    }

    async fn exec_impl(
        self,
        buckd: BuckdClientConnector,
        _matches: &clap::ArgMatches,
        mut ctx: ClientCommandContext,
    ) -> ExitResult {
        let log_dir = ctx.paths()?.log_dir();
        let logs_summary = get_local_logs(&log_dir)?
            .into_iter()
            .rev() // newest first
            .map(|log_path| async move {
                let log_path = EventLogPathBuf::infer(log_path.into_abs_path_buf())?;
                log_path.get_summary().await
            })
            .collect::<FuturesOrdered<_>>()
            .try_collect::<Vec<EventLogSummary>>()
            .await?;

        if logs_summary.is_empty() {
            buck2_client_ctx::eprintln!("No recent buck invocation to report")?;
            return ExitResult::failure();
        }

        let chosen_log = {
            let mut stdin = BufReader::new(ctx.stdin());
            user_prompt_select_log(&mut stdin, &logs_summary).await?
        };

        let old_trace_id = &chosen_log.trace_id;
        let new_trace_id = TraceId::new();

        dispatch_event_to_scribe(&ctx, &new_trace_id, old_trace_id)?;

        if self.dice_dump {
            upload_dice_dump(buckd, &ctx, &new_trace_id, old_trace_id).await?;
        }

        ExitResult::success()
    }

    fn console_opts(&self) -> &CommonConsoleOptions {
        CommonConsoleOptions::simple_ref()
    }

    fn event_log_opts(&self) -> &CommonDaemonCommandOptions {
        CommonDaemonCommandOptions::default_ref()
    }

    fn common_opts(&self) -> &CommonBuildConfigurationOptions {
        CommonBuildConfigurationOptions::default_ref()
    }
}

fn dispatch_event_to_scribe(
    ctx: &ClientCommandContext,
    new_trace_id: &TraceId,
    old_trace_id: &TraceId,
) -> anyhow::Result<()> {
    // dispatch event to scribe if possible
    match create_scribe_event_dispatcher(ctx, new_trace_id.to_owned())? {
        Some(dispatcher) => {
            let recent_command_trace_id = old_trace_id.to_string();
            let metadata = metadata::collect();
            let rage_invoked = RageInvoked {
                metadata,
                recent_command_trace_id,
            };
            dispatcher.instant_event(rage_invoked);
        }
        None => {}
    };
    Ok(())
}

async fn upload_dice_dump(
    mut buckd: BuckdClientConnector,
    ctx: &ClientCommandContext,
    new_trace_id: &TraceId,
    old_trace_id: &TraceId,
) -> anyhow::Result<()> {
    let dice_dump_folder_name = format!("{:?}", chrono::Utc::now());
    let dice_dump_folder = ctx.paths()?.dice_dump_dir();

    create_dir_all(&dice_dump_folder).with_context(|| {
        format!(
            "Failed to create directory {:?}, no dice dump will be created",
            &dice_dump_folder
        )
    })?;

    let this_dice_dump_folder = dice_dump_folder
        .as_path()
        .join(Path::new(&dice_dump_folder_name));

    buck2_client_ctx::eprintln!("Dumping Buck2 internal state...")?;

    buckd
        .with_flushing()
        .unstable_dice_dump(UnstableDiceDumpRequest {
            destination_path: this_dice_dump_folder.to_str().unwrap().to_owned(),
            format: DiceDumpFormat::Tsv.into(),
        })
        .await
        .with_context(|| {
            format!(
                "Dice Dump at {:?} failed to complete",
                this_dice_dump_folder,
            )
        })?;

    // create dice dump name using the old command being rage on and the trace id of this rage command.
    let filename = format!("{}_{}_dice-dump.gz", old_trace_id, new_trace_id);
    buck2_client_ctx::eprintln!(
        "Compressed internal state file being uploaded to manifold as {}...",
        &filename
    )?;
    upload_to_manifold(&this_dice_dump_folder, &filename)
        .await
        .with_context(|| "Failed during manifold upload!")?;

    remove_dir_all(&this_dice_dump_folder).with_context(|| {
        format!(
            "Failed to remove Buck2 internal state folder at {:?}. Please remove this manually as it could be quite large.",
            this_dice_dump_folder
        )
    })?;
    Ok(())
}

#[allow(unused_variables)] // Conditional compilation
fn create_scribe_event_dispatcher(
    ctx: &ClientCommandContext,
    trace_id: TraceId,
) -> anyhow::Result<Option<EventDispatcher>> {
    // TODO(swgiillespie) scribe_logging is likely the right feature for this, but we should be able to inject a sink
    // without using configurations at the call site
    let sink = new_thrift_scribe_sink_if_enabled(ctx.fbinit(), /* buffer size */ 100)?;
    Ok(sink.map(|sink| EventDispatcher::new(trace_id, sink)))
}

async fn upload_to_manifold(
    dice_dump_folder_to_upload: &Path,
    filename: &str,
) -> anyhow::Result<()> {
    if !cfg!(target_os = "windows") {
        buck2_core::facebook_only();
        let manifold_url = match log_upload_url() {
            None => return Ok(()),
            Some(x) => x,
        };

        let cert = find_tls_cert()?;

        let tar_gzip = background_command("tar")
            .arg("-c")
            .arg(dice_dump_folder_to_upload)
            .stdin(std::process::Stdio::null())
            .stdout(std::process::Stdio::piped())
            .stderr(std::process::Stdio::null())
            .spawn()?;

        let mut upload = async_background_command("curl");
        upload.args([
                "--fail",
                "-X",
                "PUT",
                "--data-binary",
                "@-",
                &format!("{}/v0/write/flat/{}?bucketName=buck2_logs&apiKey=buck2_logs-key&timeoutMsec=300000", manifold_url, filename),
                "-E",
        ]);
        upload.arg(cert);
        upload.stdin(tar_gzip.stdout.unwrap());
        let exit_code_result = upload.spawn()?.wait().await?.code();

        match exit_code_result {
            Some(code) => match code {
                0 => {}
                e => {
                    return Err(anyhow::anyhow!(
                        ManifoldUploadError::ManifoldUploadWithExitCodeError(
                            dice_dump_folder_to_upload.display().to_string(),
                            e
                        )
                    ));
                }
            },
            None => {
                return Err(anyhow::anyhow!(
                    ManifoldUploadError::ManifoldUploadSignalInterruptError(
                        dice_dump_folder_to_upload.display().to_string()
                    )
                ));
            }
        }
    }
    Ok(())
}

async fn user_prompt_select_log<'a>(
    stdin: impl AsyncBufRead + Unpin,
    logs_summary: &'a [EventLogSummary],
) -> anyhow::Result<&'a EventLogSummary> {
    buck2_client_ctx::eprintln!("Which buck invocation would you like to report?\n")?;
    for (index, log_summary) in logs_summary.iter().enumerate() {
        print_log_summary(index, log_summary)?;
    }
    buck2_client_ctx::eprintln!()?;
    let prompt = format!(
        "Invocation: (type a number between 0 and {}) ",
        logs_summary.len() - 1
    );
    let selection = get_user_selection(stdin, &prompt, |i| i < logs_summary.len()).await?;

    let chosen_log = logs_summary.get(selection).expect("Selection out of range");

    let timestamp: DateTime<Local> = chosen_log.timestamp.into();
    buck2_client_ctx::eprintln!("Selected invocation at {}\n", timestamp.format("%c %Z"))?;

    Ok(chosen_log)
}

async fn get_user_selection<P>(
    mut stdin: impl AsyncBufRead + Unpin,
    prompt: &str,
    predicate: P,
) -> anyhow::Result<usize>
where
    P: Fn(usize) -> bool,
{
    buck2_client_ctx::eprint!("{}", prompt)?;

    let mut input = String::new();
    stdin.read_line(&mut input).await?;

    match input.trim().parse() {
        Ok(selection) if predicate(selection) => Ok(selection),
        _ => return Err(anyhow::anyhow!("Fail to get a valid selection")),
    }
}

fn print_log_summary(index: usize, log_summary: &EventLogSummary) -> anyhow::Result<()> {
    let cmd: String;
    if log_summary.invocation.command_line_args.is_empty() {
        cmd = "???".to_owned();
    } else {
        let mut program_name: &str = &log_summary.invocation.command_line_args[0];
        let program_args = &log_summary.invocation.command_line_args[1..];
        if program_name.ends_with("fbcode/buck2/.buck2") {
            program_name = "buck2";
        }
        cmd = format!("{} {}", program_name, program_args.join(" "));
    }

    let timestamp: DateTime<Local> = log_summary.timestamp.into();
    buck2_client_ctx::eprintln!(
        "{:<7} {}    {}",
        format!("[{}].", index),
        timestamp.format("%c %Z"),
        cmd
    )
}
