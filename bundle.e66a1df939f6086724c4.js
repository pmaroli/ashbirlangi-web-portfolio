!function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)r.d(n,o,function(t){return e[t]}.bind(null,o));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=0)}([function(e,t,r){r(1),r(2),r(3),r(4),r(5),r(6),document.addEventListener("DOMContentLoaded",()=>{M.AutoInit();var e=o();a(e),n()});const n=()=>{var e=document.querySelector("#contactForm");e&&e.addEventListener("submit",e=>{e.preventDefault();const t={name:e.target[0].value,email:e.target[1].value,subject:e.target[2].value,message:e.target[3].value};fetch("/sendContactEmail",{method:"POST",body:JSON.stringify(t),headers:{"Content-Type":"application/json"}}).then(e=>e.json()).then(e=>{let t=document.querySelector("#contactButton");t.classList.add("disabled"),t.innerHTML=e.message})})},o=()=>{var e=document.querySelectorAll(".materialboxed");return M.Materialbox.init(e,{onOpenStart:()=>{let e=document.querySelector("div.carousel ul.indicators");e&&(e.style.zIndex=-1);let t=document.querySelectorAll("a.nav-arrow-container");t&&t.forEach(e=>{e.style.zIndex=-1})},onCloseEnd:()=>{let e=document.querySelector("div.carousel ul.indicators");e&&(e.style.zIndex=0);let t=document.querySelectorAll("a.nav-arrow-container");t&&t.forEach(e=>{e.style.zIndex=1})}})},a=e=>{var t=document.querySelector(".carousel.carousel-slider"),r=M.Carousel.init(t,{fullWidth:!0,indicators:!0,padding:900,duration:100,onCycleTo:()=>{Array.from(e).forEach((e,t)=>{e.el.classList.contains("active")&&e.close()})}}),n=document.querySelector("div.image-selector");n&&Array.from(n.children).forEach((e,t)=>{e.addEventListener("click",()=>{document.querySelector("div.image-selector>a.active").classList.remove("active"),r.set(t),e.classList.add("active")})});var o=document.querySelectorAll(".nav-arrow-container");return o&&r&&o.forEach(e=>{e.classList.contains("next")?e.addEventListener("click",()=>{r.next()}):e.classList.contains("prev")&&e.addEventListener("click",()=>{r.prev()})}),c(t),r},c=e=>{if(e){let t=document.querySelector(".carousel.carousel-slider .carousel-item img"),r=t.height,n=t.width,o=document.querySelector(".carousel.carousel-slider").offsetWidth*r/n;e.style.height=o+"px"}}},function(e,t,r){},function(e,t,r){e.exports=r.p+"video/cenote.mp4"},function(e,t,r){e.exports=r.p+"video/3seasonsDiorama.mp4"},function(e,t,r){e.exports=r.p+"video/spidermansRoom.mp4"},function(e,t,r){e.exports=r.p+"video/stillLife.mp4"},function(e,t,r){e.exports=r.p+"images/ashBirlangiResume.pdf"}]);