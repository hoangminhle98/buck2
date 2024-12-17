"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5634],{34533:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>s,default:()=>u,frontMatter:()=>r,metadata:()=>o,toc:()=>d});var a=t(74848),l=t(28453);const r={id:"values"},s="Value Representation",o={id:"developers/starlark/values",title:"Value Representation",description:"explanation of the problem, and thought process behind it, remains useful. Of",source:"@site/../docs/developers/starlark/values.generated.md",sourceDirName:"developers/starlark",slug:"/developers/starlark/values",permalink:"/docs/developers/starlark/values",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"values"},sidebar:"main",previous:{title:"Starlark Types",permalink:"/docs/developers/starlark/types"},next:{title:"Request for Comments",permalink:"/docs/developers/request_for_comments"}},i={},d=[{value:"Frozen vs unfrozen values",id:"frozen-vs-unfrozen-values",level:2},{value:"Thaw-on-write",id:"thaw-on-write",level:2},{value:"Immutable containers of mutable data",id:"immutable-containers-of-mutable-data",level:2},{value:"Implementation in Rust",id:"implementation-in-rust",level:2}];function c(e){const n={admonition:"admonition",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",p:"p",pre:"pre",ul:"ul",...(0,l.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(n.header,{children:(0,a.jsx)(n.h1,{id:"value-representation",children:"Value Representation"})}),"\n",(0,a.jsxs)(n.admonition,{title:"Some of the information in this page is outdated. However, the",type:"warning",children:[(0,a.jsxs)(n.p,{children:["explanation of the problem, and thought process behind it, remains useful. Of\nparticular note is that a garbage collected heap is now used for ",(0,a.jsx)(n.code,{children:"Value"}),". :::"]}),(0,a.jsx)(n.p,{children:"This page explains how values are represented in the Starlark interpreter,\nignoring some incidental details."}),(0,a.jsx)(n.p,{children:"Importantly, in Starlark, any identifiers from modules that you import are\n'frozen', which means that, if you have a module that defines a list, then once\nyou have imported the module, the list is now immutable. This design means that\nyou can safely share imports with multiple users, without any expensive copying,\nand use the imports in parallel."}),(0,a.jsx)(n.h2,{id:"frozen-vs-unfrozen-values",children:"Frozen vs unfrozen values"}),(0,a.jsx)(n.p,{children:"Values that are frozen are segregated from those that are not:"}),(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:"Frozen values are those you import, and (assuming no GC) are to be ref-counted\natomically (so they can be shared by multiple threads) and never changed."}),"\n",(0,a.jsx)(n.li,{children:"Unfrozen values are those which are local to the module, and, since modules\nexecute single threaded, can be non-atomically ref-counted and mutated."}),"\n"]}),(0,a.jsx)(n.p,{children:"Once a module has finished executing, it's values are frozen and can be reused\nfreely."}),(0,a.jsx)(n.h2,{id:"thaw-on-write",children:"Thaw-on-write"}),(0,a.jsx)(n.p,{children:"It's not uncommon to return list literals from functions."}),(0,a.jsx)(n.p,{children:"For example:"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-python",children:"def my_list(x):\n   return ([1,2,3], x)\n"})}),(0,a.jsxs)(n.p,{children:["This above code returns the unfrozen list ",(0,a.jsx)(n.code,{children:"[1,2,3]"}),". But while the list is\nunfrozen, and could be mutated by the caller, it probably won't be. To optimise\nthis pattern, construct a frozen list when compiling ",(0,a.jsx)(n.code,{children:"my_list"})," and insert a\nshared reference to it in the result. If anyone tries to mutate the list, it's\nexplicitly unfrozen by copying it into a mutable variant (known as thawing the\nvalue)."]}),(0,a.jsx)(n.h2,{id:"immutable-containers-of-mutable-data",children:"Immutable containers of mutable data"}),(0,a.jsxs)(n.p,{children:["There are some data types (such as functions and tuples) that are themselves\nimmutable but contain mutable data. Importantly, all types that can be invoked\nas functions (for example, ",(0,a.jsx)(n.code,{children:"lambda"}),", ",(0,a.jsx)(n.code,{children:"def"}),", and ",(0,a.jsx)(n.code,{children:"a.b()"}),") fall into this\ncategory. These types can be non-atomically ref-counted but can't be mutated."]}),(0,a.jsx)(n.h2,{id:"implementation-in-rust",children:"Implementation in Rust"}),(0,a.jsx)(n.p,{children:"Putting all these above concepts together results in the following:"}),(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-rust",children:"enum FrozenValue {\n    None(NoneType),\n    Bool(bool),\n    Int(i64),\n    Obj(Arc<dyn StarlarkValue>),\n}\n\nenum Value {\n    Immutable(FrozenValue),\n    Pseudo(Rc<dyn ComplexValue>)\n    Mutable(Rc<RefCell<Mutable>>),\n}\n\nenum Mutable {\n    Mutable(Box<dyn ComplexValue>),\n    ThawOnWrite(Arc<dyn StarlarkValue>),\n}\n"})}),(0,a.jsxs)(n.p,{children:["In the above code, both of the traits ",(0,a.jsx)(n.code,{children:"dyn SimpleValue"})," ",(0,a.jsx)(n.code,{children:"and dyn ComplexValue"}),"\nenable you to convert to the other and have shared general value-like methods."]}),(0,a.jsx)(n.p,{children:"There are four types of value:"}),(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsx)(n.li,{children:(0,a.jsx)(n.code,{children:"Immutable"})}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"Pseudo"})," - immutable containers of mutable values."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"Mutable"}),"/",(0,a.jsx)(n.code,{children:"Mutable"})]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"Mutable"}),"/",(0,a.jsx)(n.code,{children:"ThawOnWrite"})," - immutable now but can be replaced with\n",(0,a.jsx)(n.code,{children:"Mutable"}),"/",(0,a.jsx)(n.code,{children:"Mutable"})," if needed."]}),"\n"]}),(0,a.jsx)(n.p,{children:"There are two root types:"}),(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"FrozenValue"})," - imported."]}),"\n",(0,a.jsxs)(n.li,{children:[(0,a.jsx)(n.code,{children:"Value"})," - defined locally."]}),"\n"]})]})]})}function u(e={}){const{wrapper:n}={...(0,l.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},28453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>o});var a=t(96540);const l={},r=a.createContext(l);function s(e){const n=a.useContext(r);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(l):e.components||l:s(e.components),a.createElement(r.Provider,{value:n},e.children)}}}]);