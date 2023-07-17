import RequestPath from '../../utils/enum';
import {
  addElement,
  getRandomColor,
  getRandomNumber,
  requestGarage,
} from '../../utils/utils';
import GarageList from '../garageList/garageList';
import dataCars from '../../data/data.json';
import './garage.scss';

export default class Garage {
  private containerList = addElement('div', 'garage');

  constructor(private container: HTMLElement) {
    this.initGarage();
  }

  initGarage() {
    this.container.innerHTML = '';
    this.initSettingsGarage();
    this.initButtonsGarage();
    requestGarage(`${RequestPath.address}${RequestPath.getCars}`)
      .then(
        (data) =>
          new GarageList(this.containerList, data, this.removeCar.bind(this))
      )
      .catch((err) => console.error(err));
    this.container.append(this.containerList);
  }

  initSettingsGarage() {
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
      'CREATE'
    );
    createBtn.addEventListener('click', (e) => this.createCar(e));

    const updateWrapper = addElement('div', 'settings-update');
    const updateInput = addElement('input', 'settings-update-input');
    updateInput.setAttribute('type', 'text');
    const updateColor = addElement('input', 'settings-update-color');
    updateColor.setAttribute('type', 'color');
    updateColor.setAttribute('value', '#ffffff');
    const updateBtn = addElement(
      'button',
      ['primary-btn', 'settings-update-btn'],
      'UPDATE'
    );
    updateBtn.addEventListener('click', () => console.log('update'));

    createWrapper.append(createInput, createColor, createBtn);
    updateWrapper.append(updateInput, updateColor, updateBtn);
    settings.append(createWrapper, updateWrapper);
    this.container.append(settings);
  }

  initButtonsGarage() {
    const buttons = addElement('div', 'buttons-wrapper');

    const raceBtn = addElement('button', ['main-btn', 'garage-btn'], 'RACE');
    raceBtn.addEventListener('click', () => console.log('race'));

    const resetBtn = addElement('button', ['main-btn', 'garage-btn'], 'RESET');
    resetBtn.addEventListener('click', () => console.log('reset'));

    const generateBtn = addElement(
      'button',
      ['primary-btn', 'garage-btn'],
      'GENERATE CARS'
    );
    generateBtn.addEventListener('click', () => this.generateCars());

    buttons.append(raceBtn, resetBtn, generateBtn);
    this.container.append(buttons);
  }

  createCar(event: MouseEvent): void {
    const { target } = event;
    if (target) {
      const parent = (<HTMLElement>target).parentElement;
      if (parent) {
        const [name, color] = parent.children;
        const car = {
          name: (<HTMLInputElement>name).value,
          color: (<HTMLInputElement>color).value,
        };
        requestGarage(`${RequestPath.address}${RequestPath.getCars}`, {
          method: 'POST',
          headers: new Headers({ 'content-type': 'application/json' }),
          body: JSON.stringify(car),
        })
          .then(() => this.initGarage())
          .catch((err) => console.error(err));
      }
    }
  }

  generateCars(): void {
    for (let i = 0; i < 100; i += 1) {
      const car = {
        name: `${dataCars.brands[getRandomNumber(dataCars.brands.length)]} ${
          dataCars.models[getRandomNumber(dataCars.models.length)]
        } `,
        color: getRandomColor(),
      };
      requestGarage(`${RequestPath.address}${RequestPath.getCars}`, {
        method: 'POST',
        headers: new Headers({ 'content-type': 'application/json' }),
        body: JSON.stringify(car),
      }).catch((err) => console.error(err));
    }
    setTimeout(() => this.initGarage(), 400);
  }

  removeCar(id: string): void {
    requestGarage(`${RequestPath.address}${RequestPath.getCars}/${id}`, {
      method: 'DELETE',
    })
      .then(() => this.initGarage())
      .catch((err) => console.error(err));
    requestGarage(`${RequestPath.address}${RequestPath.getWinners}/${id}`, {
      method: 'DELETE',
    }).catch((err) => console.error(err));
  }

  updateCar(event: MouseEvent): void {
    const { target } = event;
    if (target) {
      const parent = (<HTMLElement>target).parentElement;
      if (parent) {
        const [name, color] = parent.children;
        const car = {
          name: (<HTMLInputElement>name).value,
          color: (<HTMLInputElement>color).value,
        };
        requestGarage(`${RequestPath.address}${RequestPath.getCars}`, {
          method: 'POST',
          headers: new Headers({ 'content-type': 'application/json' }),
          body: JSON.stringify(car),
        })
          .then(() => this.initGarage())
          .catch((err) => console.error(err));
      }
    }
  }
}
