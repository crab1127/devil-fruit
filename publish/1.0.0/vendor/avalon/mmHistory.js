define(["avalon"],function(e){function o(e){return!e||e===window.name||e==="_self"||e==="top"&&window==window.top?!0:!1}function u(e){for(var t=0,n;n=e[t++];)if(n.nodeName==="A")return n}function a(e,t){(t=document.getElementById(e))?t.scrollIntoView():(t=u(document.getElementsByName(e)))?t.scrollIntoView():window.scrollTo(0,0)}var t=document.createElement("a"),n=e.History=function(){this.location=location};n.started=!1,n.IEVersion=function(){var e=document.documentMode;return e?e:window.XMLHttpRequest?7:6}(),n.defaults={basepath:"/",html5Mode:!1,hashPrefix:"!",interval:50,fireAnchor:!0};var r=window.VBArray&&n.IEVersion<=7,i=!!window.history.pushState,s="onhashchange"in window&&(!window.VBArray||!r);return n.prototype={constructor:n,getFragment:function(e){return e==null&&(this.monitorMode==="popstate"?e=this.getPath():e=this.getHash()),e.replace(/^[#\/]|\s+$/g,"")},getHash:function(e){var t=(e||this).location.href;return this._getHash(t.slice(t.indexOf("#")))},_getHash:function(e){return e.indexOf("#/")===0?decodeURIComponent(e.slice(2)):e.indexOf("#!/")===0?decodeURIComponent(e.slice(3)):""},getPath:function(){var e=decodeURIComponent(this.location.pathname+this.location.search),t=this.basepath.slice(0,-1);return e.indexOf(t)||(e=e.slice(t.length)),e.slice(1)},_getAbsolutePath:function(e){return e.hasAttribute?e.href:e.getAttribute("href",4)},start:function(r){function a(){var e=o.iframe;if(o.monitorMode==="iframepoll"&&!e)return!1;var t=o.getFragment(),n;if(e){var r=o.getHash(e);t!==o.fragment?(o._setIframeHistory(o.prefix+t),n=t):r!==o.fragment&&(o.location.hash=o.prefix+r,n=r)}else t!==o.fragment&&(n=t);n!==void 0&&(o.fragment=n,o.fireRouteChange(n))}if(n.started)throw new Error("avalon.history has already been started");n.started=!0,this.options=e.mix({},n.defaults,r),this.html5Mode=!!this.options.html5Mode,this.monitorMode=this.html5Mode?"popstate":"hashchange",i||(this.html5Mode&&(e.log("如果浏览器不支持HTML5 pushState，强制使用hash hack!"),this.html5Mode=!1),this.monitorMode="hashchange"),s||(this.monitorMode="iframepoll"),this.prefix="#"+this.options.hashPrefix+"/",this.basepath=("/"+this.options.basepath+"/").replace(/^\/+|\/+$/g,"/"),this.fragment=this.getFragment(),t.href=this.basepath,this.rootpath=this._getAbsolutePath(t);var o=this,u="<!doctype html><html><body>@</body></html>";this.options.domain&&(u=u.replace("<body>","<script>document.domain ="+this.options.domain+"</script><body>")),this.iframeHTML=u,this.monitorMode==="iframepoll"&&e.ready(function(){var e=document.createElement("iframe");e.src="javascript:0",e.style.display="none",e.tabIndex=-1,document.body.appendChild(e),o.iframe=e.contentWindow;var t=o.iframe.document;t.open(),t.write(o.iframeHTML),t.close()});switch(this.monitorMode){case"popstate":this.checkUrl=e.bind(window,"popstate",a),this._fireLocationChange=a;break;case"hashchange":this.checkUrl=e.bind(window,"hashchange",a);break;case"iframepoll":this.checkUrl=setInterval(a,this.options.interval)}this.fireRouteChange(this.fragment||"/")},fireRouteChange:function(t){var n=e.router;n&&n.navigate&&(n.setLastPath(t),n.navigate(t==="/"?t:"/"+t)),this.options.fireAnchor&&a(t.replace(/\?.*/g,""))},stop:function(){e.unbind(window,"popstate",this.checkUrl),e.unbind(window,"hashchange",this.checkUrl),clearInterval(this.checkUrl),n.started=!1},updateLocation:function(e,t){var t=t||{},n=t.replace,r=t.silent;if(this.monitorMode==="popstate"){var i=this.rootpath+e;i!=this.location.pathname&&history[n?"replaceState":"pushState"]({path:i},document.title,i),r||this._fireLocationChange()}else{var s=this.prefix+e;this._setHash(this.location,s,n),r&&(this._setIframeHistory(s,n),this.fragment=this.getFragment())}},_setHash:function(e,t,n){var r=e.href.replace(/(javascript:|#).*$/,"");n?e.replace(r+t):e.hash=t},_setIframeHistory:function(e,t){if(!this.iframe)return;var n=this.iframe.document;n.open(),n.write(this.iframeHTML),n.close(),this._setHash(n.location,e,t)}},e.history=new n,e.bind(document,"click",function(t){var n="defaultPrevented"in t?t.defaultPrevented:t.returnValue===!1;if(n||t.ctrlKey||t.metaKey||t.which===2)return;var i=t.target;while(i.nodeName!=="A"){i=i.parentNode;if(!i||i.tagName==="BODY")return}if(o(i.target)){var s=r?i.getAttribute("href",2):i.getAttribute("href")||i.getAttribute("xlink:href"),u=e.history.prefix;if(s===null)return;var a=s.replace(u,"").trim();s.indexOf(u)===0&&a!==""&&(t.preventDefault(),e.router&&e.router.navigate(a))}}),e});