import RequestInfo from '../../utils/enum';
import { addElement, requestGarage } from '../../utils/utils';
import GarageList from '../garageList/garageList';
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
    requestGarage(`${RequestInfo.address}${RequestInfo.getCars}`).then((data) => new GarageList(this.containerList, data));
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
    createBtn.addEventListener('click', () => console.log('create'));

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
    generateBtn.addEventListener('click', () => console.log('ganerate'));

    buttons.append(raceBtn, resetBtn, generateBtn);
    this.container.append(buttons);
  }
}
