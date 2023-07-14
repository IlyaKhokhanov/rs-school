import { CarItem } from '../../utils/types';
import { addElement } from '../../utils/utils';
import './car.scss';

export default class Car {
  constructor(private container: HTMLElement, private item: CarItem) {
    this.initCar();
  }

  initCar() {
    const carContainer = addElement('div', 'car-container');

    
    const header = addElement('h2', 'header', this.item.name);

    carContainer.append(header);
    this.container.append(carContainer);
  }
}
