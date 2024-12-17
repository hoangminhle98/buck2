"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7339],{54726:(e,l,a)=>{a.r(l),a.d(l,{assets:()=>d,contentTitle:()=>i,default:()=>p,frontMatter:()=>t,metadata:()=>s,toc:()=>c});var n=a(74848),r=a(28453),o=a(28774);const t={},i="TemplatePlaceholderInfo",s={id:"api/build/TemplatePlaceholderInfo",title:"TemplatePlaceholderInfo",description:"A provider that is used for expansions in string attribute templates",source:"@site/../docs/api/build/TemplatePlaceholderInfo.md",sourceDirName:"api/build",slug:"/api/build/TemplatePlaceholderInfo",permalink:"/docs/api/build/TemplatePlaceholderInfo",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"apiSidebar",previous:{title:"TargetLabel",permalink:"/docs/api/build/TargetLabel"},next:{title:"TransitiveSet",permalink:"/docs/api/build/TransitiveSet"}},d={},c=[{value:"TemplatePlaceholderInfo.keyed_variables",id:"templateplaceholderinfokeyed_variables",level:2},{value:"TemplatePlaceholderInfo.unkeyed_variables",id:"templateplaceholderinfounkeyed_variables",level:2}];function h(e){const l={code:"code",h1:"h1",h2:"h2",header:"header",hr:"hr",li:"li",ol:"ol",p:"p",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l.header,{children:(0,n.jsx)(l.h1,{id:"templateplaceholderinfo",children:"TemplatePlaceholderInfo"})}),"\n",(0,n.jsx)(l.p,{children:"A provider that is used for expansions in string attribute templates"}),"\n",(0,n.jsxs)(l.p,{children:['String attribute templates allow two types of user-defined placeholders, "unkeyed placeholders"\nlike ',(0,n.jsx)(l.code,{children:"$(CXX)"})," or ",(0,n.jsx)(l.code,{children:"$(aapt)"}),' and "keyed placeholders"  that include a target key like\n',(0,n.jsx)(l.code,{children:"$(cxxppflags //some:target)"}),". The expansion of each of these types is based on the\n",(0,n.jsx)(l.code,{children:"TemplatePlaceholderInfo"})," providers."]}),"\n",(0,n.jsxs)(l.p,{children:['"keyed placeholders" are used for the form ',(0,n.jsx)(l.code,{children:"$(<key> <target>)"})," or ",(0,n.jsx)(l.code,{children:"$(<key> <target> <arg>)"}),". In both cases\nthe lookup will expect a ",(0,n.jsx)(l.code,{children:"TemplatePlaceholderInfo"})," in the providers of ",(0,n.jsx)(l.code,{children:"<target>"}),". It will then lookup\n",(0,n.jsx)(l.code,{children:"<key>"})," in the keyed_variables (call this the ",(0,n.jsx)(l.code,{children:"value"}),"). There are then four valid possibilities:"]}),"\n",(0,n.jsxs)(l.ol,{children:["\n",(0,n.jsxs)(l.li,{children:["no-arg placeholder, an arg-like ",(0,n.jsx)(l.code,{children:"value"}),": resolve to ",(0,n.jsx)(l.code,{children:"value"})]}),"\n",(0,n.jsxs)(l.li,{children:["no-arg placeholder, a dictionary ",(0,n.jsx)(l.code,{children:"value"}),": resolve to ",(0,n.jsx)(l.code,{children:'value["DEFAULT"]'})]}),"\n",(0,n.jsxs)(l.li,{children:["arg placeholder, a non-dictionary ",(0,n.jsx)(l.code,{children:"value"}),": this is an error"]}),"\n",(0,n.jsxs)(l.li,{children:["arg placeholder, a dictionary ",(0,n.jsx)(l.code,{children:"value"}),": resolve to ",(0,n.jsx)(l.code,{children:"value[<arg>]"})]}),"\n"]}),"\n",(0,n.jsxs)(l.p,{children:['"unkeyed placeholders" are resolved by matching to any of the deps of the target. ',(0,n.jsx)(l.code,{children:"$(CXX)"}),' will resolve\nto the "CXX" value in any dep\'s ',(0,n.jsx)(l.code,{children:"TemplateProviderInfo.unkeyed_variables"})]}),"\n",(0,n.jsx)(l.p,{children:"Fields:"}),"\n",(0,n.jsxs)(l.ul,{children:["\n",(0,n.jsx)(l.li,{children:'unkeyed_variables: A mapping of names to arg-like values. These are used for "unkeyed placeholder" expansion.'}),"\n",(0,n.jsx)(l.li,{children:'keyed_variables: A mapping of names to arg-like values or dictionary of string to\narg-like values. These are used for "keyed placeholder" expansion.'}),"\n"]}),"\n",(0,n.jsx)(l.h2,{id:"templateplaceholderinfokeyed_variables",children:"TemplatePlaceholderInfo.keyed_variables"}),"\n",(0,n.jsx)("pre",{class:"language-python",children:(0,n.jsxs)("code",{children:["TemplatePlaceholderInfo.keyed_variables: dict[",(0,n.jsx)(o.default,{to:"/docs/api/starlark/str",children:"str"}),", typing.Any]"]})}),"\n",(0,n.jsx)(l.hr,{}),"\n",(0,n.jsx)(l.h2,{id:"templateplaceholderinfounkeyed_variables",children:"TemplatePlaceholderInfo.unkeyed_variables"}),"\n",(0,n.jsx)("pre",{class:"language-python",children:(0,n.jsxs)("code",{children:["TemplatePlaceholderInfo.unkeyed_variables: dict[",(0,n.jsx)(o.default,{to:"/docs/api/starlark/str",children:"str"}),", typing.Any]"]})})]})}function p(e={}){const{wrapper:l}={...(0,r.R)(),...e.components};return l?(0,n.jsx)(l,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},28453:(e,l,a)=>{a.d(l,{R:()=>t,x:()=>i});var n=a(96540);const r={},o=n.createContext(r);function t(e){const l=n.useContext(o);return n.useMemo((function(){return"function"==typeof e?e(l):{...l,...e}}),[l,e])}function i(e){let l;return l=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:t(e.components),n.createElement(o.Provider,{value:l},e.children)}}}]);