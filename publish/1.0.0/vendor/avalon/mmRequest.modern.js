define("mmRequest",["avalon","mmPromise"],function(avalon){function IE(){if(window.VBArray){var e=document.documentMode;return e?e:window.XMLHttpRequest?7:6}return 0}function parseJS(code){var indirect=eval;code=code.trim();if(code)if(code.indexOf("use strict")===1){var script=document.createElement("script");script.text=code,head.appendChild(script).parentNode.removeChild(script)}else indirect(code)}function parseXML(e,t,n){var t;if(!e||typeof e!="string")return null;try{t=(new DOMParser).parseFromString(e,"text/xml")}catch(r){t=undefined}return(!t||t.getElementsByTagName("parsererror").length)&&avalon.error("Invalid XML: "+e),t}function ajaxExtend(e){e=avalon.mix({},defaults,e),e.type=e.type.toUpperCase();var t=typeof e.data=="string"?e.data:avalon.param(e.data);e.querystring=t||"",e.url=e.url.replace(rhash,"").replace(rprotocol,location.protocol+"//");if(typeof e.crossDomain!="boolean"){var n=document.createElement("a");try{n.href=e.url;var r="1"[0]?n.href:n.getAttribute("href",4);n.href=r,e.crossDomain=originAnchor.protocol+"//"+originAnchor.host!=n.protocol+"//"+n.host}catch(i){e.crossDomain=!0}}return e.hasContent=!rnoContent.test(e.type),e.hasContent||(t&&(e.url+=(rquery.test(e.url)?"&":"?")+t),e.cache===!1&&(e.url+=(rquery.test(e.url)?"&":"?")+"_time="+(new Date-0))),e}function isDate(e){return Object.prototype.toString.call(e)==="[object Date]"}function isValidParamValue(e){var t=typeof e;return e==null||t!=="object"&&t!=="function"}function paramInner(e,t,n){var r;if(Array.isArray(t))avalon.each(t,function(t,r){paramInner(e+"["+(typeof r=="object"?t:"")+"]",r,n)});else if(avalon.isPlainObject(t))for(r in t)paramInner(e+"["+r+"]",t[r],n);else n(e,t)}function trimLine(e){return e.replace(rline,"\r\n")}var global=this||(0,eval)("this"),DOC=global.document,encode=encodeURIComponent,decode=decodeURIComponent,rlocalProtocol=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rheaders=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,rhash=/#.*$/,rquery=/\?/,rjsonp=/(=)\?(?=&|$)|\?\?/,r20=/%20/g,originAnchor=document.createElement("a");originAnchor.href=location.href;var accepts={xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript",script:"text/javascript, application/javascript","*":["*/"]+["*"]},useOnload=IE()===0||IE()>8;String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return t=t||0,this.lastIndexOf(e,t)===t});var head=DOC.head,isLocal=rlocalProtocol.test(location.protocol);avalon.xhr=function(){return new XMLHttpRequest};var supportCors="withCredentials"in avalon.xhr(),defaults={type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",async:!0,jsonp:"callback"},XHRMethods={setRequestHeader:function(e,t){return this.requestHeaders[e]=t,this},getAllResponseHeaders:function(){return this.readyState===4?this.responseHeadersString:null},getResponseHeader:function(e,t){if(this.readyState===4){while(t=rheaders.exec(this.responseHeadersString))this.responseHeaders[t[1]]=t[2];t=this.responseHeaders[e]}return t===undefined?null:t},overrideMimeType:function(e){return this.mimeType=e,this},abort:function(e){return e=e||"abort",this.transport&&this.respond(0,e),this},dispatch:function(e,t){var n=t;if(!this.transport)return;this.readyState=4;var r=e>=200&&e<300||e===304;if(r)if(e===204)n="nocontent";else if(e===304)n="notmodified";else if(typeof this.response=="undefined"){var i=this.options.dataType||this.options.mimeType;if(!i&&this.responseText||this.responseXML)i=this.getResponseHeader("Content-Type")||"",i=i.match(/json|xml|script|html/)||["text"],i=i[0];var s=this.responseText||"",o=this.responseXML||"";try{this.response=avalon.ajaxConverters[i].call(this,s,o)}catch(u){r=!1,this.error=u,n="parsererror"}}this.status=e,this.statusText=n+"",this.timeoutID&&(clearTimeout(this.timeoutID),delete this.timeoutID),this._transport=this.transport;var a=this.options.success,f=this.options.error,l=this.options.complete;r?(avalon.log("成功加载数据"),typeof a=="function"&&a.call(this,this.response,n,this),this._resolve(this.response,n,this)):(typeof f=="function"&&f.call(this,n,this.error||n),this._reject(this,n,this.error||n)),typeof l=="function"&&l.call(this,this,n),delete this.transport}};avalon.ajax=function(e,t){(!e||!e.url)&&avalon.error("参数必须为Object并且拥有url属性"),e=ajaxExtend(e);var n={responseHeadersString:"",responseHeaders:{},requestHeaders:{},querystring:e.querystring,readyState:0,uniqueID:(""+Math.random()).replace(/0\./,""),status:0},r,i,t=new Promise(function(e,t){i=e,r=t});t.options=e,t._reject=r,t._resolve=i,avalon.mix(t,n,XHRMethods);var s=e.dataType,o=avalon.ajaxTransports;(e.crossDomain&&!supportCors||rjsonp.test(e.url))&&s==="json"&&e.type==="GET"&&(s=e.dataType="jsonp");var u=e.form?"upload":s,a=o[u]||o.xhr;avalon.mix(t,a),t.preproccess&&(s=t.preproccess()||s),e.contentType&&t.setRequestHeader("Content-Type",e.contentType),t.setRequestHeader("Accept",accepts[s]?accepts[s]+", */*; q=0.01":accepts["*"]);for(var f in e.headers)t.setRequestHeader(f,e.headers[f]);return e.async&&e.timeout>0&&(t.timeoutID=setTimeout(function(){t.abort("timeout"),t.dispatch(0,"timeout")},e.timeout)),t.request(),t},"get,post".replace(avalon.rword,function(e){avalon[e]=function(t,n,r,i){return typeof n=="function"&&(i=i||r,r=n,n=void 0),avalon.ajax({type:e,url:t,data:n,success:r,dataType:i})}}),avalon.getScript=function(e,t){return avalon.get(e,null,t,"script")},avalon.getJSON=function(e,t,n){return avalon.get(e,t,n,"json")},avalon.upload=function(e,t,n,r,i){return typeof n=="function"&&(i=r,r=n,n=void 0),avalon.ajax({url:e,type:"post",dataType:i,form:t,data:n,success:r})},avalon.ajaxConverters={text:function(e){return e},xml:function(e,t){return t!==void 0?t:parseXML(e)},html:function(e){return avalon.parseHTML(e)},json:function(e){return avalon.parseJSON||avalon.log("avalon.parseJSON不存在,请升级到最新版"),avalon.parseJSON(e)},script:function(e){return parseJS(e),e},jsonp:function(){var e,t;return this.jsonpCallback.startsWith("avalon.")?(t=this.jsonpCallback.replace(/avalon\./,""),e=avalon[t],delete avalon[t]):e=window[this.jsonpCallback],e}},avalon.param=function(e){var t,n=[],r=function(e,t){t=t==null?"":t,n[n.length]=encode(e)+"="+encode(t)};if(Array.isArray(e)||!avalon.isPlainObject(e))avalon.each(e,function(e,t){r(e,t)});else for(t in e)paramInner(t,e[t],r);return n.join("&").replace(r20,"+")},avalon.unparam=function(e){var t,n,r=/\[(.*?)\]/g,i=/(.+?)\[/,s={};return(n=avalon.type(e))!="string"||n=="string"&&!n.length?{}:(t=decode(e).split("&"),!(n=t.length)||n==1&&n===""?s:(avalon.each(t,function(e,t){if(!t.length)return;n=t.split("=");var o=n.shift(),u=n.join("=").replace(/\+/g," "),a,f,l=[];if(!o.length)return;while(n=r.exec(o))l.push(n[1]);if(!(a=l.length)){s[o]=u;return}a--,n=i.exec(o);if(!n||!(o=n[1])||!o.length)return;avalon.type(s[o])!="object"&&(s[o]={}),f=s[o],avalon.each(l,function(e,t){(n=t).length||(n=0,avalon.each(f,function(e){!isNaN(e)&&e>=0&&e%1===0&&e>=n&&(n=Number(e)+1)})),e==a?f[n]=u:avalon.type(f[n])!="object"?f=f[n]={}:f=f[n]})}),s))};var rinput=/select|input|button|textarea/i,rcheckbox=/radio|checkbox/,rline=/\r?\n/g;avalon.serialize=function(e){var t={};return Array.prototype.filter.call(e.getElementsByTagName("*"),function(e){if(rinput.test(e.nodeName)&&e.name&&!e.disabled)return rcheckbox.test(e.type)?e.checked:!0}).forEach(function(e){var n=avalon(e).val();n=Array.isArray(n)?n.map(trimLine):trimLine(n);var r=e.name;r in t?Array.isArray(n)?t[r].push(n):t[r]=[t[r],n]:t[r]=n}),avalon.param(t,!1)};var xhrSuccessStatus={0:200,1223:204},transports=avalon.ajaxTransports={xhr:{request:function(){var e=this,t=this.options;avalon.log("XhrTransport.request.....");var n=this.transport=new avalon.xhr;n.open(t.type,t.url,t.async,t.username,t.password),this.mimeType&&n.overrideMimeType&&n.overrideMimeType(this.mimeType),n.withCredentials=!0,this.requestHeaders["X-Requested-With"]="XMLHttpRequest";for(var r in this.requestHeaders)n.setRequestHeader(r,this.requestHeaders[r]+"");var i=this.options.dataType;"responseType"in n&&/^(blob|arraybuffer|text)$/.test(i)&&(n.responseType=i,this.useResponseType=!0),n.send(t.hasContent&&(this.formdata||this.querystring)||null),n.onload=n.onerror=function(t){this.readyState=4,this.status=t.type==="load"?200:500,e.respond()}},respond:function(e,t){var n=this.transport;if(!n)return;var r=n.readyState===4;if(t||r){n.onerror=n.onload=null;if(t)!r&&typeof n.abort=="function"&&n.abort();else{var i=n.responseText,s=n.statusText,o=n.status,o=xhrSuccessStatus[o]||o;this.response=n.response,this.responseText=typeof i=="string"?i:void 0,this.responseXML=(n.responseXML||{}).documentElement,this.responseHeadersString=n.getAllResponseHeaders(),this.dispatch(o,s)}}}},jsonp:{preproccess:function(){var e=this.options,t=this.jsonpCallback=e.jsonpCallback||"avalon.jsonp"+setTimeout("1");return rjsonp.test(e.url)?e.url=e.url.replace(rjsonp,"$1"+t):e.url=e.url+(rquery.test(e.url)?"&":"?")+e.jsonp+"="+t,t.startsWith("avalon.")?(t=t.replace(/avalon\./,""),avalon[t]=function(e){avalon[t]=e}):window[t]=function(e){window[t]=e},"script"}},script:{request:function(){var e=this.options,t=this.transport=DOC.createElement("script");avalon.log("ScriptTransport.sending....."),e.charset&&(t.charset=e.charset);var n=this;t.onerror=t.onload=function(){n.respond()},t.src=e.url,head.insertBefore(t,head.firstChild)},respond:function(e,t){var n=this.transport;if(!n)return;n.onerror=n.onload=null;var r=n.parentNode;r&&r.removeChild(n);if(!t){var i=this.jsonpCallback.startsWith("avalon.")?avalon[this.jsonpCallback.replace(/avalon\./,"")]:window[this.jsonpCallback],s=typeof i=="function"?[500,"error"]:[200,"success"];this.dispatch.apply(this,s)}}},upload:{preproccess:function(){var e=this.options,t;typeof e.form.append=="function"?(t=e.form,e.contentType=""):t=new FormData(e.form),avalon.each(e.data,function(e,n){t.append(e,n)}),this.formdata=t}}};return avalon.mix(transports.jsonp,transports.script),avalon.mix(transports.upload,transports.xhr),avalon});