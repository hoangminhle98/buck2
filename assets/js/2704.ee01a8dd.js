"use strict";(self.webpackChunkwebsite=self.webpackChunkwebsite||[]).push([[2704],{92704:(t,e,n)=>{n.d(e,{diagram:()=>b});var i=n(36212),s=n(12546),r=n(43457),a=n(26312),o=n(37295),c=n(3219),h=n(78041),l=n(75263),d=(n(74353),n(16750),n(42838),function(){var t=function(t,e,n,i){for(n=n||{},i=t.length;i--;n[t[i]]=e);return n},e=[1,4],n=[1,13],i=[1,12],s=[1,15],r=[1,16],a=[1,20],o=[1,19],c=[6,7,8],h=[1,26],l=[1,24],d=[1,25],g=[6,7,11],p=[1,6,13,15,16,19,22],y=[1,33],u=[1,34],f=[1,6,7,11,13,15,16,19,22],m={trace:function(){},yy:{},symbols_:{error:2,start:3,mindMap:4,spaceLines:5,SPACELINE:6,NL:7,MINDMAP:8,document:9,stop:10,EOF:11,statement:12,SPACELIST:13,node:14,ICON:15,CLASS:16,nodeWithId:17,nodeWithoutId:18,NODE_DSTART:19,NODE_DESCR:20,NODE_DEND:21,NODE_ID:22,$accept:0,$end:1},terminals_:{2:"error",6:"SPACELINE",7:"NL",8:"MINDMAP",11:"EOF",13:"SPACELIST",15:"ICON",16:"CLASS",19:"NODE_DSTART",20:"NODE_DESCR",21:"NODE_DEND",22:"NODE_ID"},productions_:[0,[3,1],[3,2],[5,1],[5,2],[5,2],[4,2],[4,3],[10,1],[10,1],[10,1],[10,2],[10,2],[9,3],[9,2],[12,2],[12,2],[12,2],[12,1],[12,1],[12,1],[12,1],[12,1],[14,1],[14,1],[18,3],[17,1],[17,4]],performAction:function(t,e,n,i,s,r,a){var o=r.length-1;switch(s){case 6:case 7:return i;case 8:i.getLogger().trace("Stop NL ");break;case 9:i.getLogger().trace("Stop EOF ");break;case 11:i.getLogger().trace("Stop NL2 ");break;case 12:i.getLogger().trace("Stop EOF2 ");break;case 15:i.getLogger().info("Node: ",r[o].id),i.addNode(r[o-1].length,r[o].id,r[o].descr,r[o].type);break;case 16:i.getLogger().trace("Icon: ",r[o]),i.decorateNode({icon:r[o]});break;case 17:case 21:i.decorateNode({class:r[o]});break;case 18:i.getLogger().trace("SPACELIST");break;case 19:i.getLogger().trace("Node: ",r[o].id),i.addNode(0,r[o].id,r[o].descr,r[o].type);break;case 20:i.decorateNode({icon:r[o]});break;case 25:i.getLogger().trace("node found ..",r[o-2]),this.$={id:r[o-1],descr:r[o-1],type:i.getType(r[o-2],r[o])};break;case 26:this.$={id:r[o],descr:r[o],type:i.nodeType.DEFAULT};break;case 27:i.getLogger().trace("node found ..",r[o-3]),this.$={id:r[o-3],descr:r[o-1],type:i.getType(r[o-2],r[o])}}},table:[{3:1,4:2,5:3,6:[1,5],8:e},{1:[3]},{1:[2,1]},{4:6,6:[1,7],7:[1,8],8:e},{6:n,7:[1,10],9:9,12:11,13:i,14:14,15:s,16:r,17:17,18:18,19:a,22:o},t(c,[2,3]),{1:[2,2]},t(c,[2,4]),t(c,[2,5]),{1:[2,6],6:n,12:21,13:i,14:14,15:s,16:r,17:17,18:18,19:a,22:o},{6:n,9:22,12:11,13:i,14:14,15:s,16:r,17:17,18:18,19:a,22:o},{6:h,7:l,10:23,11:d},t(g,[2,22],{17:17,18:18,14:27,15:[1,28],16:[1,29],19:a,22:o}),t(g,[2,18]),t(g,[2,19]),t(g,[2,20]),t(g,[2,21]),t(g,[2,23]),t(g,[2,24]),t(g,[2,26],{19:[1,30]}),{20:[1,31]},{6:h,7:l,10:32,11:d},{1:[2,7],6:n,12:21,13:i,14:14,15:s,16:r,17:17,18:18,19:a,22:o},t(p,[2,14],{7:y,11:u}),t(f,[2,8]),t(f,[2,9]),t(f,[2,10]),t(g,[2,15]),t(g,[2,16]),t(g,[2,17]),{20:[1,35]},{21:[1,36]},t(p,[2,13],{7:y,11:u}),t(f,[2,11]),t(f,[2,12]),{21:[1,37]},t(g,[2,25]),t(g,[2,27])],defaultActions:{2:[2,1],6:[2,2]},parseError:function(t,e){if(!e.recoverable){var n=new Error(t);throw n.hash=e,n}this.trace(t)},parse:function(t){var e=this,n=[0],i=[],s=[null],r=[],a=this.table,o="",c=0,h=0,l=r.slice.call(arguments,1),d=Object.create(this.lexer),g={yy:{}};for(var p in this.yy)Object.prototype.hasOwnProperty.call(this.yy,p)&&(g.yy[p]=this.yy[p]);d.setInput(t,g.yy),g.yy.lexer=d,g.yy.parser=this,void 0===d.yylloc&&(d.yylloc={});var y=d.yylloc;r.push(y);var u=d.options&&d.options.ranges;"function"==typeof g.yy.parseError?this.parseError=g.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;for(var f,m,$,_,E,b,k,x,N,S={};;){if(m=n[n.length-1],this.defaultActions[m]?$=this.defaultActions[m]:(null==f&&(N=void 0,"number"!=typeof(N=i.pop()||d.lex()||1)&&(N instanceof Array&&(N=(i=N).pop()),N=e.symbols_[N]||N),f=N),$=a[m]&&a[m][f]),void 0===$||!$.length||!$[0]){var L="";for(E in x=[],a[m])this.terminals_[E]&&E>2&&x.push("'"+this.terminals_[E]+"'");L=d.showPosition?"Parse error on line "+(c+1)+":\n"+d.showPosition()+"\nExpecting "+x.join(", ")+", got '"+(this.terminals_[f]||f)+"'":"Parse error on line "+(c+1)+": Unexpected "+(1==f?"end of input":"'"+(this.terminals_[f]||f)+"'"),this.parseError(L,{text:d.match,token:this.terminals_[f]||f,line:d.yylineno,loc:y,expected:x})}if($[0]instanceof Array&&$.length>1)throw new Error("Parse Error: multiple actions possible at state: "+m+", token: "+f);switch($[0]){case 1:n.push(f),s.push(d.yytext),r.push(d.yylloc),n.push($[1]),f=null,h=d.yyleng,o=d.yytext,c=d.yylineno,y=d.yylloc;break;case 2:if(b=this.productions_[$[1]][1],S.$=s[s.length-b],S._$={first_line:r[r.length-(b||1)].first_line,last_line:r[r.length-1].last_line,first_column:r[r.length-(b||1)].first_column,last_column:r[r.length-1].last_column},u&&(S._$.range=[r[r.length-(b||1)].range[0],r[r.length-1].range[1]]),void 0!==(_=this.performAction.apply(S,[o,h,c,g.yy,$[1],s,r].concat(l))))return _;b&&(n=n.slice(0,-1*b*2),s=s.slice(0,-1*b),r=r.slice(0,-1*b)),n.push(this.productions_[$[1]][0]),s.push(S.$),r.push(S._$),k=a[n[n.length-2]][n[n.length-1]],n.push(k);break;case 3:return!0}}return!0}},$={EOF:1,parseError:function(t,e){if(!this.yy.parser)throw new Error(t);this.yy.parser.parseError(t,e)},setInput:function(t,e){return this.yy=e||this.yy||{},this._input=t,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var t=this._input[0];return this.yytext+=t,this.yyleng++,this.offset++,this.match+=t,this.matched+=t,t.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),t},unput:function(t){var e=t.length,n=t.split(/(?:\r\n?|\n)/g);this._input=t+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-e),this.offset-=e;var i=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),n.length-1&&(this.yylineno-=n.length-1);var s=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:n?(n.length===i.length?this.yylloc.first_column:0)+i[i.length-n.length].length-n[0].length:this.yylloc.first_column-e},this.options.ranges&&(this.yylloc.range=[s[0],s[0]+this.yyleng-e]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},less:function(t){this.unput(this.match.slice(t))},pastInput:function(){var t=this.matched.substr(0,this.matched.length-this.match.length);return(t.length>20?"...":"")+t.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var t=this.match;return t.length<20&&(t+=this._input.substr(0,20-t.length)),(t.substr(0,20)+(t.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var t=this.pastInput(),e=new Array(t.length+1).join("-");return t+this.upcomingInput()+"\n"+e+"^"},test_match:function(t,e){var n,i,s;if(this.options.backtrack_lexer&&(s={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(s.yylloc.range=this.yylloc.range.slice(0))),(i=t[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=i.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:i?i[i.length-1].length-i[i.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+t[0].length},this.yytext+=t[0],this.match+=t[0],this.matches=t,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(t[0].length),this.matched+=t[0],n=this.performAction.call(this,this.yy,this,e,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),n)return n;if(this._backtrack){for(var r in s)this[r]=s[r];return!1}return!1},next:function(){if(this.done)return this.EOF;var t,e,n,i;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var s=this._currentRules(),r=0;r<s.length;r++)if((n=this._input.match(this.rules[s[r]]))&&(!e||n[0].length>e[0].length)){if(e=n,i=r,this.options.backtrack_lexer){if(!1!==(t=this.test_match(n,s[r])))return t;if(this._backtrack){e=!1;continue}return!1}if(!this.options.flex)break}return e?!1!==(t=this.test_match(e,s[i]))&&t:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){var t=this.next();return t||this.lex()},begin:function(t){this.conditionStack.push(t)},popState:function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(t){return(t=this.conditionStack.length-1-Math.abs(t||0))>=0?this.conditionStack[t]:"INITIAL"},pushState:function(t){this.begin(t)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(t,e,n,i){switch(n){case 0:return t.getLogger().trace("Found comment",e.yytext),6;case 1:return 8;case 2:this.begin("CLASS");break;case 3:return this.popState(),16;case 4:case 23:case 26:this.popState();break;case 5:t.getLogger().trace("Begin icon"),this.begin("ICON");break;case 6:return t.getLogger().trace("SPACELINE"),6;case 7:return 7;case 8:return 15;case 9:t.getLogger().trace("end icon"),this.popState();break;case 10:return t.getLogger().trace("Exploding node"),this.begin("NODE"),19;case 11:return t.getLogger().trace("Cloud"),this.begin("NODE"),19;case 12:return t.getLogger().trace("Explosion Bang"),this.begin("NODE"),19;case 13:return t.getLogger().trace("Cloud Bang"),this.begin("NODE"),19;case 14:case 15:case 16:case 17:return this.begin("NODE"),19;case 18:return 13;case 19:return 22;case 20:return 11;case 21:this.begin("NSTR2");break;case 22:return"NODE_DESCR";case 24:t.getLogger().trace("Starting NSTR"),this.begin("NSTR");break;case 25:return t.getLogger().trace("description:",e.yytext),"NODE_DESCR";case 27:return this.popState(),t.getLogger().trace("node end ))"),"NODE_DEND";case 28:return this.popState(),t.getLogger().trace("node end )"),"NODE_DEND";case 29:return this.popState(),t.getLogger().trace("node end ...",e.yytext),"NODE_DEND";case 30:case 33:case 34:return this.popState(),t.getLogger().trace("node end (("),"NODE_DEND";case 31:case 32:return this.popState(),t.getLogger().trace("node end (-"),"NODE_DEND";case 35:case 36:return t.getLogger().trace("Long description:",e.yytext),20}},rules:[/^(?:\s*%%.*)/i,/^(?:mindmap\b)/i,/^(?::::)/i,/^(?:.+)/i,/^(?:\n)/i,/^(?:::icon\()/i,/^(?:[\s]+[\n])/i,/^(?:[\n]+)/i,/^(?:[^\)]+)/i,/^(?:\))/i,/^(?:-\))/i,/^(?:\(-)/i,/^(?:\)\))/i,/^(?:\))/i,/^(?:\(\()/i,/^(?:\{\{)/i,/^(?:\()/i,/^(?:\[)/i,/^(?:[\s]+)/i,/^(?:[^\(\[\n\)\{\}]+)/i,/^(?:$)/i,/^(?:["][`])/i,/^(?:[^`"]+)/i,/^(?:[`]["])/i,/^(?:["])/i,/^(?:[^"]+)/i,/^(?:["])/i,/^(?:[\)]\))/i,/^(?:[\)])/i,/^(?:[\]])/i,/^(?:\}\})/i,/^(?:\(-)/i,/^(?:-\))/i,/^(?:\(\()/i,/^(?:\()/i,/^(?:[^\)\]\(\}]+)/i,/^(?:.+(?!\(\())/i],conditions:{CLASS:{rules:[3,4],inclusive:!1},ICON:{rules:[8,9],inclusive:!1},NSTR2:{rules:[22,23],inclusive:!1},NSTR:{rules:[25,26],inclusive:!1},NODE:{rules:[21,24,27,28,29,30,31,32,33,34,35,36],inclusive:!1},INITIAL:{rules:[0,1,2,5,6,7,10,11,12,13,14,15,16,17,18,19,20],inclusive:!0}}};function _(){this.yy={}}return m.lexer=$,_.prototype=m,m.Parser=_,new _}());d.parser=d;const g=d;let p=[],y=0,u={};const f={DEFAULT:0,NO_BORDER:0,ROUNDED_RECT:1,RECT:2,CIRCLE:3,CLOUD:4,BANG:5,HEXAGON:6},m={clear:()=>{p=[],y=0,u={}},addNode:(t,e,n,s)=>{var r,a;i.l.info("addNode",t,e,n,s);const o=(0,i.c)();let c=(null==(r=o.mindmap)?void 0:r.padding)??i.B.mindmap.padding;switch(s){case f.ROUNDED_RECT:case f.RECT:case f.HEXAGON:c*=2}const h={id:y++,nodeId:(0,i.d)(e,o),level:t,descr:(0,i.d)(n,o),type:s,children:[],width:(null==(a=o.mindmap)?void 0:a.maxNodeWidth)??i.B.mindmap.maxNodeWidth,padding:c},l=function(t){for(let e=p.length-1;e>=0;e--)if(p[e].level<t)return p[e];return null}(t);if(l)l.children.push(h),p.push(h);else{if(0!==p.length)throw new Error('There can be only one root. No parent could be found for ("'+h.descr+'")');p.push(h)}},getMindmap:()=>p.length>0?p[0]:null,nodeType:f,getType:(t,e)=>{switch(i.l.debug("In get type",t,e),t){case"[":return f.RECT;case"(":return")"===e?f.ROUNDED_RECT:f.CLOUD;case"((":return f.CIRCLE;case")":return f.CLOUD;case"))":return f.BANG;case"{{":return f.HEXAGON;default:return f.DEFAULT}},setElementForId:(t,e)=>{u[t]=e},decorateNode:t=>{if(!t)return;const e=(0,i.c)(),n=p[p.length-1];t.icon&&(n.icon=(0,i.d)(t.icon,e)),t.class&&(n.class=(0,i.d)(t.class,e))},type2Str:t=>{switch(t){case f.DEFAULT:return"no-border";case f.RECT:return"rect";case f.ROUNDED_RECT:return"rounded-rect";case f.CIRCLE:return"circle";case f.CLOUD:return"cloud";case f.BANG:return"bang";case f.HEXAGON:return"hexgon";default:return"no-border"}},getLogger:()=>i.l,getElementById:t=>u[t]};function $(t,e,n,s,r){!function(t,e,n,s,r){const a=r.htmlLabels,c=s%11,h=e.append("g");n.section=c;let l="section-"+c;c<0&&(l+=" section-root"),h.attr("class",(n.class?n.class+" ":"")+"mindmap-node "+l);const d=h.append("g"),g=h.append("g"),p=n.descr.replace(/(<br\/*>)/g,"\n");(0,o.a)(g,p,{useHtmlLabels:a,width:n.width,classes:"mindmap-node-label"}),a||g.attr("dy","1em").attr("alignment-baseline","middle").attr("dominant-baseline","middle").attr("text-anchor","middle");const y=g.node().getBBox(),[u]=(0,i.D)(r.fontSize);if(n.height=y.height+1.1*u*.5+n.padding,n.width=y.width+2*n.padding,n.icon)if(n.type===t.nodeType.CIRCLE)n.height+=50,n.width+=50,h.append("foreignObject").attr("height","50px").attr("width",n.width).attr("style","text-align: center;").append("div").attr("class","icon-container").append("i").attr("class","node-icon-"+c+" "+n.icon),g.attr("transform","translate("+n.width/2+", "+(n.height/2-1.5*n.padding)+")");else{n.width+=50;const t=n.height;n.height=Math.max(t,60);const e=Math.abs(n.height-t);h.append("foreignObject").attr("width","60px").attr("height",n.height).attr("style","text-align: center;margin-top:"+e/2+"px;").append("div").attr("class","icon-container").append("i").attr("class","node-icon-"+c+" "+n.icon),g.attr("transform","translate("+(25+n.width/2)+", "+(e/2+n.padding/2)+")")}else if(a){const t=(n.width-y.width)/2,e=(n.height-y.height)/2;g.attr("transform","translate("+t+", "+e+")")}else{const t=n.width/2,e=n.padding/2;g.attr("transform","translate("+t+", "+e+")")}switch(n.type){case t.nodeType.DEFAULT:!function(t,e,n,i){e.append("path").attr("id","node-"+n.id).attr("class","node-bkg node-"+t.type2Str(n.type)).attr("d",`M0 ${n.height-5} v${10-n.height} q0,-5 5,-5 h${n.width-10} q5,0 5,5 v${n.height-5} H0 Z`),e.append("line").attr("class","node-line-"+i).attr("x1",0).attr("y1",n.height).attr("x2",n.width).attr("y2",n.height)}(t,d,n,c);break;case t.nodeType.ROUNDED_RECT:!function(t,e,n){e.append("rect").attr("id","node-"+n.id).attr("class","node-bkg node-"+t.type2Str(n.type)).attr("height",n.height).attr("rx",n.padding).attr("ry",n.padding).attr("width",n.width)}(t,d,n);break;case t.nodeType.RECT:!function(t,e,n){e.append("rect").attr("id","node-"+n.id).attr("class","node-bkg node-"+t.type2Str(n.type)).attr("height",n.height).attr("width",n.width)}(t,d,n);break;case t.nodeType.CIRCLE:d.attr("transform","translate("+n.width/2+", "+ +n.height/2+")"),function(t,e,n){e.append("circle").attr("id","node-"+n.id).attr("class","node-bkg node-"+t.type2Str(n.type)).attr("r",n.width/2)}(t,d,n);break;case t.nodeType.CLOUD:!function(t,e,n){const i=n.width,s=n.height,r=.15*i,a=.25*i,o=.35*i,c=.2*i;e.append("path").attr("id","node-"+n.id).attr("class","node-bkg node-"+t.type2Str(n.type)).attr("d",`M0 0 a${r},${r} 0 0,1 ${.25*i},${-1*i*.1}\n      a${o},${o} 1 0,1 ${.4*i},${-1*i*.1}\n      a${a},${a} 1 0,1 ${.35*i},${1*i*.2}\n\n      a${r},${r} 1 0,1 ${.15*i},${1*s*.35}\n      a${c},${c} 1 0,1 ${-1*i*.15},${1*s*.65}\n\n      a${a},${r} 1 0,1 ${-1*i*.25},${.15*i}\n      a${o},${o} 1 0,1 ${-1*i*.5},0\n      a${r},${r} 1 0,1 ${-1*i*.25},${-1*i*.15}\n\n      a${r},${r} 1 0,1 ${-1*i*.1},${-1*s*.35}\n      a${c},${c} 1 0,1 ${.1*i},${-1*s*.65}\n\n    H0 V0 Z`)}(t,d,n);break;case t.nodeType.BANG:!function(t,e,n){const i=n.width,s=n.height,r=.15*i;e.append("path").attr("id","node-"+n.id).attr("class","node-bkg node-"+t.type2Str(n.type)).attr("d",`M0 0 a${r},${r} 1 0,0 ${.25*i},${-1*s*.1}\n      a${r},${r} 1 0,0 ${.25*i},0\n      a${r},${r} 1 0,0 ${.25*i},0\n      a${r},${r} 1 0,0 ${.25*i},${1*s*.1}\n\n      a${r},${r} 1 0,0 ${.15*i},${1*s*.33}\n      a${.8*r},${.8*r} 1 0,0 0,${1*s*.34}\n      a${r},${r} 1 0,0 ${-1*i*.15},${1*s*.33}\n\n      a${r},${r} 1 0,0 ${-1*i*.25},${.15*s}\n      a${r},${r} 1 0,0 ${-1*i*.25},0\n      a${r},${r} 1 0,0 ${-1*i*.25},0\n      a${r},${r} 1 0,0 ${-1*i*.25},${-1*s*.15}\n\n      a${r},${r} 1 0,0 ${-1*i*.1},${-1*s*.33}\n      a${.8*r},${.8*r} 1 0,0 0,${-1*s*.34}\n      a${r},${r} 1 0,0 ${.1*i},${-1*s*.33}\n\n    H0 V0 Z`)}(t,d,n);break;case t.nodeType.HEXAGON:!function(t,e,n){const i=n.height,s=i/4,r=n.width-n.padding+2*s;!function(t,e,n,i,s){t.insert("polygon",":first-child").attr("points",i.map((function(t){return t.x+","+t.y})).join(" ")).attr("transform","translate("+(s.width-e)/2+", "+n+")")}(e,r,i,[{x:s,y:0},{x:r-s,y:0},{x:r,y:-i/2},{x:r-s,y:-i},{x:s,y:-i},{x:0,y:-i/2}],n)}(0,d,n)}t.setElementForId(n.id,h),n.height}(t,e,n,s,r),n.children&&n.children.forEach(((n,i)=>{$(t,e,n,s<0?i:s,r)}))}function _(t,e,n,i){e.add({group:"nodes",data:{id:t.id.toString(),labelText:t.descr,height:t.height,width:t.width,level:i,nodeId:t.id,padding:t.padding,type:t.type},position:{x:t.x,y:t.y}}),t.children&&t.children.forEach((s=>{_(s,e,n,i+1),e.add({group:"edges",data:{id:`${t.id}_${s.id}`,source:t.id,target:s.id,depth:i,section:s.section}})}))}function E(t,e){return new Promise((n=>{const r=(0,a.Ltv)("body").append("div").attr("id","cy").attr("style","display:none"),o=(0,s.A)({container:document.getElementById("cy"),style:[{selector:"edge",style:{"curve-style":"bezier"}}]});r.remove(),_(t,o,e,0),o.nodes().forEach((function(t){t.layoutDimensions=()=>{const e=t.data();return{w:e.width,h:e.height}}})),o.layout({name:"cose-bilkent",quality:"proof",styleEnabled:!1,animate:!1}).run(),o.ready((t=>{i.l.info("Ready",t),n(o)}))}))}s.A.use(r);const b={db:m,renderer:{draw:async(t,e,n,s)=>{var r,a;i.l.debug("Rendering mindmap diagram\n"+t);const o=s.db,c=o.getMindmap();if(!c)return;const h=(0,i.c)();h.htmlLabels=!1;const l=(0,i.A)(e),d=l.append("g");d.attr("class","mindmap-edges");const g=l.append("g");g.attr("class","mindmap-nodes"),$(o,g,c,-1,h);const p=await E(c,h);!function(t,e){e.edges().map(((e,n)=>{const s=e.data();if(e[0]._private.bodyBounds){const r=e[0]._private.rscratch;i.l.trace("Edge: ",n,s),t.insert("path").attr("d",`M ${r.startX},${r.startY} L ${r.midX},${r.midY} L${r.endX},${r.endY} `).attr("class","edge section-edge-"+s.section+" edge-depth-"+s.depth)}}))}(d,p),function(t,e){e.nodes().map(((e,n)=>{const s=e.data();s.x=e.position().x,s.y=e.position().y,function(t,e){const n=t.getElementById(e.id),i=e.x||0,s=e.y||0;n.attr("transform","translate("+i+","+s+")")}(t,s);const r=t.getElementById(s.nodeId);i.l.info("Id:",n,"Position: (",e.position().x,", ",e.position().y,")",s),r.attr("transform",`translate(${e.position().x-s.width/2}, ${e.position().y-s.height/2})`),r.attr("attr",`apa-${n})`)}))}(o,p),(0,i.o)(void 0,l,(null==(r=h.mindmap)?void 0:r.padding)??i.B.mindmap.padding,(null==(a=h.mindmap)?void 0:a.useMaxWidth)??i.B.mindmap.useMaxWidth)}},parser:g,styles:t=>`\n  .edge {\n    stroke-width: 3;\n  }\n  ${(t=>{let e="";for(let n=0;n<t.THEME_COLOR_LIMIT;n++)t["lineColor"+n]=t["lineColor"+n]||t["cScaleInv"+n],(0,c.A)(t["lineColor"+n])?t["lineColor"+n]=(0,h.A)(t["lineColor"+n],20):t["lineColor"+n]=(0,l.A)(t["lineColor"+n],20);for(let n=0;n<t.THEME_COLOR_LIMIT;n++){const i=""+(17-3*n);e+=`\n    .section-${n-1} rect, .section-${n-1} path, .section-${n-1} circle, .section-${n-1} polygon, .section-${n-1} path  {\n      fill: ${t["cScale"+n]};\n    }\n    .section-${n-1} text {\n     fill: ${t["cScaleLabel"+n]};\n    }\n    .node-icon-${n-1} {\n      font-size: 40px;\n      color: ${t["cScaleLabel"+n]};\n    }\n    .section-edge-${n-1}{\n      stroke: ${t["cScale"+n]};\n    }\n    .edge-depth-${n-1}{\n      stroke-width: ${i};\n    }\n    .section-${n-1} line {\n      stroke: ${t["cScaleInv"+n]} ;\n      stroke-width: 3;\n    }\n\n    .disabled, .disabled circle, .disabled text {\n      fill: lightgray;\n    }\n    .disabled text {\n      fill: #efefef;\n    }\n    `}return e})(t)}\n  .section-root rect, .section-root path, .section-root circle, .section-root polygon  {\n    fill: ${t.git0};\n  }\n  .section-root text {\n    fill: ${t.gitBranchLabel0};\n  }\n  .icon-container {\n    height:100%;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n  }\n  .edge {\n    fill: none;\n  }\n  .mindmap-node-label {\n    dy: 1em;\n    alignment-baseline: middle;\n    text-anchor: middle;\n    dominant-baseline: middle;\n    text-align: center;\n  }\n`}}}]);