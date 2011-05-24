/*!
	PURE Unobtrusive Rendering Engine for HTML

	Licensed under the MIT licenses.
	More information at: http://www.opensource.org

	Copyright (c) 2011 Michael Cvilic - BeeBole.com

	Thanks to Rog Peppe for the functional JS jump
	revision: 2.71
*/
var $p,pure=$p=function(d,h){var m=d,t=false;if(typeof m==="string")t=h||false;else if(m&&!m[0]&&!m.length)m=[m];return $p.core(m,t)};
$p.core=function(d,h,m){function t(a){if(typeof console!=="undefined"){console.log(a);debugger}throw"pure error: "+a;}function O(){var a=$p.plugins,b=function(){};b.prototype=a;b.prototype.compile=a.compile||P;b.prototype.render=a.render||Q;b.prototype.autoRender=a.autoRender||R;b.prototype.find=a.find||S;b.prototype._compiler=B;b.prototype._error=t;return new b}function G(a){return a.outerHTML||function(b){var e=document.createElement("div");e.appendChild(b.cloneNode(true));return e.innerHTML}(a)}
function C(a,b){return function(e){return a(""+b.call(e.item||e.context,e))}}function S(a,b){if(typeof a==="string"){b=a;a=false}return typeof document.querySelectorAll!=="undefined"?(a||document).querySelectorAll(b):t("You can test PURE standalone with: iPhone, FF3.5+, Safari4+ and IE8+\n\nTo run PURE on your browser, you need a JS library/framework with a CSS selector engine")}function H(a,b){return function(e){for(var c=[a[0]],g=a.length,i,k,l,f,n=1;n<g;n++){i=b[n].call(this,e);k=a[n];if(i===""){l=
c[c.length-1];if((f=l.search(/[^\s]+=\"?$/))>-1){c[c.length-1]=l.substring(0,f);k=k.substr(1)}}c[c.length]=i;c[c.length]=k}return c.join("")}}function T(a){var b=a.match(/^(\w+)\s*<-\s*(\S+)?$/);b===null&&t('bad loop spec: "'+a+'"');b[1]==="item"&&t('"item<-..." is a reserved word for the current running iteration.\n\nPlease choose another name for your loop.');if(!b[2]||b[2]&&/context/i.test(b[2]))b[2]=function(e){return e.context};return{name:b[1],sel:b[2]}}function y(a){if(typeof a==="function")return a;
var b=a.match(/^[a-zA-Z\$_\@][\w\$:-]*(\.[\w\$:-]*[^\.])*$/);if(b===null){var e=false,c=a,g=[],i=[],k=0,l;if(/\'|\"/.test(c.charAt(0))){if(/\'|\"/.test(c.charAt(c.length-1))){l=c.substring(1,c.length-1);return function(){return l}}}else for(;(b=c.match(/#\{([^{}]+)\}/))!==null;){e=true;g[k++]=c.slice(0,b.index);i[k]=y(b[1]);c=c.slice(b.index+b[0].length,c.length)}if(!e)return function(){return a};g[k]=c;return H(g,i)}b=a.split(".");return function(f){var n=f.context||f,o=f[b[0]];f=0;if(o&&o.item){f+=
1;if(b[f]==="pos")return o.pos;else n=o.item}for(o=b.length;f<o;f++){if(!n)break;n=n[b[f]]}return!n&&n!==0?"":n}}function D(a,b,e){var c,g,i,k,l,f=[];if(typeof b==="string"){c=b;(l=b.match(I))||t("bad selector syntax: "+b);g=l[1];i=l[2];k=l[3];l=l[4];if(i==="."||!i&&k)f[0]=a;else f=m.find(a,i);if(!f||f.length===0)return t('The node "'+b+'" was not found in the template:\n'+G(a).replace(/\t/g,"  "))}else{g=b.prepend;k=b.attr;l=b.append;f=[a]}if(g||l)if(g&&l)t("append/prepend cannot take place at the same time");
else if(e)t("no append/prepend/replace modifiers allowed for loop target");else l&&e&&t("cannot append with loop (sel: "+c+")");var n,o,u,s,q;if(k){u=/^style$/i.test(k);q=(s=/^class$/i.test(k))?"className":k;n=function(j,r){j.setAttribute(J+k,r);if(q in j&&!u)try{j[q]=""}catch(p){}if(j.nodeType===1){j.removeAttribute(k);s&&j.removeAttribute(q)}};o=u||s?u?function(j){return j.style.cssText}:function(j){return j.className}:function(j){return j.getAttribute(k)};a=function(j){return j.replace(/\"/g,"&quot;")};
g=g?function(j,r){n(j,r+o(j))}:l?function(j,r){n(j,o(j)+r)}:function(j,r){n(j,r)}}else{g=e?function(j,r){var p=j.parentNode;if(p){p.insertBefore(document.createTextNode(r),j.nextSibling);p.removeChild(j)}}:g?function(j,r){j.insertBefore(document.createTextNode(r),j.firstChild)}:l?function(j,r){j.appendChild(document.createTextNode(r))}:function(j,r){for(;j.firstChild;)j.removeChild(j.firstChild);j.appendChild(document.createTextNode(r))};a=function(j){return j}}return{attr:k,nodes:f,set:g,sel:c,quotefn:a}}
function E(a,b){for(var e=K+b+":",c=0;c<a.nodes.length;c++)a.set(a.nodes[c],e)}function L(a,b,e,c,g){return function(i){var k=b(i),l=i[a],f={items:k},n=0,o,u=[],s=function(j,r,p,x){var z=i.pos,v=i.item,U=i.items;i.pos=r.pos=j;i.item=r.item=k[j];i.items=k;typeof x!=="undefined"&&(i.length=x);if(typeof p==="function"&&p.call(i.item,i)===false)n++;else{u.push(e.call(i.item,i));i.pos=z;i.item=v;i.items=U}};i[a]=f;if(F(k)){o=k.length||0;typeof c==="function"&&k.sort(c);for(var q=0;q<o;q++)s(q,f,g,o-n)}else{k&&
typeof c!=="undefined"&&t("sort is only available on arrays, not objects");for(o in k)k.hasOwnProperty(o)&&s(o,f,g)}typeof l!=="undefined"?i[a]=l:delete i[a];return u.join("")}}function M(a,b,e,c){var g=false,i,k,l,f;for(f in e)if(e.hasOwnProperty(f))if(f==="sort")k=e.sort;else if(f==="filter")l=e.filter;else{g&&t("cannot have more than one loop on a target");i=f;g=true}i||t("Error in the selector: "+b+"\nA directive action must be a string, a function or a loop(<-)");g=e[i];if(typeof g==="string"||
typeof g==="function"){e={};e[i]={root:g};return M(a,b,e,c)}e=T(i);i=y(e.sel);a=D(a,b,true);b=a.nodes;for(w=0;w<b.length;w++){f=b[w];var n=B(f,g);c[c.length]=C(a.quotefn,L(e.name,i,n,k,l));a.nodes=[f];E(a,c.length-1)}return a}function V(a,b){function e(j,r){var p=j.match(I);p={prepend:!!p[1],prop:p[2],attr:p[3]||W[r],append:!!p[4],sel:j};var x,z,v;for(x=i.a.length-1;x>=0;x--){z=i.a[x];v=(v=z.l[0])&&v[p.prop];if(typeof v!=="undefined"){p.prop=z.p+"."+p.prop;if(i.l[p.prop]===true)v=v[0];break}}if(typeof v===
"undefined"){v=y(p.prop)(F(b)?b[0]:b);if(v==="")return false}if(F(v)){i.a.push({l:v,p:p.prop});i.l[p.prop]=true;p.t="loop"}else p.t="str";return p}var c=a.getElementsByTagName("*"),g=[],i={a:[],l:{}},k,l,f,n,o,u,s,q;f=-1;for(n=c.length;f<n;f++){s=f>-1?c[f]:a;if(s.nodeType===1&&s.className!==""){q=s.className.split(" ");o=0;for(u=q.length;o<u;o++){k=q[o];k=e(k,s.tagName);if(k!==false){l=/nodevalue/i.test(k.attr);if(k.sel.indexOf("@")>-1||l){s.className=s.className.replace("@"+k.attr,"");if(l)k.attr=
false}g.push({n:s,cspec:k})}}}}return g}function B(a,b,e,c){var g=[],i,k,l,f,n,o,u,s,q,j=[];c=c||e&&V(a,e);if(e)for(;c.length>0;){l=c[0].cspec;f=c[0].n;c.splice(0,1);if(l.t==="str"){f=D(f,l,false);E(f,g.length);g[g.length]=C(f.quotefn,y(l.prop))}else{o=y(l.sel);f=D(f,l,true);n=f.nodes;i=0;for(k=n.length;i<k;i++){u=n[i];s=B(u,false,e,c);g[g.length]=C(f.quotefn,L(l.sel,o,s));f.nodes=[u];E(f,g.length-1)}}}for(q in b)if(b.hasOwnProperty(q)){e=0;c=b[q];l=q.split(/\s*,\s*/);o=l.length;do if(typeof c===
"function"||typeof c==="string"){q=l[e];f=D(a,q,false);E(f,g.length);g[g.length]=C(f.quotefn,y(c))}else M(a,q,c,g);while(++e<o)}a=G(a);a=a.replace(/<([^>]+)\s(value\=""|selected)\s?([^>]*)>/ig,"<$1 $3>");a=a.split(J).join("");a=a.split(K);for(e=1;e<a.length;e++){b=a[e];j[e]=g[parseInt(b,10)];a[e]=b.substring(b.indexOf(":")+1)}return H(a,j)}function P(a,b,e){var c=B((e||this[0]).cloneNode(true),a,b);return function(g){return c({context:g})}}function Q(a,b){for(var e=typeof b==="function"&&b,c=0,g=
this.length;c<g;c++)this[c]=N(this[c],(e||m.compile(b,false,this[c]))(a,false));context=null;return this}function R(a,b){for(var e=m.compile(b,a,this[0]),c=0,g=this.length;c<g;c++)this[c]=N(this[c],e(a,false));context=null;return this}function N(a,b){var e,c=a.parentNode,g=0;if(!c){c=document.createElement("DIV");c.appendChild(a)}switch(a.tagName){case "TBODY":case "THEAD":case "TFOOT":b="<TABLE>"+b+"</TABLE>";g=1;break;case "TR":b="<TABLE><TBODY>"+b+"</TBODY></TABLE>";g=2;break;case "TD":case "TH":b=
"<TABLE><TBODY><TR>"+b+"</TR></TBODY></TABLE>";g=3;break}tmp=document.createElement("SPAN");tmp.style.display="none";document.body.appendChild(tmp);tmp.innerHTML=b;for(e=tmp.firstChild;g--;)e=e.firstChild;c.insertBefore(e,a);c.removeChild(a);document.body.removeChild(tmp);return a=e}var A=[];m=m||O();switch(typeof d){case "string":A=m.find(h||document,d);A.length===0&&t('The template "'+d+'" was not found');break;case "undefined":t("The root of the template is undefined, check your selector");break;
default:A=d}var w=0;for(d=A.length;w<d;w++)m[w]=A[w];m.length=d;var K="_s"+Math.floor(Math.random()*1E6)+"_",J="_a"+Math.floor(Math.random()*1E6)+"_",I=/^(\+)?([^\@\+]+)?\@?([^\+]+)?(\+)?$/,W={IMG:"src",INPUT:"value"},F=Array.isArray?function(a){return Array.isArray(a)}:function(a){return Object.prototype.toString.call(a)==="[object Array]"};return m};$p.plugins={};
$p.libs={dojo:function(){if(typeof document.querySelector==="undefined")$p.plugins.find=function(d,h){return dojo.query(h,d)}},domassistant:function(){if(typeof document.querySelector==="undefined")$p.plugins.find=function(d,h){return $(d).cssSelect(h)};DOMAssistant.attach({publicMethods:["compile","render","autoRender"],compile:function(d,h){return $p([this]).compile(d,h)},render:function(d,h){return $($p([this]).render(d,h))[0]},autoRender:function(d,h){return $($p([this]).autoRender(d,h))[0]}})},
jquery:function(){if(typeof document.querySelector==="undefined")$p.plugins.find=function(d,h){return jQuery(d).find(h)};jQuery.fn.extend({directives:function(d){this._pure_d=d;return this},compile:function(d,h){return $p(this).compile(this._pure_d||d,h)},render:function(d,h){return jQuery($p(this).render(d,this._pure_d||h))},autoRender:function(d,h){return jQuery($p(this).autoRender(d,this._pure_d||h))}})},mootools:function(){if(typeof document.querySelector==="undefined")$p.plugins.find=function(d,
h){return $(d).getElements(h)};Element.implement({compile:function(d,h){return $p(this).compile(d,h)},render:function(d,h){return $p([this]).render(d,h)},autoRender:function(d,h){return $p([this]).autoRender(d,h)}})},prototype:function(){if(typeof document.querySelector==="undefined")$p.plugins.find=function(d,h){d=d===document?d.body:d;return typeof d==="string"?$$(d):$(d).select(h)};Element.addMethods({compile:function(d,h,m){return $p([d]).compile(h,m)},render:function(d,h,m){return $p([d]).render(h,
m)},autoRender:function(d,h,m){return $p([d]).autoRender(h,m)}})},sizzle:function(){if(typeof document.querySelector==="undefined")$p.plugins.find=function(d,h){return Sizzle(h,d)}},sly:function(){if(typeof document.querySelector==="undefined")$p.plugins.find=function(d,h){return Sly(h,d)}},yui:function(){typeof document.querySelector==="undefined"&&YUI().use("node",function(d){$p.plugins.find=function(h,m){return d.NodeList.getDOMNodes(d.one(h).all(m))}});YUI.add("pure-yui",function(d){d.Node.prototype.directives=
function(h){this._pure_d=h;return this};d.Node.prototype.compile=function(h,m){return $p([this._node]).compile(this._pure_d||h,m)};d.Node.prototype.render=function(h,m){return d.one($p([this._node]).render(h,this._pure_d||m))};d.Node.prototype.autoRender=function(h,m){return d.one($p([this._node]).autoRender(h,this._pure_d||m))}},"0.1",{requires:["node"]})}};
(function(){var d=typeof dojo!=="undefined"&&"dojo"||typeof DOMAssistant!=="undefined"&&"domassistant"||typeof jQuery!=="undefined"&&"jquery"||typeof MooTools!=="undefined"&&"mootools"||typeof Prototype!=="undefined"&&"prototype"||typeof Sizzle!=="undefined"&&"sizzle"||typeof Sly!=="undefined"&&"sly"||typeof YUI!=="undefined"&&"yui";d&&$p.libs[d]();if(typeof exports!=="undefined")exports.$p=$p})();
