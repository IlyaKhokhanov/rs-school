import { carousel } from "./js/carousel.js";
import { modal } from "./js/modal.js";
import { openMenu } from "./js/openMenu.js";

window.addEventListener("resize", carousel);
carousel();
openMenu();
modal();
