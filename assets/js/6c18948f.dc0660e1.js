"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[7640],{52681:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>r,default:()=>u,frontMatter:()=>s,metadata:()=>l,toc:()=>d});var c=i(74848),o=i(28453),t=i(86025);const s={id:"key_concepts",title:"Key Concepts"},r="Key concepts",l={id:"concepts/key_concepts",title:"Key Concepts",description:"Buck2 has a number of fundamental concepts:",source:"@site/../docs/concepts/key_concepts.md",sourceDirName:"concepts",slug:"/concepts/key_concepts",permalink:"/docs/concepts/key_concepts",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"key_concepts",title:"Key Concepts"},sidebar:"main",previous:{title:"Bootstrapping Buck2",permalink:"/docs/about/bootstrapping"},next:{title:"Concept Map",permalink:"/docs/concepts/concept_map"}},a={},d=[{value:"Buck2&#39;s dependency graph",id:"buck2s-dependency-graph",level:3},{value:"Multiple Buck2 projects in a single repository",id:"multiple-buck2-projects-in-a-single-repository",level:3},{value:"See also",id:"see-also",level:3}];function h(e){const n={a:"a",code:"code",em:"em",h1:"h1",h3:"h3",header:"header",li:"li",p:"p",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.header,{children:(0,c.jsx)(n.h1,{id:"key-concepts",children:"Key concepts"})}),"\n",(0,c.jsx)(n.p,{children:"Buck2 has a number of fundamental concepts:"}),"\n",(0,c.jsxs)(n.ul,{children:["\n",(0,c.jsxs)(n.li,{children:["A ",(0,c.jsx)(n.a,{href:"/docs/concepts/build_rule",children:(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.em,{children:"build rule"})})})," describes how to produce an output file\nfrom a set of input files. Most build rules are specific to a particular\nlanguage or platform. For example, you would use the\n",(0,c.jsx)(n.a,{href:"../../prelude/globals/#cxx_binary",children:(0,c.jsx)(n.code,{children:"cxx_binary"})})," rule to create a C++ binary,\nbut you would use the\n",(0,c.jsx)(n.a,{href:"../../prelude/globals/#android_binary",children:(0,c.jsx)(n.code,{children:"android_binary"})})," rule to create an\nAndroid APK."]}),"\n",(0,c.jsxs)(n.li,{children:["A ",(0,c.jsx)(n.a,{href:"/docs/concepts/build_target",children:(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.em,{children:"build target"})})})," is a string that uniquely identifies a\nbuild rule. It can be thought of as a URI for the build rule within the Buck2\nproject."]}),"\n",(0,c.jsxs)(n.li,{children:["A ",(0,c.jsx)(n.a,{href:"/docs/concepts/build_rule",children:(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.em,{children:"build file"})})})," defines one or more build rules. In Buck2,\nbuild files are typically named ",(0,c.jsx)(n.code,{children:"BUCK"}),". A ",(0,c.jsx)(n.code,{children:"BUCK"})," file is analogous to the\n",(0,c.jsx)(n.code,{children:"Makefile"})," used by the Make utility. In your project, you will usually have a\nseparate ",(0,c.jsx)(n.code,{children:"BUCK"})," file for each buildable unit of software\u2014such as a binary or\nlibrary. For large projects, you could have hundreds of ",(0,c.jsx)(n.code,{children:"BUCK"})," files."]}),"\n"]}),"\n",(0,c.jsxs)(n.p,{children:["A Buck2 ",(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.em,{children:"package"})})," comprises of: a Buck2 build file (a ",(0,c.jsx)(n.code,{children:"BUCK"})," file), all\nfiles\u2014such as source files and headers\u2014in the same directory as the ",(0,c.jsx)(n.code,{children:"BUCK"})," file\nor in subdirectories, provided those subdirectories do not themselves contain a\n",(0,c.jsx)(n.code,{children:"BUCK"})," file. To say it another way, a ",(0,c.jsx)(n.code,{children:"BUCK"})," file defines the root of a package,\nbut Buck2 packages might not include all their subdirectories because Buck2\npackages do not overlap or contain other Buck2 packages. For example, in the\nfollowing diagram, the BUCK file in directory ",(0,c.jsx)(n.code,{children:"app-dir-1"})," defines that directory\nas the root of a package\u2014which is labeled ",(0,c.jsx)(n.strong,{children:"Package A"})," in the diagram. The\ndirectory ",(0,c.jsx)(n.code,{children:"app-dir-2"})," is part of Package A because it is a subdirectory of\n",(0,c.jsx)(n.code,{children:"app-dir-1"}),", but does not itself contain a BUCK file. Now, consider directory\n",(0,c.jsx)(n.code,{children:"app-dir-3"}),". Because ",(0,c.jsx)(n.code,{children:"app-dir-3"})," contains a BUCK file it is the root of a new\npackage (",(0,c.jsx)(n.strong,{children:"Package B"}),"). Although ",(0,c.jsx)(n.code,{children:"app-dir-3"})," is a subdirectory of ",(0,c.jsx)(n.code,{children:"app-dir-1"}),",\nit is ",(0,c.jsx)(n.em,{children:"not"})," part of Package A. Buck2 has the concept of a ",(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.em,{children:"cell"})}),", which\ndefines a directory tree of one or more Buck2 packages. A Buck2 build could\ninvolve multiple cells. Cells often correspond to repositories, but this isn't\nrequired. The root of a Buck2 cell contains a global configuration file called\n",(0,c.jsx)(n.a,{href:"/docs/concepts/buckconfig",children:(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.code,{children:".buckconfig"})})}),". Note that although the cell root should\ncontain a ",(0,c.jsx)(n.code,{children:".buckconfig"}),", the presence of a ",(0,c.jsx)(n.code,{children:".buckconfig"})," file doesn't in itself\ndefine a cell. Rather, ",(0,c.jsx)(n.em,{children:"the cells involved in a build are defined at the time\nBuck2 is invoked"}),"; they are specified in the ",(0,c.jsx)(n.code,{children:".buckconfig"})," for the Buck2\n",(0,c.jsx)(n.em,{children:"project"})," (see below). A Buck2 ",(0,c.jsx)(n.strong,{children:(0,c.jsx)(n.em,{children:"project"})})," is defined by the ",(0,c.jsx)(n.code,{children:".buckconfig"}),"\nwhere Buck2 is invoked, or if that directory doesn't contain a ",(0,c.jsx)(n.code,{children:".buckconfig"}),",\nthe project is defined by the ",(0,c.jsx)(n.code,{children:".buckconfig"})," in the nearest ancestor directory.\nThe ",(0,c.jsx)(n.code,{children:".buckconfig"})," for the project specifies the cells that constitute the Buck2\nproject. Specifically, these cells are specified in the\n",(0,c.jsx)(n.a,{href:"/docs/concepts/buckconfig#cells",children:"cells"})," section of the ",(0,c.jsx)(n.code,{children:".buckconfig"}),". Note that the\ndirectory tree rooted at this ",(0,c.jsx)(n.code,{children:".buckconfig"})," is automatically considered a cell\nby Buck2; in other words, the project's ",(0,c.jsx)(n.code,{children:".buckconfig"})," doesn't need to specify\nthe project cell explicitly\u2014although it is a good practice to do so."]}),"\n",(0,c.jsx)("img",{src:(0,t.default)("/img/packages-1.png"),alt:"justifyContent"}),"\n",(0,c.jsx)(n.h3,{id:"buck2s-dependency-graph",children:"Buck2's dependency graph"}),"\n",(0,c.jsxs)(n.p,{children:["Every build rule can have zero or more dependencies. You can specify these\ndependencies using, for example, the ",(0,c.jsx)(n.code,{children:"deps"})," argument to the build rule. For more\ninformation about specifying dependencies, consult the reference page for the\nbuild rule you are using. These dependencies form a directed graph, called the\n",(0,c.jsx)(n.em,{children:"target graph"}),'. Buck2 requires the graph to be acyclic. When building the output\nof a build rule, all of the rule\'s transitive dependencies are built first. This\nmeans that the graph is built in a "bottom-up" fashion. A build rule knows only\nwhich rules it depends on, not which rules depend on it. This makes the graph\neasier to reason about and enables Buck2 to identify independent subgraphs that\ncan be built in parallel. It also enables Buck2 to determine the minimal set of\nbuild targets that need to be rebuilt.']}),"\n",(0,c.jsx)(n.h3,{id:"multiple-buck2-projects-in-a-single-repository",children:"Multiple Buck2 projects in a single repository"}),"\n",(0,c.jsxs)(n.p,{children:["Buck2 is designed to build multiple deliverables from a single repository\u2014that\nis, a ",(0,c.jsx)(n.em,{children:"monorepo"}),"\u2014rather than from multiple repositories. Support for the\nmonorepo design motivated Buck2's support for cells and projects. It is\nFacebook's experience that maintaining all dependencies in the same repository\nmakes it easier to ensure that all developers have the correct version of the\ncode and simplifies the process of making atomic commits."]}),"\n",(0,c.jsx)(n.h3,{id:"see-also",children:"See also"}),"\n",(0,c.jsxs)(n.p,{children:["Take a look at the ",(0,c.jsx)(n.a,{href:"/docs/concepts/concept_map",children:"Concept Map"})," for a visualization of how\nBuck2 concepts interact with each other. Also see the ",(0,c.jsx)(n.a,{href:"/docs/concepts/glossary",children:"Glossary"}),"."]})]})}function u(e={}){const{wrapper:n}={...(0,o.R)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(h,{...e})}):h(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>s,x:()=>r});var c=i(96540);const o={},t=c.createContext(o);function s(e){const n=c.useContext(t);return c.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function r(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),c.createElement(t.Provider,{value:n},e.children)}}}]);