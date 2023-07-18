import { CarItem } from '../../utils/types';
import { addCarImage, addElement } from '../../utils/utils';
import './car.scss';

export default class Car {
  constructor(
    private container: HTMLElement,
    private item: CarItem,
    private callbackRemove: (id: string) => void,
    private callbackSelect: (id: string) => void,
  ) {
    this.initCar();
  }

  initCar() {
    const carContainer = addElement('div', 'car-container');
    carContainer.dataset.id = String(this.item.id);
    const carMainBtnsWrapper = addElement('div', 'car-btn-wrapper');
    const selectBtn = addElement('button', 'primary-btn', 'SELECT');
    selectBtn.addEventListener('click', (e) => this.selectCar(e));
    const removeBtn = addElement('button', 'primary-btn', 'REMOVE');
    removeBtn.addEventListener('click', (e) => this.removeCar(e));
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

  removeCar(event: MouseEvent) {
    const { target } = event;
    if (target) {
      const elemWithId = (<HTMLElement>target).closest('[data-id]');
      const { id } = (<HTMLElement>elemWithId).dataset;
      if (id) {
        this.callbackRemove(id);
      }
    }
  }

  selectCar(event: MouseEvent) {
    const { target } = event;
    if (target) {
      const elemWithId = (<HTMLElement>target).closest('[data-id]');
      const { id } = (<HTMLElement>elemWithId).dataset;
      if (id) {
        this.callbackSelect(id);
      }
    }
  }
}
