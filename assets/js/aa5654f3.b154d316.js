"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[358],{68964:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>c,contentTitle:()=>r,default:()=>d,frontMatter:()=>a,metadata:()=>s,toc:()=>l});var i=t(74848),o=t(28453);const a={},r="Universal Configuration Naming Function",s={id:"rfcs/drafts/universal-cfg-naming",title:"Universal Configuration Naming Function",description:"tl;dr: This RFC proposes using a single naming function to generate names for",source:"@site/../docs/rfcs/drafts/universal-cfg-naming.md",sourceDirName:"rfcs/drafts",slug:"/rfcs/drafts/universal-cfg-naming",permalink:"/docs/rfcs/drafts/universal-cfg-naming",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{}},c={},l=[{value:"Context",id:"context",level:2},{value:"Proposal",id:"proposal",level:2}];function f(n){const e={code:"code",em:"em",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",...(0,o.R)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.header,{children:(0,i.jsx)(e.h1,{id:"universal-configuration-naming-function",children:"Universal Configuration Naming Function"})}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.em,{children:"tl;dr:"})," This RFC proposes using a single naming function to generate names for\nall configurations."]}),"\n",(0,i.jsx)(e.h2,{id:"context",children:"Context"}),"\n",(0,i.jsxs)(e.p,{children:["NOTE: The configuration name consists of a readable string followed by the hash\nof the configuration. The readable string is technically the ",(0,i.jsx)(e.code,{children:"PlatformInfo"}),"\nname. For sake of ease of writing, this doc uses configuration name and platform\nname interchangeably to describe this concept."]}),"\n",(0,i.jsx)(e.p,{children:"Currently, there are 3 ways to create and name a configuration."}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsxs)(e.li,{children:["A ",(0,i.jsx)(e.code,{children:"platform"})," target defines a configuration, and the platform target label\nbecomes the platform name."]}),"\n",(0,i.jsx)(e.li,{children:"A transition function defines the configuration and generates a name for the\nconfiguration."}),"\n",(0,i.jsx)(e.li,{children:"When a modifier is used, the cfg constructor function for modifiers defines\nthe configuration and its name. There is currently a single naming function\nthat generates all modifier-based configuration names."}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:"Modifiers are intended to replace platforms, so in the future all configuration\nnames will be generated. Unfortuately, most of the generated names today used\ntoday in transitions are not very good. Problems that I've seen in practice\ninclude:"}),"\n",(0,i.jsxs)(e.ol,{children:["\n",(0,i.jsx)(e.li,{children:'Configuration names barely contain any useful information about the\nconfiguration. This happens a lot in transitions. For example, the android\nsplit CPU architecture transition names the generated configurations "x86_64"\nand "arm64", which tells very little about the configuration beyond the CPU\narchitectures it splits on.'}),"\n",(0,i.jsx)(e.li,{children:"Transition function incorrectly retains the old configuration name that is no\nlonger relevant, misleading the user about what this configuration actually\ndoes. I've seen this happen where a configuration has py3.8 in name but the\npython version constraint stored is actually py3.10."}),"\n"]}),"\n",(0,i.jsx)(e.h2,{id:"proposal",children:"Proposal"}),"\n",(0,i.jsxs)(e.p,{children:["Register a single Starlark function to define all configuration names. This\nStarlark function would accept a ",(0,i.jsx)(e.code,{children:"ConfigurationInfo"})," and return a string for the\nname of the ",(0,i.jsx)(e.code,{children:"ConfigurationInfo"}),"."]}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-python",children:"# Example\ndef name(cfg: ConfigurationInfo) -> str:\n   # ...\n"})}),"\n",(0,i.jsxs)(e.p,{children:[(0,i.jsx)(e.code,{children:"PlatformInfo"})," is no longer available in Starlark. Any place that previously\nuses a ",(0,i.jsx)(e.code,{children:"PlatformInfo"})," will now use ",(0,i.jsx)(e.code,{children:"ConfigurationInfo"})," instead. Buck2 will\ninvoke this function each time it encounters a new ",(0,i.jsx)(e.code,{children:"ConfigurationInfo"})," to define\nits name."]}),"\n",(0,i.jsx)(e.p,{children:"This function will attempt to provide a useful name based on the constraints in\nthe configuration, which mitigates the issue of short or misleading\nconfiguration names. There are some risks that there will be high amount of code\ncomplexity in a function if all configurations are named by one function."}),"\n",(0,i.jsxs)(e.p,{children:["This function will most likely be registered via a ",(0,i.jsx)(e.code,{children:"set_cfg_name"})," function or\nsomething callable from root PACKAGE file or potentially prelude."]})]})}function d(n={}){const{wrapper:e}={...(0,o.R)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(f,{...n})}):f(n)}},28453:(n,e,t)=>{t.d(e,{R:()=>r,x:()=>s});var i=t(96540);const o={},a=i.createContext(o);function r(n){const e=i.useContext(a);return i.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function s(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(o):n.components||o:r(n.components),i.createElement(a.Provider,{value:e},n.children)}}}]);