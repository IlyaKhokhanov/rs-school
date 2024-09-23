import { modal } from "./js/modal.js";
import { openMenu } from "./js/openMenu.js";
import { pagination } from "./js/pagination.js";

window.addEventListener("resize", pagination);
pagination();
openMenu();
modal();
