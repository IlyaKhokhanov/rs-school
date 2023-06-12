export default function openMenu() {
  const btn: HTMLElement | null = document.querySelector('.menu__btn');
  const menu: HTMLElement | null = document.querySelector('.sources');
  const overlay: HTMLElement | null = document.querySelector('.overlay');

  function toggleClasses() {
    if (btn) btn.classList.toggle('menu__btn--active');
    if (menu) menu.classList.toggle('sources--active');
    if (overlay) overlay.classList.toggle('overlay--active');
    document.body.style.overflow = document.body.style.overflow ? '' : 'hidden';
  }

  if (btn) btn.addEventListener('click', toggleClasses);
  if (overlay) overlay.addEventListener('click', toggleClasses);
  if (menu) {
    menu.addEventListener('click', (e) => {
      const { target } = e;
      if (
        target
        && (<HTMLElement>target).closest('.source__item')
        && menu.closest('.sources--active')
      ) {
        toggleClasses();
      }
    });
  }
}
