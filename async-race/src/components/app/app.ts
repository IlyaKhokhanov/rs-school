import { addElement } from '../../utils/utils';
import Garage from '../garage/garage';
import Winners from '../winners/winners';

export default class App {
  private container = document.body;

  private garageBtn = addElement('button', 'main-btn', 'TO GARAGE');

  private winnersBtn = addElement('button', 'main-btn', 'TO WINNERS');

  private pageContainer = addElement('div', 'page-container');

  constructor() {
    this.initApp();
  }

  initApp() {
    this.garageBtn.addEventListener('click', () => new Garage(this.pageContainer));
    this.winnersBtn.addEventListener('click', () => new Winners(this.pageContainer));
    const buttonsWrapper = addElement('div', 'buttons-wrapper');

    buttonsWrapper.append(this.garageBtn, this.winnersBtn);
    this.container.append(buttonsWrapper, this.pageContainer);
    this.initPage();
  }

  initPage() {
    const page = new Garage(this.pageContainer);
  }
}
