import { CarItem } from '../../utils/types';
import { addCarImage, addElement } from '../../utils/utils';
import './car.scss';

export default class Car {
  constructor(private container: HTMLElement, private item: CarItem) {
    this.initCar();
  }

  initCar() {
    const carContainer = addElement('div', 'car-container');
    const carMainBtnsWrapper = addElement('div', 'car-btn-wrapper');
    const selectBtn = addElement('button', 'primary-btn', 'SELECT');
    selectBtn.addEventListener('click', () => console.log('select'));
    const removeBtn = addElement('button', 'primary-btn', 'REMOVE');
    removeBtn.addEventListener('click', () => console.log('remove'));
    const header = addElement('h2', 'garage-header', this.item.name);
    carMainBtnsWrapper.append(selectBtn, removeBtn, header);
    const trackCar = addElement('div', 'car-track');
    const carAdditBtnsWrapper = addElement('div', 'car-btn-wrapper');
    const goBtn = addElement('button', 'main-btn', 'A');
    goBtn.addEventListener('click', () => console.log('go'));
    const stopBtn = addElement('button', 'primary-btn', 'B');
    stopBtn.addEventListener('click', () => console.log('stop'));
    const car = addElement('div', 'car');
    car.innerHTML = addCarImage(this.item.color);

    const flag = addElement('div', 'flag');
    carAdditBtnsWrapper.append(goBtn, stopBtn, car);
    trackCar.append(carAdditBtnsWrapper, flag);
    carContainer.append(carMainBtnsWrapper, trackCar);
    this.container.append(carContainer);
  }
}
