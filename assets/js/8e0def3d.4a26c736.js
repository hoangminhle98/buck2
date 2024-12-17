"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[5578],{95465:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>a,contentTitle:()=>c,default:()=>u,frontMatter:()=>o,metadata:()=>r,toc:()=>d});var s=i(74848),t=i(28453),l=i(52112);const o={id:"getting_started",title:"Getting Started"},c=void 0,r={id:"about/getting_started",title:"Getting Started",description:"Installing Buck2",source:"@site/../docs/about/getting_started.md",sourceDirName:"about",slug:"/about/getting_started",permalink:"/docs/about/getting_started",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"getting_started",title:"Getting Started"},sidebar:"main",previous:{title:"Why Buck2",permalink:"/docs/about/why"},next:{title:"Benefits When Compared to Buck1",permalink:"/docs/about/benefits/compared_to_buck1"}},a={},d=[{value:"Installing Buck2",id:"installing-buck2",level:2},{value:"Windows configuration",id:"windows-configuration",level:3},{value:"Compiling your first project",id:"compiling-your-first-project",level:2},{value:"Creating your first hello_world project",id:"creating-your-first-hello_world-project",level:2},{value:"Learning More",id:"learning-more",level:2},{value:"Communication channels",id:"communication-channels",level:2}];function h(e){const n={a:"a",code:"code",em:"em",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,t.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.h2,{id:"installing-buck2",children:"Installing Buck2"}),"\n",(0,s.jsxs)(n.p,{children:["The latest set of ",(0,s.jsx)(n.code,{children:"buck2"})," executables can be found under the\n",(0,s.jsxs)(n.a,{href:"https://github.com/facebook/buck2/releases/tag/latest",children:[(0,s.jsx)(n.code,{children:"latest"})," release page"]}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["Additionally, for each bi-monthly release there is a\n",(0,s.jsx)(n.a,{href:"https://dotslash-cli.com/",children:"dotslash"})," file that is appropriate for checkin to a\nrepository. This will automatically fetch the correct version and architecture\nfor each user, and ensures a consistent build environment for each commit in the\nrepo."]}),"\n",(0,s.jsxs)(n.p,{children:["To get started, first install ",(0,s.jsx)(n.a,{href:"https://rustup.rs/",children:"rustup"}),", then compile the\n",(0,s.jsx)(n.code,{children:"buck2"})," executable:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"rustup install nightly-2024-07-21\ncargo +nightly-2024-07-21 install --git https://github.com/facebook/buck2.git buck2\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The above commands install ",(0,s.jsx)(n.code,{children:"buck2"})," into a suitable directory, such as\n",(0,s.jsx)(n.code,{children:"$HOME/.cargo/bin"}),", which you should then add to your ",(0,s.jsx)(n.code,{children:"$PATH"}),":"]}),"\n",(0,s.jsx)(n.p,{children:"Linux / macOS"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"export PATH=$HOME/.cargo/bin:$PATH\n"})}),"\n",(0,s.jsx)(n.p,{children:"Windows Powershell"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-powershell",children:'$Env:PATH += ";$HOME\\.cargo\\bin"\n'})}),"\n",(0,s.jsxs)(n.p,{children:["With Buck2 installed, you can build projects with ",(0,s.jsx)(n.code,{children:"buck2"}),"!"]}),"\n",(0,s.jsx)(n.h3,{id:"windows-configuration",children:"Windows configuration"}),"\n",(0,s.jsxs)(n.p,{children:["Some of our rules use symlinks, which are disabled by default for non-admin\nWindows users. You can fix that by\n",(0,s.jsx)(n.a,{href:"https://pureinfotech.com/enable-developer-mode-windows-11/",children:"enabling Developer Mode"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"compiling-your-first-project",children:"Compiling your first project"}),"\n",(0,s.jsxs)(n.p,{children:["This section covers the building of a\n",(0,s.jsx)(n.a,{href:"https://github.com/facebook/buck2/tree/main/examples/hello_world",children:"'hello_world' example project"}),"\nthat contains a simple C++ binary. If you are interested in seeing how other\nlanguages can be built, take a look at the\n",(0,s.jsx)(n.a,{href:"https://github.com/facebook/buck2/tree/main/examples/with_prelude",children:"prelude example project"}),",\nwhich contains Rust, C++, Python, and OCaml targets."]}),"\n",(0,s.jsx)(n.p,{children:"First, clone the buck2 repository and cd into the 'hello_world' project:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:"git clone https://github.com/facebook/buck2.git\ncd buck2/examples/hello_world\n"})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"buck2 init --git"})," is all the setup you need to start building. This will use\ngit submodule to pull ",(0,s.jsx)(n.a,{href:"https://github.com/facebook/buck2-prelude",children:"buck2-prelude"}),"\ninto your project:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"buck2 init --git\n"})}),"\n",(0,s.jsxs)(n.p,{children:["To use another version control system, run ",(0,s.jsx)(n.code,{children:"buck2 init"})," and manually download\n",(0,s.jsx)(n.a,{href:"https://github.com/facebook/buck2-prelude",children:"buck2-prelude"})," into ",(0,s.jsx)(n.code,{children:"prelude"})," at\nroot."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"buck2 init\n"})}),"\n",(0,s.jsx)(n.p,{children:"To build the entire project, run:"}),"\n",(0,s.jsxs)(n.p,{children:["Note: ",(0,s.jsx)(n.em,{children:"Requires clang and lld to be in the path"})]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"buck2 build //...\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Note that this uses a\n",(0,s.jsx)(n.a,{href:"https://github.com/facebook/buck2/blob/main/prelude/toolchains/cxx.bzl",children:"simple C++ toolchain"}),"\nthat requires a recent version of ",(0,s.jsx)(n.code,{children:"clang"})," to be installed on your system. This\ncan be installed with any package manager (ex. ",(0,s.jsx)(n.code,{children:"apt install clang"}),",\n",(0,s.jsx)(n.code,{children:"xcode-select --install"})," on macOS, ",(0,s.jsx)(n.code,{children:"choco install llvm"}),"). After installing any\nexternal tools or changing your ",(0,s.jsx)(n.code,{children:"PATH"}),", run ",(0,s.jsx)(n.code,{children:"buck2 kill"})," before running a build."]}),"\n",(0,s.jsx)(n.p,{children:"To list all targets available in the project, run:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"buck2 targets //...\n"})}),"\n",(0,s.jsx)(n.p,{children:"To run the main C++ binary, run:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"buck2 run //:main\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The newly built binary can be found with the ",(0,s.jsx)(n.code,{children:"--show-output"})," flag:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"buck2 build //:main --show-output\n"})}),"\n",(0,s.jsx)(n.p,{children:"Output:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"Build ID: 0e890477-5b7f-4829-9ffe-662e572320a0\nJobs completed: 3. Time elapsed: 0.0s.\nBUILD SUCCEEDED\nroot//:main buck-out/v2/gen/root/9f4d83578bb24895/__main__/main\n"})}),"\n",(0,s.jsx)(n.h2,{id:"creating-your-first-hello_world-project",children:"Creating your first hello_world project"}),"\n",(0,s.jsx)(n.p,{children:"This section demonstrates how to create a simple C++ 'hello_world' project."}),"\n",(0,s.jsx)(n.p,{children:"To get started, make a new folder for your project and cd into it."}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"mkdir hello_world\ncd hello_world\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Next, run ",(0,s.jsx)(n.code,{children:"buck2 init --git"})," to initialize the project. This command will set up\nyour project with ",(0,s.jsx)(n.code,{children:"git"})," and pull in\n",(0,s.jsx)(n.a,{href:"https://github.com/facebook/buck2-prelude",children:"buck2-prelude"})," as a submodule.\nAdditionally, it will generate multiple files with default values."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"buck2 init --git\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Next, add the source code ",(0,s.jsx)(n.code,{children:"main.cpp"})," ,"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-cpp",children:'#include <iostream>\nint main() {\n    std::cout << "Hello from a C++ Buck2 program!" << std::endl;\n}\n'})}),"\n",(0,s.jsxs)(n.p,{children:["Then, define a ",(0,s.jsx)(n.code,{children:"cxx_binary"})," in the root ",(0,s.jsx)(n.code,{children:"BUCK"})," file:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-Python",children:'# BUCK\ncxx_binary(\n    name = "main",\n    srcs = ["main.cpp"],\n    link_style = "static",\n)\n'})}),"\n",(0,s.jsxs)(n.p,{children:["If you try to build ",(0,s.jsx)(n.code,{children:"//:main"})," at this point, you'll see an error about ",(0,s.jsx)(n.code,{children:"buck2"}),"\nnot being able to find ",(0,s.jsx)(n.code,{children:"toolchains//:cxx"}),"."]}),"\n",(0,s.jsxs)(n.p,{children:["The final step is to define the necessary toolchain targets. For that project,\nyou need ",(0,s.jsx)(n.code,{children:"system_cxx_toolchain"})," and ",(0,s.jsx)(n.code,{children:"system_python_bootstrap_toolchain"}),", which\nwill pick up the necessary tools (clang++, python, and so on) from the system."]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-Python",children:'# toolchains/BUCK\nload("@prelude//toolchains:cxx.bzl", "system_cxx_toolchain")\nload("@prelude//toolchains:python.bzl", "system_python_bootstrap_toolchain")\n\nsystem_cxx_toolchain(\n    name = "cxx",\n    visibility = ["PUBLIC"],\n)\n\nsystem_python_bootstrap_toolchain(\n    name = "python_bootstrap",\n    visibility = ["PUBLIC"],\n)\n'})}),"\n",(0,s.jsx)(n.p,{children:"At this point, your project should have the following files:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-bash",children:'$ tree -a -I "buck-out|prelude|.git"\n|-- .buckconfig\n|-- .gitmodules\n|-- BUCK\n|-- main.cpp\n`-- toolchains\n    `-- BUCK\n'})}),"\n",(0,s.jsx)(n.p,{children:"Now, you're ready to see the build in action."}),"\n",(0,s.jsx)(n.p,{children:"To build the main C++ target, run:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"buck2 build //:main\n"})}),"\n",(0,s.jsx)(n.p,{children:"To run the main C++ target, run:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-sh",children:"buck2 run //:main\n"})}),"\n",(0,s.jsxs)(n.p,{children:["In summary, a ",(0,s.jsx)(n.code,{children:"buck2"})," project requires:"]}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsxs)(n.li,{children:["A ",(0,s.jsx)(n.code,{children:".buckconfig"})," file in the root which has a ",(0,s.jsx)(n.code,{children:"[cells]"})," section listing out\n",(0,s.jsx)(n.a,{href:"https://buck2.build/docs/concepts/glossary/#cell",children:"cells"})]}),"\n",(0,s.jsxs)(n.li,{children:["A ",(0,s.jsx)(n.code,{children:"prelude"})," directory, which contains a collection of\n",(0,s.jsx)(n.a,{href:"https://buck2.build/docs/concepts/glossary/#rule",children:"rules"})," of your choice.\n",(0,s.jsx)(n.code,{children:"buck2 init"})," will pull in the\n",(0,s.jsx)(n.a,{href:"https://github.com/facebook/buck2-prelude.git",children:"buck2-prelude"})," as a git\nsubmodule by default"]}),"\n",(0,s.jsxs)(n.li,{children:["If using the ",(0,s.jsx)(n.a,{href:"https://github.com/facebook/buck2-prelude.git",children:"buck2-prelude"}),",\na ",(0,s.jsx)(n.code,{children:"toolchains"})," directory that declares relevant toolchains. We provide some\nbasic toolchains in\n",(0,s.jsx)(n.a,{href:"https://github.com/facebook/buck2/tree/main/prelude/toolchains",children:"prelude/toolchains"})]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.code,{children:"BUCK"})," files that specify targets for your project"]}),"\n"]}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"buck2 init --git"})," will generate all of these with reasonable default values."]}),"\n",(0,s.jsx)(n.h2,{id:"learning-more",children:"Learning More"}),"\n",(0,s.jsxs)(n.p,{children:["You should now be ready to explore Buck2 for use in your own projects. You can\nexplore the ",(0,s.jsx)(n.a,{href:"https://github.com/facebook/buck2/tree/main/examples",children:"examples"}),"\nfolder. Look out for more tutorials in the future."]}),"\n",(0,s.jsxs)(l.FbInternalOnly,{children:[(0,s.jsx)(n.h2,{id:"communication-channels",children:"Communication channels"}),(0,s.jsx)(n.p,{children:"The following channels provide an insight into Buck2:"}),(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://fb.workplace.com/groups/buck2prototyping",children:"Buck2 Engineering"})," -\nWorkplace group for discussions about what features Buck2 should have, how\nit's going, status updates, and much more."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://fb.workplace.com/groups/buck2users",children:"Buck2 Users"})," - Workplace group\nfeaturing questions from users and reports of bugs."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://fb.workplace.com/groups/347532827186692",children:"Buck2 Rule Authors"})," -\nWorkplace group for discussions about language-specific rules."]}),"\n",(0,s.jsxs)(n.li,{children:[(0,s.jsx)(n.a,{href:"https://www.internalfb.com/intern/monitor/oncall_profile?oncall=buck2",children:"Buck2 Oncall Hub"})," -\nurgent tasks and escalation."]}),"\n"]})]})]})}function u(e={}){const{wrapper:n}={...(0,t.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(h,{...e})}):h(e)}},28453:(e,n,i)=>{i.d(n,{R:()=>o,x:()=>c});var s=i(96540);const t={},l=s.createContext(t);function o(e){const n=s.useContext(l);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(t):e.components||t:o(e.components),s.createElement(l.Provider,{value:n},e.children)}}}]);