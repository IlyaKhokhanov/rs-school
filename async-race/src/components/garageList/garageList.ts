import RequestPath from '../../utils/enum';
import { ICarsRequest } from '../../utils/types';
import { addElement, requestWithHeader } from '../../utils/utils';
import Car from '../car/car';
import './garageList.scss';

export default class GarageList {
  private currentPage = Number(localStorage.getItem('pageGarageKH')) || 1;

  public cars: Car[] | [] = [];

  constructor(
    private container: HTMLElement,
    private callbackRemove: (id: string) => void,
    private callbackSelect: (id: string) => void,
    private callbackWinner: (id: number, time: number) => void,
  ) {
    requestWithHeader(
      `${RequestPath.address}${RequestPath.getCars}?_limit=7&_page=${this.currentPage}`,
    )
      .then((data: ICarsRequest) => this.initGarageList(data))
      .catch((err) => console.error(err));
  }

  private initGarageList(data: ICarsRequest): void {
    if (this.currentPage > Math.ceil(Number(data.header) / 7)) {
      this.currentPage = Math.ceil(Number(data.header) / 7);
      localStorage.setItem('pageGarageKH', String(this.currentPage));
      requestWithHeader(
        `${RequestPath.address}${RequestPath.getCars}?_limit=7&_page=${this.currentPage}`,
      )
        .then((dataCorrect: ICarsRequest) => this.initGarageList(dataCorrect))
        .catch((err) => console.error(err));
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
    if (this.currentPage === Math.ceil(Number(data.header) / 7)) nextBtn.setAttribute('disabled', 'true');
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
    requestWithHeader(
      `${RequestPath.address}${RequestPath.getCars}?_limit=7&_page=${this.currentPage}`,
    )
      .then((data: ICarsRequest) => this.initGarageList(data))
      .catch((err) => console.error(err));
  }
}
