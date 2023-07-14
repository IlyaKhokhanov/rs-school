import { addElement } from '../../utils/utils';

export default class Winners {
  constructor(private container: HTMLElement) {
    this.initWinners();
  }

  initWinners() {
    this.container.innerHTML = '';

    const header = addElement('h1', 'winners-header', `Winners (${3})`);
    this.container.append(header);
  }
}
