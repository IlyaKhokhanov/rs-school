(()=>{"use strict";var e={659:(e,t,s)=>{s.r(t)},283:(e,t,s)=>{s.r(t)},485:(e,t,s)=>{s.r(t)},717:function(e,t,s){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=o(s(842)),n=s(527);t.default=class{constructor(){this.controller=new r.default,this.view=new n.AppView}start(){document.querySelector(".sources").addEventListener("click",(e=>{this.controller.getNews(e,(e=>this.view.drawNews(e)))})),this.controller.getSources((e=>this.view.drawSources(e)))}}},853:function(e,t,s){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=o(s(24));class n extends r.default{constructor(){super("https://rss-news-api.onrender.com/",{apiKey:"bc5915683caf415c89e455519f95da46"})}}t.default=n},842:function(e,t,s){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=o(s(853));class n extends r.default{getSources(e){super.getResp({endpoint:"sources"},e)}getNews(e,t){let{target:s}=e;const{currentTarget:o}=e;for(;s!==o;){if(s.classList.contains("source__item")){const e=s.getAttribute("data-source-id");return void(o.getAttribute("data-source")!==e&&e&&(o.setAttribute("data-source",e),super.getResp({endpoint:"everything",options:{sources:e}},t)))}s=s.parentNode}}}t.default=n},24:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0});class s{constructor(e,t){this.baseLink=e,this.options=t}static errorHandler(e){if(!e.ok){if(401===e.status||404===e.status)throw Error(`Sorry, but there is ${e.status} error: ${e.statusText}`);throw Error(e.statusText)}return e}getResp({endpoint:e,options:t={}},s=(()=>{throw Error("No callback for GET response")})){this.load("GET",e,s,t)}makeUrl(e,t){const s=Object.assign(Object.assign({},this.options),e);let o=`${this.baseLink}${t}?`;return Object.keys(s).forEach((e=>{o+=`${e}=${s[e]}&`})),o.slice(0,-1)}load(e,t,o,r={}){fetch(this.makeUrl(r,t),{method:e}).then(s.errorHandler).then((e=>e.json())).then((e=>o(e))).catch((e=>new Error(e.message)))}}t.default=s},464:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(){const e=document.querySelector(".menu__btn"),t=document.querySelector(".sources"),s=document.querySelector(".overlay");function o(){e&&e.classList.toggle("menu__btn--active"),t&&t.classList.toggle("sources--active"),s&&s.classList.toggle("overlay--active"),document.body.style.overflow=document.body.style.overflow?"":"hidden"}e&&e.addEventListener("click",o),s&&s.addEventListener("click",o),t&&t.addEventListener("click",(e=>{const{target:s}=e;s&&s.closest(".source__item")&&t.closest(".sources--active")&&o()}))}},527:function(e,t,s){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.AppView=void 0;const r=o(s(798)),n=o(s(53));class c{constructor(){this.news=r.default,this.sources=n.default}drawNews(e){const t=(null==e?void 0:e.articles)?null==e?void 0:e.articles:[];this.news.draw(t)}drawSources(e){const t=(null==e?void 0:e.sources)?null==e?void 0:e.sources:[];this.sources.draw(t)}}t.AppView=c,t.default=c},798:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=s(397);s(659),t.default=class{static draw(e){const t=e&&e.length>=10?e.filter(((e,t)=>t<10)):e,s=document.createDocumentFragment(),r=document.querySelector("#newsItemTemp");if(r){if(!t)throw new Error("News not found");t.forEach(((e,t)=>{const n=r.content.cloneNode(!0);if(t%2){const e=n.querySelector(o.NewsTempClass.item);e&&e.classList.add("alt")}const c=n.querySelector(o.NewsTempClass.photo);c&&(c.style.backgroundImage=`url(${e.urlToImage||"img/news_placeholder.jpg"})`);const u=n.querySelector(o.NewsTempClass.author);u&&(u.textContent=e.author||e.source.name);const a=n.querySelector(o.NewsTempClass.date);a&&(a.textContent=e.publishedAt.slice(0,10).split("-").reverse().join("-"));const i=n.querySelector(o.NewsTempClass.title);i&&(i.textContent=e.title);const l=n.querySelector(o.NewsTempClass.source);l&&(l.textContent=e.source.name);const d=n.querySelector(o.NewsTempClass.content);d&&(d.textContent=e.description);const p=n.querySelector(o.NewsTempClass.link);p&&p.setAttribute("href",e.url),s.append(n)}))}const n=document.querySelector(".news");if(!(n instanceof HTMLElement))throw new Error("Error with news");n.innerHTML="",n.appendChild(s)}}},53:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0});const o=s(397);s(283),t.default=class{static draw(e){const t=document.createDocumentFragment(),s=document.querySelector("#sourceItemTemp");if(s instanceof HTMLTemplateElement){if(!e)throw new Error("Data not found");{e.forEach((e=>{const r=s.content.cloneNode(!0),n=r.querySelector(o.SourcesTempClass.name);n&&(n.textContent=e.name);const c=r.querySelector(o.SourcesTempClass.item);c&&c.setAttribute("data-source-id",String(e.id)),t.append(r)}));const r=document.querySelector(".sources");r&&r.append(t)}}}}},397:(e,t)=>{var s,o;Object.defineProperty(t,"__esModule",{value:!0}),t.NewsTempClass=t.SourcesTempClass=void 0,function(e){e.item=".source__item",e.name=".source__item-name"}(s||(t.SourcesTempClass=s={})),function(e){e.item=".news__item",e.photo=".news__meta-photo",e.author=".news__meta-author",e.date=".news__meta-date",e.title=".news__description-title",e.source=".news__description-source",e.content=".news__description-content",e.link=".news__read-more a"}(o||(t.NewsTempClass=o={}))},607:function(e,t,s){var o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=o(s(717)),n=o(s(464));s(485),(new r.default).start(),(0,n.default)()}},t={};function s(o){var r=t[o];if(void 0!==r)return r.exports;var n=t[o]={exports:{}};return e[o].call(n.exports,n,n.exports,s),n.exports}s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s(607)})();