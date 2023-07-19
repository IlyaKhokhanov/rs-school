import RequestPath from '../../utils/enum';
import {
  addElement,
  getRandomColor,
  getRandomNumber,
  request,
} from '../../utils/utils';
import GarageList from '../garageList/garageList';
import dataCars from '../../data/data.json';
import './garage.scss';
import { CarItem } from '../../utils/types';

export default class Garage {
  private containerList = addElement('div', 'garage');

  private updateWrapper = addElement('div', 'settings-update');

  private garageList: GarageList | null = null;

  constructor(private container: HTMLElement) {
    this.initGarage();
  }

  private initGarage(): void {
    this.container.innerHTML = '';
    this.initSettingsGarage();
    this.initButtonsGarage();
    this.garageList = new GarageList(
      this.containerList,
      this.removeCar.bind(this),
      this.selectCar.bind(this),
    );
    this.container.append(this.containerList);
  }

  private initSettingsGarage(): void {
    const settings = addElement('div', 'settings');
    const createWrapper = addElement('div', 'settings-create');
    const createInput = addElement('input', 'settings-create-input');
    createInput.setAttribute('type', 'text');
    const createColor = addElement('input', 'settings-create-color');
    createColor.setAttribute('type', 'color');
    createColor.setAttribute('value', '#ffffff');
    const createBtn = addElement(
      'button',
      ['primary-btn', 'settings-create-btn'],
      'CREATE',
    );
    createBtn.addEventListener('click', (e) => this.createCar(e));

    this.updateWrapper = addElement('div', 'settings-update');
    const updateInput = addElement('input', 'settings-update-input');
    updateInput.setAttribute('type', 'text');
    const updateColor = addElement('input', 'settings-update-color');
    updateColor.setAttribute('type', 'color');
    updateColor.setAttribute('value', '#ffffff');
    const updateBtn = addElement(
      'button',
      ['primary-btn', 'settings-update-btn'],
      'UPDATE',
    );
    updateBtn.addEventListener('click', (e) => this.updateCar(e));

    createWrapper.append(createInput, createColor, createBtn);
    this.updateWrapper.append(updateInput, updateColor, updateBtn);
    settings.append(createWrapper, this.updateWrapper);
    this.container.append(settings);
  }

  private initButtonsGarage(): void {
    const buttons = addElement('div', 'buttons-wrapper');

    const raceBtn = addElement('button', ['main-btn', 'garage-btn'], 'RACE');
    raceBtn.addEventListener('click', () => this.startRace());

    const resetBtn = addElement('button', ['main-btn', 'garage-btn'], 'RESET');
    resetBtn.addEventListener('click', () => this.resetRace());

    const generateBtn = addElement(
      'button',
      ['primary-btn', 'garage-btn'],
      'GENERATE CARS',
    );
    generateBtn.addEventListener('click', () => this.generateCars());

    buttons.append(raceBtn, resetBtn, generateBtn);
    this.container.append(buttons);
  }

  private createCar(event: MouseEvent): void {
    const { target } = event;
    if (target) {
      const parent = (<HTMLElement>target).parentElement;
      if (parent) {
        const [name, color] = parent.children;
        const car = {
          name: (<HTMLInputElement>name).value,
          color: (<HTMLInputElement>color).value,
        };
        request(`${RequestPath.address}${RequestPath.getCars}`, {
          method: 'POST',
          headers: new Headers({ 'content-type': 'application/json' }),
          body: JSON.stringify(car),
        })
          .then(() => this.initGarage())
          .catch((err) => console.error(err));
      }
    }
  }

  private generateCars(): void {
    for (let i = 0; i < 100; i += 1) {
      const car = {
        name: `${dataCars.brands[getRandomNumber(dataCars.brands.length - 1)]} ${
          dataCars.models[getRandomNumber(dataCars.models.length - 1)]
        } `,
        color: getRandomColor(),
      };
      request(`${RequestPath.address}${RequestPath.getCars}`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(car),
      }).catch((err) => console.error(err));
    }
    setTimeout(() => this.initGarage(), 400);
  }

  private removeCar(id: string): void {
    request(`${RequestPath.address}${RequestPath.getCars}/${id}`, {
      method: 'DELETE',
    })
      .then(() => this.initGarage())
      .catch((err) => console.error(err));
    request(`${RequestPath.address}${RequestPath.getWinners}/${id}`, {
      method: 'DELETE',
    }).catch((err) => console.error(err));
  }

  private selectCar(id: string): void {
    this.updateWrapper.dataset.id = id;
    request<CarItem>(`${RequestPath.address}${RequestPath.getCars}/${id}`)
      .then((dataCar) => {
        const [name, color] = this.updateWrapper.children;
        (<HTMLInputElement>name).value = dataCar.name;
        (<HTMLInputElement>color).value = dataCar.color;
      })
      .catch((err) => console.error(err));
  }

  private updateCar(event: MouseEvent): void {
    const { target } = event;
    if (target) {
      const parent = (<HTMLElement>target).parentElement;
      const id = parent?.dataset.id;
      if (id && parent) {
        const [name, color] = parent.children;
        const car = {
          name: (<HTMLInputElement>name).value,
          color: (<HTMLInputElement>color).value,
        };
        request(`${RequestPath.address}${RequestPath.getCars}/${id}`, {
          method: 'PUT',
          headers: new Headers({ 'content-type': 'application/json' }),
          body: JSON.stringify(car),
        })
          .then(() => this.initGarage())
          .catch((err) => console.error(err));
      }
    }
  }

  private startRace() {
    this.garageList?.cars.forEach((car) => car.startEngine());
  }

  private resetRace() {
    this.garageList?.cars.forEach((car) => car.stopEngine());
  }
}
