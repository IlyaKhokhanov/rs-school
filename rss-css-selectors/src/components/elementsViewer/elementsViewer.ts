import { addElement } from '../../utils/utils';
import './elementsViewer.scss';

export default class ElementsViewer {
  constructor(public container: HTMLElement) {
    this.initElements();
  }

  initElements() {
    const elementsWrapper = addElement('div', 'elements-wrapper');

    this.container.append(elementsWrapper);
  }
}
