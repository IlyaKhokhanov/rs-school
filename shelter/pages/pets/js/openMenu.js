export function openMenu() {
  const btn = document.querySelector(".menu__btn");
  const menu = document.querySelector(".menu__list");
  const overlay = document.querySelector(".overlay-menu");
  const logo = document.querySelector(".logo");

  btn.addEventListener("click", toggleClasses);
  overlay.addEventListener("click", toggleClasses);
  menu.addEventListener("click", (e) => {
    if (
      e.target.closest(".menu__list-link") &&
      menu.closest(".menu__list--active")
    ) {
      toggleClasses();
    }
  });

  function toggleClasses() {
    btn.classList.toggle("menu__btn--active");
    menu.classList.toggle("menu__list--active");
    overlay.classList.toggle("overlay-menu--active");
    logo.classList.toggle("logo--active");
    document.body.style.overflow = document.body.style.overflow
      ? null
      : "hidden";
  }
}
