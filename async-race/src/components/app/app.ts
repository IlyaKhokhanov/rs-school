import { addElement } from '../../utils/utils';

export default class App {
  private container = document.body;

  private garageBtn = addElement('button', 'main-button', 'TO GARAGE');

  private winnersBtn = addElement('button', 'main-button', 'TO WINNERS');

  constructor() {
    this.initApp();
  }

  initApp() {
    this.container.append(this.garageBtn, this.winnersBtn);
  }
}
