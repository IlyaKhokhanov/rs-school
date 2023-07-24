import RequestPath from '../../utils/enum';
import { CarItem, ICarsRequest } from '../../utils/types';
import { addElement, requestWithHeader } from '../../utils/utils';
import Car from '../car/car';
import './garageList.scss';

const carsOnPage = 7;

export default class GarageList {
  private currentPage = Number(localStorage.getItem('pageGarageKH')) || 1;

  public cars: Car[] | [] = [];

  constructor(
    private container: HTMLElement,
    private callbackRemove: (id: string) => void,
    private callbackSelect: (id: string) => void,
    private callbackWinner: (id: number, time: number) => void,
  ) {
    this.requestGarage();
  }

  private initGarageList(data: ICarsRequest): void {
    if (this.currentPage > Math.ceil(Number(data.header) / carsOnPage)) {
      this.currentPage = Math.ceil(Number(data.header) / carsOnPage);
      localStorage.setItem('pageGarageKH', String(this.currentPage));
      this.requestGarage();
    }
    this.container.innerHTML = '';
    const header = addElement('h1', 'garage-header', `Garage (${data.header})`);
    const pageCount = addElement('h2', 'garage-page', `Page #${this.currentPage}`);

    const garageList = addElement('div', 'garage-list');
    data.data.then((arr) => {
      this.cars = arr.map((item) => (
        new Car(garageList, item, this.callbackRemove, this.callbackSelect, this.callbackWinner)));
    });

    const buttons = addElement('div', 'garage-buttons-wrapper');
    const prevBtn = addElement('button', 'main-btn', 'prev');
    if (this.currentPage < 2) prevBtn.setAttribute('disabled', 'true');
    prevBtn.addEventListener('click', () => this.changePage('prev'));

    const nextBtn = addElement('button', 'main-btn', 'next');
    if (this.currentPage === Math.ceil(Number(data.header) / carsOnPage)) nextBtn.setAttribute('disabled', 'true');
    nextBtn.addEventListener('click', () => this.changePage('next'));

    buttons.append(prevBtn, nextBtn);
    this.container.append(header, pageCount, garageList, buttons);
  }

  private changePage(page: string): void {
    if (page === 'prev') {
      this.currentPage -= 1;
    } else if (page === 'next') {
      this.currentPage += 1;
    }
    localStorage.setItem('pageGarageKH', String(this.currentPage));
    this.requestGarage();
  }

  private requestGarage(): void {
    requestWithHeader<CarItem[]>(
      `${RequestPath.address}${RequestPath.getCars}?_limit=${carsOnPage}&_page=${this.currentPage}`,
    )
      .then((data) => {
        if (typeof data.data !== 'string') {
          this.initGarageList(data);
        }
      })
      .catch((err) => console.error(err));
  }
}
