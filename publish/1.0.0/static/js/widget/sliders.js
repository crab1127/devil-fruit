define("slider",[],function(){var e,t,n,r,i,s,o,u,a,f,l,c,h,p=function(e){var t,n=document.querySelectorAll(".slider > .slide-group");for(;e&&e!==document;e=e.parentNode)for(t=n.length;t--;)if(n[t]===e)return e},d=function(){if("webkitTransform"in n.style){var e=n.style.webkitTransform.match(/translate3d\(([^,]*)/),t=e?e[1]:0;return parseInt(t,10)}},v=function(e){var t=e?r<0?"ceil":"floor":"round";l=Math[t](d()/(h/n.children.length)),l+=e,l=Math.min(l,0),l=Math.max(-(n.children.length-1),l)},m=function(s){n=p(s.target);if(!n)return;var l=n.querySelector(".slide");h=l.offsetWidth*n.children.length,c=undefined,f=n.offsetWidth,a=1,o=-(n.children.length-1),u=+(new Date),e=s.touches[0].pageX,t=s.touches[0].pageY,r=0,i=0,v(0),n.style["-webkit-transition-duration"]=0},g=function(u){if(u.touches.length>1||!n)return;r=u.touches[0].pageX-e,i=u.touches[0].pageY-t,e=u.touches[0].pageX,t=u.touches[0].pageY,typeof c=="undefined"&&(c=Math.abs(i)>Math.abs(r));if(c)return;s=r/a+d(),u.preventDefault(),a=l===0&&r>0?e/f+1.25:l===o&&r<0?Math.abs(e)/f+1.25:1,n.style.webkitTransform="translate3d("+s+"px,0,0)"},y=function(e){if(!n||c)return;v(+(new Date)-u<1e3&&Math.abs(r)>15?r<0?-1:1:0),s=l*f,n.style["-webkit-transition-duration"]=".2s",n.style.webkitTransform="translate3d("+s+"px,0,0)",e=new CustomEvent("slide",{detail:{slideNumber:Math.abs(l)},bubbles:!0,cancelable:!0}),n.parentNode.dispatchEvent(e)};window.addEventListener("touchstart",m),window.addEventListener("touchmove",g),window.addEventListener("touchend",y)});