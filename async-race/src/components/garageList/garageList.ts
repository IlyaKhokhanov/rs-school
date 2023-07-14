import { CarItem } from '../../utils/types';
import { addElement } from '../../utils/utils';
import Car from '../car/car';
import './garageList.scss';

export default class GarageList {
  constructor(private container: HTMLElement, private data: CarItem[]) {
    this.initGarageList();
  }

  initGarageList() {
    this.container.innerHTML = '';
    const header = addElement(
      'h1',
      'garage-header',
      `Garage (${this.data.length})`
    );
    const pageCount = addElement('h1', 'garage-page', `Page #${1}`);

    const garageList = addElement('div', 'garage-list');
    this.data.forEach((item) => new Car(garageList, item));

    const buttons = addElement('div', 'garage-buttons-wrapper');

    const raceBtn = addElement('button', ['main-btn', 'garage-btn'], 'prev');
    raceBtn.addEventListener('click', () => console.log('prev'));

    const resetBtn = addElement('button', ['main-btn', 'garage-btn'], 'next');
    resetBtn.addEventListener('click', () => console.log('next'));

    buttons.append(raceBtn, resetBtn);
    this.container.append(header, pageCount, garageList, buttons);
  }
}
