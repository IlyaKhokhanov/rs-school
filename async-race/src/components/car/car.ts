import RequestPath from '../../utils/enum';
import { CarItem, StartEngine } from '../../utils/types';
import { addCarImage, addElement, request } from '../../utils/utils';
import './car.scss';

export default class Car {
  private id: number;

  private car: HTMLElement = addElement('div', 'car');

  private goBtn: HTMLElement = addElement('button', 'main-btn', 'A');

  private stopBtn: HTMLElement = addElement('button', 'primary-btn', 'B');

  private idAnimation = 0;

  constructor(
    private container: HTMLElement,
    private item: CarItem,
    private callbackRemove: (id: string) => void,
    private callbackSelect: (id: string) => void,
    private callbackWinner: (id: number, time: number) => void,
  ) {
    this.id = this.item.id;
    this.initCar();
  }

  private initCar(): void {
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
    this.goBtn.addEventListener('click', () => this.startEngine());
    this.stopBtn.addEventListener('click', () => this.stopEngine());
    this.stopBtn.setAttribute('disabled', 'true');
    this.car.innerHTML = addCarImage(this.item.color);

    const flag = addElement('div', 'flag');
    carAdditBtnsWrapper.append(this.goBtn, this.stopBtn, this.car);
    trackCar.append(carAdditBtnsWrapper, flag);
    carContainer.append(carMainBtnsWrapper, trackCar);
    this.container.append(carContainer);
  }

  private removeCar(event: MouseEvent): void {
    const { target } = event;
    if (target) {
      const elemWithId = (<HTMLElement>target).closest('[data-id]');
      const { id } = (<HTMLElement>elemWithId).dataset;
      if (id) this.callbackRemove(id);
    }
  }

  private selectCar(event: MouseEvent): void {
    const { target } = event;
    if (target) {
      const elemWithId = (<HTMLElement>target).closest('[data-id]');
      const { id } = (<HTMLElement>elemWithId).dataset;
      if (id) this.callbackSelect(id);
    }
  }

  public startEngine(isRace?: boolean): void {
    this.goBtn.setAttribute('disabled', 'true');
    if (!isRace) this.stopBtn.removeAttribute('disabled');
    request<StartEngine>(
      `${RequestPath.address}${RequestPath.engine}?id=${this.id}&status=started`,
      { method: 'PATCH' },
    )
      .then((data) => {
        if (typeof data !== 'string') {
          this.animationCar(data.distance, data.velocity, isRace);
        }
        request<object>(
          `${RequestPath.address}${RequestPath.engine}?id=${this.id}&status=drive`,
          { method: 'PATCH' },
        )
          .then((dataDrive) => {
            if (typeof dataDrive === 'string') {
              cancelAnimationFrame(this.idAnimation);
            }
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  }

  public stopEngine(): void {
    this.stopBtn.setAttribute('disabled', 'true');
    this.goBtn.removeAttribute('disabled');
    request<StartEngine>(
      `${RequestPath.address}${RequestPath.engine}?id=${this.id}&status=stopped`,
      { method: 'PATCH' },
    )
      .then(() => {
        cancelAnimationFrame(this.idAnimation);
        this.car.style.transform = 'translateX(0px)';
      })
      .catch((err) => console.error(err));
  }

  private animationCar(
    distance: number,
    velocity: number,
    isRace?: boolean,
  ): void {
    const widthWindow = window.innerWidth - 190;
    const timeStart = new Date().getTime();
    const moveCar = () => {
      const timeNow = new Date().getTime();
      const curMove = (timeNow - timeStart) * (widthWindow / (distance / velocity));
      this.car.style.transform = `translateX(${curMove}px)`;
      if (curMove < widthWindow) {
        this.idAnimation = requestAnimationFrame(moveCar);
      } else if (isRace) {
        this.callbackWinner(this.id, distance / velocity / 1000);
      }
    };
    moveCar();
  }
}
