import { addElement } from '../../utils/utils';
import './header.scss';

export default function header(): void {
  const headerWrapper: HTMLElement = document.createElement('header');
  const headerElem: HTMLElement = addElement('h1', 'header');
  headerElem.textContent = 'CSS Selectors';

  headerWrapper.append(headerElem);
  document.body.append(headerWrapper);
}
