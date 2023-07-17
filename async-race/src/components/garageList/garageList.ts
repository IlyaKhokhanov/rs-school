import { CarItem } from '../../utils/types';
import { addElement } from '../../utils/utils';
import Car from '../car/car';
import './garageList.scss';

export default class GarageList {
  constructor(
    private container: HTMLElement,
    private data: CarItem[],
    private callbackRemove: (id: string) => void
  ) {
    this.initGarageList();
  }

  initGarageList() {
    this.container.innerHTML = '';
    const header = addElement(
      'h1',
      'garage-header',
      `Garage (${this.data.length})`
    );
    const pageCount = addElement('h2', 'garage-page', `Page #${1}`);

    const garageList = addElement('div', 'garage-list');
    this.data.forEach((item) => new Car(garageList, item, this.callbackRemove));

    const buttons = addElement('div', 'garage-buttons-wrapper');

    const prevBtn = addElement('button', ['main-btn', 'garage-btn'], 'prev');
    prevBtn.addEventListener('click', () => console.log('prev'));

    const nextBtn = addElement('button', ['main-btn', 'garage-btn'], 'next');
    nextBtn.addEventListener('click', () => console.log('next'));

    buttons.append(prevBtn, nextBtn);
    this.container.append(header, pageCount, garageList, buttons);
  }
}
