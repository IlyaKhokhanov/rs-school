(()=>{"use strict";var e={659:(e,t,s)=>{s.r(t)},283:(e,t,s)=>{s.r(t)},485:(e,t,s)=>{s.r(t)},717:function(e,t,s){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(s(842)),n=s(527);t.default=class{constructor(){this.controller=new o.default,this.view=new n.AppView}start(){document.querySelector(".sources").addEventListener("click",(e=>{this.controller.getNews(e,(e=>this.view.drawNews(e)))})),this.controller.getSources((e=>this.view.drawSources(e)))}}},853:function(e,t,s){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(s(24));class n extends o.default{constructor(){super("https://rss-news-api.onrender.com/",{apiKey:"bc5915683caf415c89e455519f95da46"})}}t.default=n},842:function(e,t,s){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(s(853));class n extends o.default{getSources(e){super.getResp({endpoint:"sources"},e)}getNews(e,t){let{target:s}=e;const{currentTarget:r}=e;for(;s!==r;){if(s.classList.contains("source__item")){const e=s.getAttribute("data-source-id");return void(r.getAttribute("data-source")!==e&&(r.setAttribute("data-source",e),super.getResp({endpoint:"everything",options:{sources:e}},t)))}s=s.parentNode}}}t.default=n},24:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});class s{constructor(e,t){this.baseLink=e,this.options=t}static errorHandler(e){if(!e.ok){if(401===e.status||404===e.status)throw Error(`Sorry, but there is ${e.status} error: ${e.statusText}`);throw Error(e.statusText)}return e}getResp({endpoint:e,options:t={}},s=(()=>{throw Error("No callback for GET response")})){this.load("GET",e,s,t)}makeUrl(e,t){const s=Object.assign(Object.assign({},this.options),e);let r=`${this.baseLink}${t}?`;return Object.keys(s).forEach((e=>{r+=`${e}=${s[e]}&`})),r.slice(0,-1)}load(e,t,r,o={}){fetch(this.makeUrl(o,t),{method:e}).then(s.errorHandler).then((e=>e.json())).then((e=>r(e))).catch((e=>new Error(e.message)))}}t.default=s},527:function(e,t,s){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppView=void 0;const o=r(s(798)),n=r(s(53));class a{constructor(){this.news=o.default,this.sources=n.default}drawNews(e){const t=e.articles?e.articles:[];this.news.draw(t)}drawSources(e){const t=e.sources?e.sources:[];this.sources.draw(t)}}t.AppView=a,t.default=a},798:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(397);s(659),t.default=class{static draw(e){const t=e.length>=10?e.filter(((e,t)=>t<10)):e,s=document.createDocumentFragment(),o=document.querySelector("#newsItemTemp");o instanceof HTMLTemplateElement&&t.forEach(((e,t)=>{const n=o.content.cloneNode(!0);t%2&&n.querySelector(r.NewsTempClass.item).classList.add("alt"),n.querySelector(r.NewsTempClass.photo).style.backgroundImage=`url(${e.urlToImage||"img/news_placeholder.jpg"})`,n.querySelector(r.NewsTempClass.author).textContent=e.author||e.source.name,n.querySelector(r.NewsTempClass.date).textContent=e.publishedAt.slice(0,10).split("-").reverse().join("-"),n.querySelector(r.NewsTempClass.title).textContent=e.title,n.querySelector(r.NewsTempClass.source).textContent=e.source.name,n.querySelector(r.NewsTempClass.content).textContent=e.description,n.querySelector(r.NewsTempClass.link).setAttribute("href",e.url),s.append(n)}));const n=document.querySelector(".news");n.innerHTML="",n.appendChild(s)}}},53:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const r=s(397);s(283),t.default=class{static draw(e){const t=document.createDocumentFragment(),s=document.querySelector("#sourceItemTemp");s instanceof HTMLTemplateElement&&(e.forEach((e=>{const o=s.content.cloneNode(!0);o.querySelector(r.SourcesTempClass.name).textContent=e.name,o.querySelector(r.SourcesTempClass.item).setAttribute("data-source-id",String(e.id)),t.append(o)})),document.querySelector(".sources").append(t))}}},397:(e,t)=>{var s,r;Object.defineProperty(t,"__esModule",{value:!0}),t.NewsTempClass=t.SourcesTempClass=void 0,function(e){e.item=".source__item",e.name=".source__item-name"}(s||(t.SourcesTempClass=s={})),function(e){e.item=".news__item",e.photo=".news__meta-photo",e.author=".news__meta-author",e.date=".news__meta-date",e.title=".news__description-title",e.source=".news__description-source",e.content=".news__description-content",e.link=".news__read-more a"}(r||(t.NewsTempClass=r={}))},607:function(e,t,s){var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=r(s(717));s(485),(new o.default).start()}},t={};function s(r){var o=t[r];if(void 0!==o)return o.exports;var n=t[r]={exports:{}};return e[r].call(n.exports,n,n.exports,s),n.exports}s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s(607)})();