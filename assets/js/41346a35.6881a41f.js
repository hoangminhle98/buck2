"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[280],{75446:(n,t,e)=>{e.r(t),e.d(t,{assets:()=>c,contentTitle:()=>o,default:()=>u,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var i=e(74848),r=e(28453);const s={id:"configuration_transitions",title:"Configuration Transitions"},o=void 0,a={id:"rule_authors/configuration_transitions",title:"Configuration Transitions",description:"Configuration transition is a mechanism for changing the configuration when",source:"@site/../docs/rule_authors/configuration_transitions.md",sourceDirName:"rule_authors",slug:"/rule_authors/configuration_transitions",permalink:"/docs/rule_authors/configuration_transitions",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"configuration_transitions",title:"Configuration Transitions"},sidebar:"main",previous:{title:"Configurations",permalink:"/docs/rule_authors/configurations"},next:{title:"Dynamic Dependencies",permalink:"/docs/rule_authors/dynamic_dependencies"}},c={},l=[{value:"Transition rule",id:"transition-rule",level:2},{value:"Per rule transition",id:"per-rule-transition",level:2},{value:"Per attribute transition",id:"per-attribute-transition",level:2},{value:"Per target transition",id:"per-target-transition",level:2},{value:"Request transition on command line",id:"request-transition-on-command-line",level:2},{value:"Access rule attributes in transition function implementation",id:"access-rule-attributes-in-transition-function-implementation",level:2}];function d(n){const t={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.p,{children:"Configuration transition is a mechanism for changing the configuration when\ndepending on a target."}),"\n",(0,i.jsx)(t.p,{children:"Currently, Buck2 has incoming and outgoing transitions:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Incoming"})," - (or per-rule transitions) declared on the rule."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:"Outgoing"})," - (or per-attribute transitions) declared on the attribute."]}),"\n"]}),"\n",(0,i.jsx)(t.h2,{id:"transition-rule",children:"Transition rule"}),"\n",(0,i.jsxs)(t.p,{children:["Transition rules are defined in ",(0,i.jsx)(t.code,{children:".bzl"})," files using the ",(0,i.jsx)(t.code,{children:"transition"})," built-in."]}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"transition"})," function creates a configuration-related object. The\n",(0,i.jsx)(t.code,{children:"transition"})," object is opaque, it does not have any operations, and can only be\nused as an argument to ",(0,i.jsx)(t.code,{children:"rule"})," function or attribute constructor. The\n",(0,i.jsx)(t.code,{children:"transition"})," function call must be assigned to a global variable (this is\nsimilar to user-defined provider declarations)."]}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"transition"})," function takes three arguments:"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"implementation"})," - a function."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"refs"})," - references to configuration rules to be resolved and passed to the\nimplementation function."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"split"})," - (optional) ",(0,i.jsx)(t.code,{children:"bool"})," flag (default ",(0,i.jsx)(t.code,{children:"False"}),") to indicate whether\ntransition is a split transition (used in per attribute transitions)."]}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"implementation"})," function takes two arguments:"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"platform"})," - a configuration to transition."]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"refs"})," - resolved references as a struct."]}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"Example transition from ios to watchos (for example, to build a watchOS bundle\nas part of an iOS build):"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-python",children:'def _impl(platform: PlatformInfo.type, refs: struct.type) -> PlatformInfo.type:\n    # Operating system constraint setting.\n    os = refs.os[ConstraintSettingInfo]\n    # Watchos constraint value.\n    watchos = refs.watchos[ConstraintValueInfo]\n    # Remove operating system constraint from input platform.\n    constraints = {\n        s: v\n        for (s, v) in platform.configuration.constraints.items()\n        if s != os.label\n    }\n    # Add watchos constraint value.\n    constraints[watchos.setting.label] = watchos\n    # Construct configuration structure.\n    new_cfg = ConfigurationInfo(\n        # Updated constraints.\n        constraints = constraints,\n        # Keep original config values.\n        values = platform.configuration.values,\n    )\n    # And return new configuration,\n    # or a dict of marker to configuration in case of split transition.\n    return PlatformInfo(\n        # ... supplying configuration label.\n        label = "<transitioned-to-watch>",\n        configuration = new_cfg,\n    )\n\niphone_to_watch_transition = transition(_impl, refs = {\n    "os": "//constraints:os",\n    "watchos": "//constraints:watchos",\n})\n'})}),"\n",(0,i.jsx)(t.p,{children:"A transition function applied twice must produce the configuration identical to\nthe configuration produced after applying transition once."}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-python",children:"assert tr(tr(platform=platform, refs=refs), refs=refs) == tr(platform=platform, refs=refs)\n"})}),"\n",(0,i.jsx)(t.p,{children:"If this invariant is not held, certain operations produce incorrect and possibly\ninfinite graphs. This is not yet enforced."}),"\n",(0,i.jsx)(t.h2,{id:"per-rule-transition",children:"Per rule transition"}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"rule"})," function has an optional ",(0,i.jsx)(t.code,{children:"cfg"})," attribute, which takes a reference to\nthe ",(0,i.jsx)(t.code,{children:"transition"})," object (created with the ",(0,i.jsx)(t.code,{children:"transition"})," function; not a string)."]}),"\n",(0,i.jsx)(t.p,{children:"When such a rule is called, it is instantiated, not with the requested\nconfiguration, but with the requested configuration transformed with a given\nrule transition."}),"\n",(0,i.jsx)(t.p,{children:"For example, the transition for watchos when the iOS target depends on watchos\nresource:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-python",children:"watchos_resource = rule(\n    cfg = iphone_to_watch_transition,\n    ...\n)\n"})}),"\n",(0,i.jsx)(t.h2,{id:"per-attribute-transition",children:"Per attribute transition"}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"attrs"})," object has two attribute constructors:"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:"attrs.transition_dep(cfg)"})}),"\n",(0,i.jsx)(t.li,{children:(0,i.jsx)(t.code,{children:"attrs.split_transition_dep(cfg)"})}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["These attributes are similar to the ",(0,i.jsx)(t.code,{children:"dep"})," attribute. When dependencies are\nresolved for the rule instance, then they are resolved not with the rule\ninstance configuration, but with the configuration transformed with the given\ntransition."]}),"\n",(0,i.jsx)(t.p,{children:"For split transition, each dependency is resolved into a dict of marker to\nproviders."}),"\n",(0,i.jsx)(t.p,{children:"For example:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-python",children:'android_binary = rule(\n    ...\n    attrs = {\n        "deps": attrs.list(attrs.split_transition_dep(cfg = cpu_split_transition), default = []),\n    },\n)\n'})}),"\n",(0,i.jsx)(t.p,{children:"When the above is invoked as follows:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-python",children:'android_binary(\n    deps = ["//foo:bar", "//qux:quux"],\n)\n'})}),"\n",(0,i.jsxs)(t.p,{children:["Then the rule implementation gets something like the following in the ",(0,i.jsx)(t.code,{children:"deps"}),"\nattribute:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-python",children:'{\n    [\n        {\n            # Key in this dict is the marker returned from split transition impl function.\n            "arm64": "providers for //foo:bar configured for arm64",\n            "armv7": "providers for //foo:bar configured for armv7",\n        },\n        {\n            "arm64": "providers for //qux:quux configured for arm64",\n            "armv7": "providers for //qux:quux configured for armv7",\n        },\n    ]\n}\n'})}),"\n",(0,i.jsx)(t.admonition,{type:"note",children:(0,i.jsxs)(t.p,{children:["It is an error to pass a split transition object to ",(0,i.jsx)(t.code,{children:"attrs.transition_dep"})," and a non-split transition to ",(0,i.jsx)(t.code,{children:"attrs.split_transition_dep"}),"."]})}),"\n",(0,i.jsx)(t.h2,{id:"per-target-transition",children:"Per target transition"}),"\n",(0,i.jsx)(t.p,{children:"The Buck2 team is considering the implementation of per target transitions (that\nis, transitions referenced at a rule instantiation site as opposed to rule\ndeclaration site). No specific plans or APIs exists at the moment."}),"\n",(0,i.jsxs)(t.p,{children:["It ",(0,i.jsx)(t.em,{children:"could"})," be something like the following:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-python",children:'cxx_binary(\n    name = "foo",\n    cfg = "//transitions:opengl-es-1.0",\n    ...\n)\n'})}),"\n",(0,i.jsx)(t.h2,{id:"request-transition-on-command-line",children:"Request transition on command line"}),"\n",(0,i.jsxs)(t.p,{children:["For information, see ",(0,i.jsx)(t.a,{href:"/docs/rfcs/drafts/configuration-at-syntax",children:"RFC"}),"."]}),"\n",(0,i.jsx)(t.h2,{id:"access-rule-attributes-in-transition-function-implementation",children:"Access rule attributes in transition function implementation"}),"\n",(0,i.jsxs)(t.p,{children:["It might be useful for the transition function to be able to query rule\nattributes (for example, to perform transition to different configurations\ndepending on ",(0,i.jsx)(t.code,{children:"java_version"})," attribute)."]}),"\n",(0,i.jsx)(t.p,{children:"Both incoming (per rule) and outgoing (per dependency) transitions can access\nrule attributes. For outgoing transitions, transition rule implementation\naccesses the attributes of the target that has dependencies with transitions,\nnot attributes of dependency targets."}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-python",children:'def _tr(platform, refs, attrs):\n    # NB: There are some restrictions on what attrs can be made accessible:\n    # - Only primitive values for now (providers are not resolved)\n    # - Only unconfigured attributes for now\n    attrs.my_list_attribute # == [12345, 67890]\n\ntr = transition(\n  _tr,\n  refs = {},\n  attrs = {\n    "my_list_attribute": attr.list(...),\n  },\n)\n\nmy_rule = rule(..., cfg=tr)\n\nmy_rule(\n  ...,\n  my_list_attribute = [12345, 67890],\n)\n'})})]})}function u(n={}){const{wrapper:t}={...(0,r.R)(),...n.components};return t?(0,i.jsx)(t,{...n,children:(0,i.jsx)(d,{...n})}):d(n)}},28453:(n,t,e)=>{e.d(t,{R:()=>o,x:()=>a});var i=e(96540);const r={},s=i.createContext(r);function o(n){const t=i.useContext(s);return i.useMemo((function(){return"function"==typeof n?n(t):{...t,...n}}),[t,n])}function a(n){let t;return t=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:o(n.components),i.createElement(s.Provider,{value:t},n.children)}}}]);