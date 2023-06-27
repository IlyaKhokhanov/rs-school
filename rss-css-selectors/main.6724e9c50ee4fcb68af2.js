(()=>{"use strict";var e={801:(e,t,l)=>{l.r(t)},68:(e,t,l)=>{l.r(t)},335:(e,t,l)=>{l.r(t)},562:(e,t,l)=>{l.r(t)},757:(e,t,l)=>{l.r(t)},790:(e,t,l)=>{l.r(t)},247:(e,t,l)=>{l.r(t)},246:(e,t,l)=>{l.r(t)},717:function(e,t,l){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=l(974),a=n(l(731)),i=n(l(391)),d=n(l(829)),r=n(l(502));t.default=class{constructor(){this.mainContainer=(0,s.addElement)("main","main"),this.elements=new i.default(this.mainContainer,this.helpWithAnswer.bind(this)),this.cssEditor=new a.default(this.mainContainer,this.levelComplete.bind(this)),this.htmlViewer=new d.default(this.mainContainer),this.levels=new r.default(this.mainContainer,this.initApp.bind(this))}initApp(e){this.mainContainer.innerHTML="",this.elements.initElements(e),this.cssEditor.initCssEditor(e.answer),this.htmlViewer.initHtmlViewer(e.items),document.body.append(this.mainContainer)}levelComplete(){setTimeout((()=>{this.levels.nextLevel()}),1e3)}helpWithAnswer(){this.cssEditor.addAnswer(),this.levels.addInfoHelp()}}},731:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=l(974);l(801),t.default=class{constructor(e,t){this.container=e,this.callback=t,this.complete=!1,this.cssEditorInput=null,this.answerArr=null}initCssEditor(e){this.complete=!1,this.answerArr=e;const t=(0,n.addElement)("div","css-editor-wrapper"),l=(0,n.addElement)("div","css-editor-header-block"),s=(0,n.addElement)("h2","css-editor-header","CSS Editor"),a=(0,n.addElement)("span","css-editor-header-file","style.css");l.append(s,a);const i=(0,n.addElement)("div","css-editor-code-wrapper"),d=(0,n.addElement)("div","css-editor-code-numbers");for(let e=1;e<=20;e+=1){const t=(0,n.addElement)("div","css-editor-code-number",String(e));d.append(t)}const r=(0,n.addElement)("div","css-editor-code");r.addEventListener("keypress",(t=>{"Enter"===t.key&&this.checkAnswer(e)}));const c=(0,n.addElement)("div","css-editor-code-input-wrapper");this.cssEditorInput=document.createElement("input"),this.cssEditorInput.classList.add("css-editor-code-input"),this.cssEditorInput.setAttribute("placeholder","Type in a CSS selector");const o=(0,n.addElement)("button","css-editor-code-input-btn");o.textContent="Enter",o.addEventListener("click",(()=>this.checkAnswer(e))),c.append(this.cssEditorInput,o);const m=(0,n.addElement)("span","css-editor-code-value");m.textContent="{\n/* Styles would go here. */\n}",r.append(c,m),i.append(d,r),t.append(l,i),this.container.append(t)}checkAnswer(e){var t;(null===(t=this.cssEditorInput)||void 0===t?void 0:t.value)&&e.includes(this.cssEditorInput.value)?(document.querySelectorAll(".active").forEach((e=>{e.classList.add("complete")})),this.complete||(this.callback(),this.complete=!0)):(this.container.classList.add("error"),setTimeout((()=>{this.container.classList.remove("error")}),200))}addAnswer(){if(this.answerArr&&this.cssEditorInput instanceof HTMLInputElement){const[e]=this.answerArr,{cssEditorInput:t}=this;let l=0;setTimeout((function n(){t.value+=e[l],l<e.length-1&&setTimeout(n,300),l+=1}),300)}}}},391:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=l(974);l(68),t.default=class{constructor(e,t){this.container=e,this.callback=t,this.items=null}initElements(e){this.items=e.items;const t=(0,n.addElement)("div","elements-wrapper"),l=(0,n.addElement)("h2","elements-header");l.textContent=e.description;const s=(0,n.addElement)("button","elements-btn");s.textContent="Help, I'm stuck!",s.addEventListener("click",this.callback);const a=(0,n.addElement)("div","elements-field-wrapper"),i=(0,n.addElement)("field");i.addEventListener("mouseover",(e=>(0,n.illuminateElementsAndCode)(e,!0))),i.addEventListener("mouseout",(e=>(0,n.illuminateElementsAndCode)(e,!1))),this.items.forEach(((e,t)=>{const l=(0,n.addElement)(e.element,e.class);l.dataset.id=String(t);const s=(0,n.addElement)("span","tooltip");if(s.textContent=`<${e.element}></${e.element}>`,e.id&&(l.classList.add(e.id),s.textContent=`<${e.element} class="${e.id}"></${e.element}>`),l.append(s),e.innerElement){const s=(0,n.addElement)(e.innerElement.element,e.innerElement.class);s.dataset.id=`in${t}`;const a=(0,n.addElement)("span","tooltip");a.textContent=`<${e.innerElement.element}></${e.innerElement.element}>`,e.innerElement.id&&(s.classList.add(e.innerElement.id),a.textContent=`<${e.innerElement.element} class="${e.innerElement.id}"></${e.innerElement.element}>`),s.append(a),l.append(s)}i.append(l)})),a.append(i),t.append(l,s,a),this.container.append(t)}}},0:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=l(974);l(335),t.default=function(){const e=(0,n.addElement)("footer","footer"),t=(0,n.addElement)("div","rss"),l=(0,n.addElement)("a","rss-link");l.setAttribute("href","https://rs.school/js/"),l.setAttribute("target","_blank");const s=(0,n.addElement)("img","rss-img");s.setAttribute("src","./img/rss_js.png"),s.setAttribute("alt","rss-link"),l.append(s),t.append(l);const a=(0,n.addElement)("div","github"),i=(0,n.addElement)("a","github-link");i.setAttribute("href","https://github.com/IlyaKhokhanov"),i.setAttribute("target","_blank");const d=(0,n.addElement)("img","github-img");d.setAttribute("src","./img/gh.png"),d.setAttribute("alt","github");const r=(0,n.addElement)("span","github-author");r.textContent=" Ilya Khokhanov 2023",i.append(d,r),a.append(i),e.append(t,a),document.body.append(e)}},977:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=l(974);l(562),t.default=function(){const e=document.createElement("header"),t=(0,n.addElement)("h1","header");t.textContent="CSS Selectors",e.append(t),document.body.append(e)}},829:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=l(974);l(757),t.default=class{constructor(e){this.container=e,this.items=null}initHtmlViewer(e){this.items=e;const t=(0,n.addElement)("div","html-viewer-wrapper"),l=(0,n.addElement)("div","html-viewer-header-block"),s=(0,n.addElement)("h2","html-viewer-header","HTML Viewer"),a=(0,n.addElement)("span","html-viewer-header-file","field.html");l.append(s,a);const i=(0,n.addElement)("div","html-viewer-code-wrapper"),d=(0,n.addElement)("div","html-viewer-code-numbers");for(let e=1;e<=20;e+=1){const t=(0,n.addElement)("div","html-viewer-code-number",String(e));d.append(t)}const r=(0,n.addElement)("div","html-viewer-code");r.addEventListener("mouseover",(e=>(0,n.illuminateElementsAndCode)(e,!0))),r.addEventListener("mouseout",(e=>(0,n.illuminateElementsAndCode)(e,!1)));const c=(0,n.addElement)("div"),o=(0,n.elemToHtmlViewer)("div",!0,!0,"field");c.append(o),r.append(c),this.items.forEach(((e,t)=>{const l=(0,n.addElement)("div","html-viewer-code-item");if(l.dataset.id=String(t),e.innerElement){const s=(0,n.elemToHtmlViewer)(e.element,!0,!0,e.id);l.append(s);const a=(0,n.addElement)("div","html-viewer-code-item");a.dataset.id=`in${t}`;const i=(0,n.elemToHtmlViewer)(e.innerElement.element,!0,!1,e.innerElement.id);a.append(i),l.append(a);const d=(0,n.elemToHtmlViewer)(e.element,!1,!0);l.appendChild(d)}else{const t=(0,n.elemToHtmlViewer)(e.element,!0,!1,e.id);l.append(t)}r.append(l)}));const m=(0,n.addElement)("div"),p=(0,n.elemToHtmlViewer)("div",!1,!0);m.append(p),r.append(m),i.append(d,r),t.append(l,i),this.container.append(t)}}},502:function(e,t,l){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=l(974),a=n(l(804));l(790);const i=n(l(313)),d=localStorage.getItem("testDataKH");t.default=class{constructor(e,t){this.container=e,this.callback=t,this.levelsData=d?JSON.parse(d):a.default,this.currentLevel=Number(localStorage.getItem("testLevelKH"))||0,this.sidebar=(0,s.addElement)("aside","sidebar"),this.sidebarBtn=(0,s.addElement)("button","sidebar__btn"),this.sidebarOverlay=(0,s.addElement)("div","sidebar-overlay"),this.resetAndInitEventListeners(),this.initLevels()}initLevels(){this.sidebar.innerHTML="";const e=(0,s.addElement)("h2","sidebar-header");e.textContent="Levels";const t=(0,s.addElement)("ul","sidebar-list");this.levelsData.forEach(((e,l)=>{const n=(0,s.addElement)("li","sidebar-level"),a=document.createElement("img");a.classList.add("sidebar-level--img"),a.src=`./img/check-${e.complete?"green":"black"}.png`;const i=(0,s.addElement)("span","sidebar-level--text");i.textContent=e.name;const d=(0,s.addElement)("span","sidebar-level--wrapper");if(d.append(a,i),n.append(d),e.help){const e=document.createElement("img");e.classList.add("sidebar-level--img"),e.src="./img/question.png",n.append(e)}n.addEventListener("click",(e=>{var t;const{target:l}=e;l&&(this.currentLevel=Number(null===(t=l.textContent)||void 0===t?void 0:t.split(" ")[1])-1),this.initLevels()})),this.currentLevel===l&&n.classList.add("sidebar-level--active"),t.append(n)}));const l=(0,s.addElement)("button","sidebar-reset--btn");l.textContent="Reset Progress",l.addEventListener("click",(()=>{this.resetProgress(),document.documentElement.clientWidth<768&&this.toggleMenu()})),this.sidebar.append(this.sidebarBtn,e,t,l),document.body.append(this.sidebarOverlay,this.sidebar),this.callback(this.levelsData[this.currentLevel||0])}resetProgress(){this.levelsData=this.levelsData.map((e=>Object.assign(Object.assign({},e),{complete:!1,help:!1}))),this.currentLevel=0,this.initLevels(),localStorage.removeItem("testDataKH"),localStorage.removeItem("testLevelKH")}nextLevel(){null!==this.currentLevel&&(this.levelsData[this.currentLevel].complete=!0,this.currentLevel!==this.levelsData.length-1&&(this.currentLevel+=1),this.levelsData.length===this.levelsData.filter((e=>e.complete)).length?(this.initLevels(),new i.default(this.container,this.resetProgress.bind(this))):this.currentLevel===this.levelsData.length-1?(this.currentLevel=this.levelsData.findIndex((e=>!e.complete)),this.initLevels()):this.levelsData[this.currentLevel].complete?this.nextLevel():this.initLevels()),localStorage.setItem("testDataKH",JSON.stringify(this.levelsData)),localStorage.setItem("testLevelKH",JSON.stringify(this.currentLevel))}addInfoHelp(){null!==this.currentLevel&&(this.levelsData[this.currentLevel].help=!0)}resetAndInitEventListeners(){const e=(0,s.addElement)("span"),t=(0,s.addElement)("span"),l=(0,s.addElement)("span");this.sidebarBtn.append(e,t,l),this.sidebar.addEventListener("click",(e=>{const{target:t}=e;t&&t.closest(".sidebar-level")&&this.sidebar.closest(".sidebar--active")&&this.toggleMenu()})),this.sidebarOverlay.addEventListener("click",(()=>this.toggleMenu())),this.sidebarBtn.addEventListener("click",(()=>this.toggleMenu()))}toggleMenu(){this.sidebarBtn.classList.toggle("sidebar__btn--active"),this.sidebar.classList.toggle("sidebar--active"),this.sidebarOverlay.classList.toggle("sidebar-overlay--active"),document.body.style.overflow=document.body.style.overflow?"":"hidden"}}},313:(e,t,l)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=l(974);l(247),t.default=class{constructor(e,t){this.container=e,this.callback=t,this.initModal()}initModal(){const e=(0,n.addElement)("div","overlay");e.addEventListener("click",(t=>{const{target:l}=t;l&&l.classList.contains("overlay")&&e.remove()}));const t=(0,n.addElement)("div","modal"),l=(0,n.addElement)("div","modal__btn-close");l.textContent="×",l.addEventListener("click",(()=>e.remove()));const s=(0,n.addElement)("div","modal__content");s.classList.add("modal-info"),s.textContent="Hooray! You complete all levels!";const a=(0,n.addElement)("div","modal__btn-start");a.textContent="Reset progress",a.addEventListener("click",this.callback),t.append(l,s,a),e.append(t),this.container.append(e)}}},607:function(e,t,l){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=n(l(717)),a=n(l(0)),i=n(l(977));l(246),(0,i.default)(),new s.default,(0,a.default)()},974:(e,t)=>{function l(e,t,l){const n=document.createElement(e);return t&&(t instanceof Array?t.forEach((e=>{n.classList.add(e)})):n.classList.add(t)),l&&(n.textContent=l),n}Object.defineProperty(t,"__esModule",{value:!0}),t.illuminateElementsAndCode=t.elemToHtmlViewer=t.addElement=void 0,t.addElement=l,t.elemToHtmlViewer=function(e,t,n,s){const a=l("span");if(t){const e=l("span","operator","<");a.append(e)}else{const e=l("span","operator","</");a.append(e)}const i=l("span","tag",e);if(a.append(i),s){const e=l("span","classEl"," class"),t=l("span","operator",'="'),n=l("span","classVal",s),i=l("span","operator",'"');a.append(e,t,n,i)}if(n){const e=l("span","operator",">");a.append(e)}else{const e=l("span","operator"," />");a.append(e)}return a},t.illuminateElementsAndCode=function(e,t){var l,n;if(e.target.closest("[data-id]")){const s=null===(n=null===(l=e.target.closest("[data-id]"))||void 0===l?void 0:l.dataset)||void 0===n?void 0:n.id;s&&document.querySelectorAll(`[data-id="${s}"]`).forEach((e=>{t?e.classList.add("hovered"):e.classList.remove("hovered")}))}}},804:e=>{e.exports=JSON.parse('[{"name":"Level 1","description":"Select the boxes","complete":false,"items":[{"element":"box","class":"active"},{"element":"box","class":"active"}],"answer":["box","*"]},{"name":"Level 2","description":"Select the boxes","complete":false,"items":[{"element":"box","class":"active"},{"element":"bucket"},{"element":"box","class":"active"}],"answer":["box"]},{"name":"Level 3","description":"Select the fancy box","complete":false,"items":[{"element":"box","class":"active","id":"fancy"},{"element":"box"},{"element":"bucket"}],"answer":[".fancy"]},{"name":"Level 4","description":"Select the red ball in the bucket","complete":false,"items":[{"element":"box"},{"element":"bucket","innerElement":{"element":"red-ball","class":"active"}},{"element":"red-ball"}],"answer":["bucket red-ball","bucket > *"]},{"name":"Level 5","description":"Select the red ball in the fancy bucket","complete":false,"items":[{"element":"box","innerElement":{"element":"blue-ball"}},{"element":"bucket","id":"fancy","innerElement":{"element":"red-ball","class":"active"}},{"element":"bucket","innerElement":{"element":"red-ball"}}],"answer":[".fancy red-ball"]},{"name":"Level 6","description":"Select the small red balls","complete":false,"items":[{"element":"red-ball"},{"element":"red-ball","class":["active","small"],"id":"small"},{"element":"bucket","innerElement":{"element":"red-ball","class":["active","small"],"id":"small"}},{"element":"bucket"}],"answer":[".small","red-ball.small"]},{"name":"Level 7","description":"Select the small blue balls","complete":false,"items":[{"element":"red-ball"},{"element":"red-ball","class":"small","id":"small"},{"element":"box","innerElement":{"element":"blue-ball","class":["active","small"],"id":"small"}},{"element":"bucket","innerElement":{"element":"blue-ball"}},{"element":"bucket","innerElement":{"element":"blue-ball","class":["active","small"],"id":"small"}}],"answer":["blue-ball.small"]},{"name":"Level 8","description":"Select the small blue balls in the boxes","complete":false,"items":[{"element":"box","innerElement":{"element":"blue-ball"}},{"element":"blue-ball","class":"small","id":"small"},{"element":"box","innerElement":{"element":"blue-ball","class":["active","small"],"id":"small"}},{"element":"box","innerElement":{"element":"red-ball","class":"small","id":"small"}},{"element":"box","innerElement":{"element":"blue-ball","class":["active","small"],"id":"small"}}],"answer":["box blue-ball.small"]},{"name":"Level 9","description":"Select all the buckets and boxes","complete":false,"items":[{"element":"blue-ball","class":"small","id":"small"},{"element":"blue-ball"},{"element":"bucket","class":"active","innerElement":{"element":"blue-ball"}},{"element":"box","class":"active","innerElement":{"element":"blue-ball"}},{"element":"bucket","class":"active","innerElement":{"element":"blue-ball"}},{"element":"blue-ball"},{"element":"blue-ball","class":"small","id":"small"}],"answer":["box, bucket"]},{"name":"Level 10","description":"Select all the things!","complete":false,"items":[{"element":"red-ball","class":"active"},{"element":"bucket","class":"active","innerElement":{"element":"blue-ball","class":"small","id":"small"}},{"element":"box","class":"active"},{"element":"box","class":"active","innerElement":{"element":"blue-ball"}},{"element":"bucket","class":"active","innerElement":{"element":"blue-ball"}},{"element":"bucket","class":"active","id":"fancy"}],"answer":["*"]},{"name":"Level 11","description":"Select everything in a buckets","complete":false,"items":[{"element":"bucket","id":"fancy","innerElement":{"element":"blue-ball","class":["active","small"],"id":"small"}},{"element":"bucket","innerElement":{"element":"red-ball","class":["active","small"],"id":"small"}},{"element":"red-ball","class":"small","id":"small"},{"element":"bucket","innerElement":{"element":"red-ball","class":"active"}}],"answer":["bucket *","bucket > *"]}]')}},t={};function l(n){var s=t[n];if(void 0!==s)return s.exports;var a=t[n]={exports:{}};return e[n].call(a.exports,a,a.exports,l),a.exports}l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l(607)})();