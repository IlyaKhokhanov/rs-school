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

  private initApp(): void {
    this.garageBtn.addEventListener('click', () => {
      localStorage.setItem('pageKH', 'garage');
      const garage = new Garage(this.pageContainer);
    });
    this.winnersBtn.addEventListener('click', () => {
      localStorage.setItem('pageKH', 'winners');
      const winners = new Winners(this.pageContainer);
    });
    const buttonsWrapper = addElement('div', 'buttons-wrapper');

    buttonsWrapper.append(this.garageBtn, this.winnersBtn);
    this.container.append(buttonsWrapper, this.pageContainer);
    this.initPage();
  }

  private initPage(): void {
    const page = localStorage.getItem('pageKH');
    if (page === 'winners') {
      const winners = new Winners(this.pageContainer);
    } else {
      const garage = new Garage(this.pageContainer);
    }
  }
}
