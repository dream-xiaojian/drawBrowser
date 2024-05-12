var St=Object.defineProperty;var bt=(e,t,r)=>t in e?St(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r;var y=(e,t,r)=>(bt(e,typeof t!="symbol"?t+"":t,r),r);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))s(i);new MutationObserver(i=>{for(const l of i)if(l.type==="childList")for(const u of l.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&s(u)}).observe(document,{childList:!0,subtree:!0});function r(i){const l={};return i.integrity&&(l.integrity=i.integrity),i.referrerPolicy&&(l.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?l.credentials="include":i.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(i){if(i.ep)return;i.ep=!0;const l=r(i);fetch(i.href,l)}})();function mt(e){return e.replace(/[A-Z]/g,t=>`-${t.toLowerCase()}`)}function vt(e,t){let r=t.getBoundingClientRect(),s=e.clientX-r.left,i=e.clientY-r.top;return{x:s,y:i}}function j(...e){return e.reduce((r,s)=>r+s,0)/e.length}class T{constructor(t,r){y(this,"el",null);y(this,"pointEvent",null);this.strategyStyle=t,this.keys=r}isKeyPass(t){return this.keys[t]||!1}setStyle(t){for(let r in this.strategyStyle)if(this.strategyStyle.hasOwnProperty(r)){let s=r;t.setAttribute(mt(r),String(this.strategyStyle[s]))}}createElement(t){const r=document.createElementNS("http://www.w3.org/2000/svg",t);return this.setStyle(r),r}onStart(t){}onProcess(t){}onEnd(t){}initMouseCoordinates(t,r){return this.pointEvent=t,vt(t,r)}_eventStart(t,r){let s=this.initMouseCoordinates(t,r);return this.onStart(s)}_eventProcess(t,r){let s=this.initMouseCoordinates(t,r);return this.onProcess(s)}_eventEnd(t,r){let s=this.initMouseCoordinates(t,r);return this.onEnd(s)}static getSvgPathFromStroke(t){const r=t.length;if(r<4)return"";let s=t[0],i=t[1];const l=t[2];let u=`M${s[0].toFixed(2)},${s[1].toFixed(2)} Q${i[0].toFixed(2)},${i[1].toFixed(2)} ${j(i[0],l[0]).toFixed(2)},${j(i[1],l[1]).toFixed(2)} T`;for(let n=2,a=r-1;n<a;n++)s=t[n],i=t[n+1],u+=`${j(s[0],i[0]).toFixed(2)},${j(s[1],i[1]).toFixed(2)} `;return u+="Z",u}}class Pt extends T{onStart(t){return this.el=this.createElement("line"),this.el.setAttribute("x1",t.x.toString()),this.el.setAttribute("y1",t.y.toString()),this.el.setAttribute("x2",t.x.toString()),this.el.setAttribute("y2",t.y.toString()),this.el}onProcess(t){if(this.el==null)return!1;if(this.isKeyPass("Shift")){const r=t.x-parseInt(this.el.getAttribute("x1")),s=t.y-parseInt(this.el.getAttribute("y1"));let i=Math.atan2(s,r)*180/Math.PI;i=Math.round(i/45)*45;const l=Math.sqrt(r*r+s*s);t.x=parseInt(this.el.getAttribute("x1"))+l*Math.cos(i*Math.PI/180),t.y=parseInt(this.el.getAttribute("y1"))+l*Math.sin(i*Math.PI/180)}return this.el.setAttribute("x2",t.x.toString()),this.el.setAttribute("y2",t.y.toString()),!0}onEnd(t){return this.el=null,!0}}function Et(e,t){return new Pt(e,t)}class wt extends T{constructor(){super(...arguments);y(this,"startPoint",null)}onStart(r){return this.el=this.createElement("ellipse"),this.startPoint=r,this.el}onProcess(r){return this.el==null||this.startPoint==null?!1:(this.calculate(r),!0)}onEnd(r){return this.el=null,!0}calculate(r){let s=this.startPoint.x,i=this.startPoint.y,l=r.x,u=r.y,n=Math.abs(l-s)/2,a=Math.abs(u-i)/2;if(this.isKeyPass("Shift")){let S=Math.min(n,a);n=S,a=S}let v=s+n,E=i+a;l<s&&(v=s-n),u<i&&(E=i-a),this.el.setAttribute("cx",v.toString()),this.el.setAttribute("cy",E.toString()),this.el.setAttribute("rx",n.toString()),this.el.setAttribute("ry",a.toString())}}function At(e,t){return new wt(e,t)}function nt(e,t,r,s=i=>i){return e*s(.5-t*(.5-r))}function Mt(e){return[-e[0],-e[1]]}function m(e,t){return[e[0]+t[0],e[1]+t[1]]}function x(e,t){return[e[0]-t[0],e[1]-t[1]]}function b(e,t){return[e[0]*t,e[1]*t]}function Lt(e,t){return[e[0]/t,e[1]/t]}function $(e){return[e[1],-e[0]]}function ot(e,t){return e[0]*t[0]+e[1]*t[1]}function Bt(e,t){return e[0]===t[0]&&e[1]===t[1]}function Ft(e){return Math.hypot(e[0],e[1])}function _t(e){return e[0]*e[0]+e[1]*e[1]}function lt(e,t){return _t(x(e,t))}function gt(e){return Lt(e,Ft(e))}function Tt(e,t){return Math.hypot(e[1]-t[1],e[0]-t[0])}function O(e,t,r){let s=Math.sin(r),i=Math.cos(r),l=e[0]-t[0],u=e[1]-t[1],n=l*i-u*s,a=l*s+u*i;return[n+t[0],a+t[1]]}function J(e,t,r){return m(e,b(x(t,e),r))}function at(e,t,r){return m(e,b(t,r))}var{min:_,PI:kt}=Math,ht=.275,I=kt+1e-4;function Ct(e,t={}){let{size:r=16,smoothing:s=.5,thinning:i=.5,simulatePressure:l=!0,easing:u=o=>o,start:n={},end:a={},last:v=!1}=t,{cap:E=!0,easing:S=o=>o*(2-o)}=n,{cap:z=!0,easing:f=o=>--o*o*o+1}=a;if(e.length===0||r<=0)return[];let g=e[e.length-1].runningLength,P=n.taper===!1?0:n.taper===!0?Math.max(r,g):n.taper,k=a.taper===!1?0:a.taper===!0?Math.max(r,g):a.taper,et=Math.pow(r*s,2),C=[],F=[],R=e.slice(0,10).reduce((o,d)=>{let h=d.pressure;if(l){let c=_(1,d.distance/r),Z=_(1,1-c);h=_(1,o+(Z-o)*(c*ht))}return(o+h)/2},e[0].pressure),p=nt(r,i,e[e.length-1].pressure,u),X,Y=e[0].vector,D=e[0].point,H=D,L=D,B=H,U=!1;for(let o=0;o<e.length;o++){let{pressure:d}=e[o],{point:h,vector:c,distance:Z,runningLength:K}=e[o];if(o<e.length-1&&g-K<3)continue;if(i){if(l){let M=_(1,Z/r),Q=_(1,1-M);d=_(1,R+(Q-R)*(M*ht))}p=nt(r,i,d,u)}else p=r/2;X===void 0&&(X=p);let pt=K<P?S(K/P):1,yt=g-K<k?f((g-K)/k):1;p=Math.max(.01,p*Math.min(pt,yt));let rt=(o<e.length-1?e[o+1]:e[o]).vector,G=o<e.length-1?ot(c,rt):1,xt=ot(c,Y)<0&&!U,st=G!==null&&G<0;if(xt||st){let M=b($(Y),p);for(let Q=1/13,q=0;q<=1;q+=Q)L=O(x(h,M),h,I*q),C.push(L),B=O(m(h,M),h,I*-q),F.push(B);D=L,H=B,st&&(U=!0);continue}if(U=!1,o===e.length-1){let M=b($(c),p);C.push(x(h,M)),F.push(m(h,M));continue}let it=b($(J(rt,c,G)),p);L=x(h,it),(o<=1||lt(D,L)>et)&&(C.push(L),D=L),B=m(h,it),(o<=1||lt(H,B)>et)&&(F.push(B),H=B),R=d,Y=c}let w=e[0].point.slice(0,2),A=e.length>1?e[e.length-1].point.slice(0,2):m(e[0].point,[1,1]),W=[],N=[];if(e.length===1){if(!(P||k)||v){let o=at(w,gt($(x(w,A))),-(X||p)),d=[];for(let h=1/13,c=h;c<=1;c+=h)d.push(O(o,w,I*2*c));return d}}else{if(!(P||k&&e.length===1))if(E)for(let d=1/13,h=d;h<=1;h+=d){let c=O(F[0],w,I*h);W.push(c)}else{let d=x(C[0],F[0]),h=b(d,.5),c=b(d,.51);W.push(x(w,h),x(w,c),m(w,c),m(w,h))}let o=$(Mt(e[e.length-1].vector));if(k||P&&e.length===1)N.push(A);else if(z){let d=at(A,o,p);for(let h=1/29,c=h;c<1;c+=h)N.push(O(d,A,I*3*c))}else N.push(m(A,b(o,p)),m(A,b(o,p*.99)),x(A,b(o,p*.99)),x(A,b(o,p)))}return C.concat(N,F.reverse(),W)}function Dt(e,t={}){var r;let{streamline:s=.5,size:i=16,last:l=!1}=t;if(e.length===0)return[];let u=.15+(1-s)*.85,n=Array.isArray(e[0])?e:e.map(({x:f,y:g,pressure:P=.5})=>[f,g,P]);if(n.length===2){let f=n[1];n=n.slice(0,-1);for(let g=1;g<5;g++)n.push(J(n[0],f,g/4))}n.length===1&&(n=[...n,[...m(n[0],[1,1]),...n[0].slice(2)]]);let a=[{point:[n[0][0],n[0][1]],pressure:n[0][2]>=0?n[0][2]:.25,vector:[1,1],distance:0,runningLength:0}],v=!1,E=0,S=a[0],z=n.length-1;for(let f=1;f<n.length;f++){let g=l&&f===z?n[f].slice(0,2):J(S.point,n[f],u);if(Bt(S.point,g))continue;let P=Tt(g,S.point);if(E+=P,f<z&&!v){if(E<i)continue;v=!0}S={point:g,pressure:n[f][2]>=0?n[f][2]:.5,vector:gt(x(S.point,g)),distance:P,runningLength:E},a.push(S)}return a[0].vector=((r=a[1])==null?void 0:r.vector)||[0,0],a}function Kt(e,t={}){return Ct(Dt(e,t),t)}class V extends T{constructor(){super(...arguments);y(this,"points",[])}onStart(r){return this.el=this.createElement("path"),this.points=[r],this.el}onProcess(r){return this.el==null?!1:(this.points.push(r),this.el.setAttribute("d",V.getSvgPathD(this.points,this.strategyStyle)),!0)}onEnd(r){return this.el==null?!1:(this.el=null,!0)}static getSvgPathD(r,s){const i=Kt(r,{size:s.strokeWidth,thinning:.9,simulatePressure:!1,start:{taper:5},end:{taper:5},...s.strokeOptions});return T.getSvgPathFromStroke(i)}}function $t(e,t){return new V(e,t)}class Ot extends T{constructor(){super(...arguments);y(this,"startPoint",null)}onStart(r){return this.el=this.createElement("rect"),this.startPoint=r,this.el.setAttribute("x",r.x.toString()),this.el.setAttribute("y",r.y.toString()),this.el}onProcess(r){if(this.el==null||this.startPoint==null)return!1;let s=this.startPoint.x,i=this.startPoint.y,l=r.x,u=r.y,n=Math.abs(l-s),a=Math.abs(u-i);if(this.isKeyPass("Shift")){let v=Math.min(n,a);n=v,a=v}return l<s&&(s=s-n),u<i&&(i=i-a),this.el.setAttribute("x",s.toString()),this.el.setAttribute("y",i.toString()),this.el.setAttribute("width",n.toString()),this.el.setAttribute("height",a.toString()),!0}onEnd(r){return this.el==null?!1:(this.el=null,!0)}}function It(e,t){return new Ot(e,t)}class zt extends T{constructor(){super(...arguments);y(this,"startPoint",null);y(this,"textarea",null);y(this,"borderWidth",2);y(this,"rectBorder",null);y(this,"processFlag",!1)}setGlobalStyle(){this.textarea.classList.add("drawBrowser-textarea"),this.rectBorder.classList.add("drawBrowser-textarea-border")}createForeignObject(){const r=document.createElementNS("http://www.w3.org/2000/svg","foreignObject"),s=document.createElement("div");return this.rectBorder=document.createElement("div"),this.textarea=document.createElement("textarea"),r.style.position="relative",s.style.position="absolute",s.style.width="100%",s.style.height="100%",this.textarea.style.width="100%",this.textarea.style.height="100%",this.textarea.style.boxSizing="border-box",this.rectBorder.style.position="absolute",this.textarea.style.boxSizing="border-box",this.rectBorder.style.width="100%",this.rectBorder.style.height="100%",this.setGlobalStyle(),s.appendChild(this.rectBorder),s.appendChild(this.textarea),r.appendChild(s),r}onStart(r){return this.el=this.createForeignObject(),this.startPoint=r,this.processFlag=!0,this.el.setAttribute("x",r.x.toString()),this.el.setAttribute("y",r.y.toString()),this.el}onProcess(r){if(this.processFlag==!1)return!1;const s=r.x-this.el.getBoundingClientRect().left,i=r.y-this.el.getBoundingClientRect().top;return this.el.setAttribute("width",`${s+this.borderWidth}px`),this.el.setAttribute("height",`${i+this.borderWidth}px`),!0}onEnd(r){return this.processFlag==!1?!1:(this.textarea.focus(),this.textarea.style.height="auto",this.rectBorder.style.display="none",this.resetHeight=this.resetHeight.bind(this),this.textarea.addEventListener("input",this.resetHeight),this.processFlag=!1,!0)}resetHeight(){this.textarea.style.height="auto";let r=this.textarea.scrollHeight;console.log(this.textarea.scrollHeight),this.el.setAttribute("height",`${r}px`),this.textarea.style.height=`${r}px`}}function Ht(e,t){return new zt(e,t)}function Nt(e,t){return{line:Et(e,t),ellipse:At(e,t),brush:$t(e,t),rect:It(e,t),text:Ht(e,t)}}class qt{constructor(t={}){y(this,"el",null);y(this,"drawStrategies");y(this,"keys",{});this.options=t,this.drawStrategies=Nt(this.options.strategyStyle||{stroke:"#000"},this.keys),t.el&&this.mounted(t.el)}get strategyTag(){return this.options.strategyTag||"text"}set strategyTag(t){this.options.strategyTag=t}mounted(t,r=window){if(this.el)return new Error("The board has been mounted");const s=document.querySelector(t);if(!s)return new Error("The element is not exist");if(s.tagName!=="svg")return new Error("The element must be a svg element");this.el=s,this.setListenMethod(r)}setListenMethod(t=window){const r=this.el;this.onStart=this.onStart.bind(this),this.onProcess=this.onProcess.bind(this),this.onEnd=this.onEnd.bind(this),this.handleKeyDown=this.handleKeyDown.bind(this),this.handleKeyUp=this.handleKeyUp.bind(this),r.addEventListener("pointerdown",this.onStart,{passive:!1}),t.addEventListener("pointermove",this.onProcess,{passive:!1}),t.addEventListener("pointerup",this.onEnd,{passive:!1}),t.addEventListener("pointercancel",this.onEnd,{passive:!1}),t.addEventListener("keydown",this.handleKeyDown),t.addEventListener("keyup",this.handleKeyUp)}recallProcess(){let t=this.drawStrategies[this.strategyTag].pointEvent;t&&this.drawStrategies[this.strategyTag]._eventProcess(t,this.el)}handleKeyDown(t){this.keys[t.key]=!0,this.recallProcess()}handleKeyUp(t){this.keys[t.key]=!1,this.recallProcess()}onStart(t){const r=this.drawStrategies[this.strategyTag]._eventStart(t,this.el);r&&this.el.appendChild(r)}onProcess(t){t.preventDefault(),this.drawStrategies[this.strategyTag]._eventProcess(t,this.el)&&(t.preventDefault(),t.stopPropagation())}onEnd(t){t.preventDefault(),t.stopPropagation(),this.drawStrategies[this.strategyTag]._eventEnd(t,this.el)}}function jt(e){return new qt(e)}const tt=jt({el:"#my_svg",strategyStyle:{stroke:"#000",fill:"transparent",strokeWidth:4}});let ut=document.querySelectorAll("[data-strategy]");ut.forEach(e=>{e.addEventListener("click",function(t){ft(ut),e.classList.add("active"),tt.strategyTag=e.getAttribute("data-strategy")})});let ct=document.querySelectorAll("[data-color]");ct.forEach(e=>{e.addEventListener("click",function(t){ft(ct),e.classList.add("active"),tt.options.strategyStyle.stroke=e.getAttribute("data-color")})});let dt=document.getElementById("size");dt.addEventListener("change",function(e){tt.options.strategyStyle.strokeWidth=Number(dt.value)});function ft(e){e.forEach(t=>{t.classList.remove("active")})}
