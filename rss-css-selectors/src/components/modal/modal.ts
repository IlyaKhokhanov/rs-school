import { addElement } from '../../utils/utils';
import './modal.scss';

export default class Modal {
  constructor(private container: HTMLElement, private callback: () => void) {
    this.initModal();
  }

  private initModal(): void {
    const overlay = addElement('div', 'overlay');
    overlay.addEventListener('click', (e) => {
      const { target } = e;
      if (target && (target as HTMLElement).classList.contains('overlay')) {
        overlay.remove();
      }
    });

    const modal = addElement('div', 'modal');
    const btnClose = addElement('div', 'modal__btn-close');
    btnClose.textContent = '×';
    btnClose.addEventListener('click', () => overlay.remove());

    const content = addElement('div', 'modal__content');
    content.classList.add('modal-info');
    content.textContent = 'Hooray! You complete all levels!';

    const btnStart = addElement('div', 'modal__btn-start');
    btnStart.textContent = 'Reset progress';
    btnStart.addEventListener('click', this.callback);

    modal.append(btnClose, content, btnStart);
    overlay.append(modal);
    this.container.append(overlay);
  }
}
