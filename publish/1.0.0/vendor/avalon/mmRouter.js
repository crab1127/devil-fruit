define(["mmHistory"],function(){function e(){var e={};"get,post,delete,put".replace(avalon.rword,function(t){e[t]=[]}),this.routingTable=e}function t(e){var t=e.split("?"),n={},r=t[0],i=t[1];if(i){var s=i.split("&"),o=s.length,u=0,a;for(;u<o;u++){if(!s[u])continue;a=s[u].split("="),n[decodeURIComponent(a[0])]=decodeURIComponent(a[1])}}return{path:r,query:n}}function r(e,t,n){var r=e.replace(/[\\\[\]\^$*+?.()|{}]/g,"\\$&");if(!t)return r;var i=n?"?":"";return r+i+"("+t+")"+i}function i(){try{return localStorage.setItem("avalon",1),localStorage.removeItem("avalon"),!0}catch(e){return!1}}function s(e){return String(e).replace(/[,;"\\=\s%]/g,function(e){return encodeURIComponent(e)})}function o(e,t){var n=new Date;n.setTime(n.getTime()+86400),document.cookie=s(e)+"="+s(t)+";expires="+n.toGMTString()}function u(e){var t=String(document.cookie).match(new RegExp("(?:^| )"+e+"(?:(?:=([^;]*))|;|$)"))||["",""];return decodeURIComponent(t[1])}var n=/([:*])(\w+)|\{(\w+)(?:\:((?:[^{}\\]+|\\.|\{(?:[^{}\\]+|\\.)*\})+))?\}/g;return e.prototype={error:function(e){this.errorback=e},_pathToRegExp:function(e,t){var i=t.keys=[],s="^",o=0,u,a,f,l;while(u=n.exec(e)){a=u[2]||u[3],f=u[4]||(u[1]=="*"?".*":"string"),l=e.substring(o,u.index);var c=this.$types[f],h={name:a};c&&(f=c.pattern,h.decode=c.decode),i.push(h),s+=r(l,f,!1),o=n.lastIndex}l=e.substring(o),s+=r(l)+(t.strict?t.last:"/?")+"$";var p=typeof t.caseInsensitive=="boolean"?t.caseInsensitive:!0;return t.regexp=new RegExp(s,p?"i":undefined),t},add:function(e,t,n,r){var i=this.routingTable[e.toLowerCase()];if(t.charAt(0)!=="/")throw"path必须以/开头";r=r||{},r.callback=n,t.length>2&&t.charAt(t.length-1)==="/"&&(t=t.slice(0,-1),r.last="/"),avalon.Array.ensure(i,this._pathToRegExp(t,r))},route:function(e,t,n){t=t.trim();var r=this.routingTable[e];for(var i=0,s;s=r[i++];){var o=t.match(s.regexp);if(o){s.query=n||{},s.path=t,s.params={};var u=s.keys;return o.shift(),u.length&&this._parseArgs(o,s),s.callback.apply(s,o)}}this.errorback&&this.errorback()},_parseArgs:function(e,t){var n=t.keys;for(var r=0,i=n.length;r<i;r++){var s=n[r],o=e[r]||"";if(typeof s.decode=="function")var u=s.decode(o);else try{u=JSON.parse(o)}catch(a){u=o}e[r]=t.params[s.name]=u}},getLastPath:function(){return u("msLastPath")},setLastPath:function(e){o("msLastPath",e)},navigate:function(e,n){var r=t((e.charAt(0)!=="/"?"/":"")+e),n=n||{};e.charAt(0)==="/"&&(e=e.slice(1)),avalon.history&&avalon.history.updateLocation(e,avalon.mix({},n,{silent:!0})),n.silent||this.route("get",r.path,r.query)},$types:{date:{pattern:"[0-9]{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[1-2][0-9]|3[0-1])",decode:function(e){return new Date(e.replace(/\-/g,"/"))}},string:{pattern:"[^\\/]*"},bool:{decode:function(e){return parseInt(e,10)===0?!1:!0},pattern:"0|1"},"int":{decode:function(e){return parseInt(e,10)},pattern:"\\d+"}}},"get,put,delete,post".replace(avalon.rword,function(t){return e.prototype[t]=function(e,n,r){this.add(t,e,n,r)}}),i()&&(e.prototype.getLastPath=function(){return localStorage.getItem("msLastPath")},e.prototype.setLastPath=function(e){localStorage.setItem("msLastPath",e)}),avalon.router=new e,avalon});