"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[9825],{45932:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>i,toc:()=>c});var s=n(74848),a=n(28453);const o={id:"status",title:"status"},r=void 0,i={id:"users/commands/status",title:"status",description:"These are the flags/commands under buck2 status and their --help output:",source:"@site/../docs/users/commands/status.generated.md",sourceDirName:"users/commands",slug:"/users/commands/status",permalink:"/docs/users/commands/status",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"status",title:"status"},sidebar:"main",previous:{title:"starlark",permalink:"/docs/users/commands/starlark"},next:{title:"subscribe",permalink:"/docs/users/commands/subscribe"}},u={},c=[];function l(e){const t={code:"code",p:"p",pre:"pre",...(0,a.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(t.p,{children:["These are the flags/commands under ",(0,s.jsx)(t.code,{children:"buck2 status"})," and their ",(0,s.jsx)(t.code,{children:"--help"})," output:"]}),"\n",(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:"language-text",children:"Buckd status\n\nUsage: buck2-release status [OPTIONS]\n\nOptions:\n      --snapshot\n          Whether to include a state snapshot in the output.\n\n      --all\n          Enable printing status for all running buckd\n\n  -h, --help\n          Print help (see a summary with '-h')\n\nUniversal Options:\n  -v, --verbose <VERBOSITY>\n          How verbose buck should be while logging.\n          \n          Values: 0 = Quiet, errors only; 1 = Show status. Default; 2 = more info about errors; 3 =\n          more info about everything; 4 = more info about everything + stderr;\n          \n          It can be combined with specific log items (stderr, full_failed_command, commands,\n          actions, status, stats, success) to fine-tune the verbosity of the log. Example usage\n          \"-v=1,stderr\"\n          \n          [default: 1]\n\n      --oncall <ONCALL>\n          The oncall executing this command\n\n      --client-metadata <CLIENT_METADATA>\n          Metadata key-value pairs to inject into Buck2's logging. Client metadata must be of the\n          form `key=value`, where `key` is a snake_case identifier, and will be sent to backend\n          datasets\n\n"})})]})}function d(e={}){const{wrapper:t}={...(0,a.R)(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(l,{...e})}):l(e)}},28453:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>i});var s=n(96540);const a={},o=s.createContext(a);function r(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function i(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:r(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);