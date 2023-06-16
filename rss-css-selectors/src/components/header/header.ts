import './header.scss';

export default function header(): void {
  const headerWrapper: HTMLElement = document.createElement('header');
  const headerElem: HTMLHeadingElement = document.createElement('h1');
  headerElem.textContent = 'CSS Selectors';
  headerElem.classList.add('header');

  headerWrapper.append(headerElem);
  document.body.append(headerWrapper);
}
