import RequestPath from '../../utils/enum';
import { CarItem, IWinnersRequest, WinnerItem } from '../../utils/types';
import {
  addCarImage,
  addElement,
  request,
  requestWithHeader,
} from '../../utils/utils';
import './winners.scss';

export default class Winners {
  private currentPage = 1;

  private sort = localStorage.getItem('sortKH') || 'id';

  private order = localStorage.getItem('orderKH') || 'ASC';

  constructor(private container: HTMLElement) {
    this.requestWinners();
  }

  private initWinners(data: IWinnersRequest): void {
    this.container.innerHTML = '';
    const header = addElement('h1', 'winners-header', `Winners (${data.header})`);
    const pageCount = addElement('h2', 'winners-page', `Page #${this.currentPage}`);
    const table = addElement('table', 'winners-table');
    const tableBody = addElement('tbody');
    const tableHeaderRow = addElement('tr', 'winners-header-row');
    this.addHeaderToTable(tableHeaderRow);
    tableBody.append(tableHeaderRow);
    data.data.then((arr) => arr.forEach((item, indx) => (
      tableBody.append(this.addCarToTable(item, indx))
    )));
    table.append(tableBody);
    const buttons = addElement('div', 'winners-buttons-wrapper');
    const prevBtn = addElement('button', 'main-btn', 'prev');
    if (this.currentPage < 2) prevBtn.setAttribute('disabled', 'true');
    prevBtn.addEventListener('click', () => this.changePage('prev'));
    const nextBtn = addElement('button', 'main-btn', 'next');
    if (this.currentPage === Math.ceil(Number(data.header) / 10) || data.header === '0') nextBtn.setAttribute('disabled', 'true');
    nextBtn.addEventListener('click', () => this.changePage('next'));
    buttons.append(prevBtn, nextBtn);
    this.container.append(header, pageCount, table, buttons);
  }

  private addHeaderToTable(row: HTMLElement):void {
    const tableHeaderNumber = addElement('th', 'winners-cell', '№');
    const tableHeaderCar = addElement('th', 'winners-cell', 'Car');
    const tableHeaderName = addElement('th', 'winners-cell', 'Name');
    const tableHeaderWins = addElement('th', ['winners-cell', 'cell-clickable']);
    const winsWrapper = addElement('div', 'cell-wrapper');
    const winsSpan = addElement('span', 'cell-span', 'Wins');
    winsWrapper.append(winsSpan);
    tableHeaderWins.append(winsWrapper);
    tableHeaderWins.addEventListener('click', () => this.addSort('wins'));
    const tableHeaderTime = addElement('th', ['winners-cell', 'cell-clickable']);
    const timeWrapper = addElement('div', 'cell-wrapper');
    const timeSpan = addElement('span', 'cell-span', 'Best Time (sec)');
    timeWrapper.append(timeSpan);
    tableHeaderTime.append(timeWrapper);
    tableHeaderTime.addEventListener('click', () => this.addSort('time'));
    if (this.sort === 'time') {
      const arrow = document.createElement('img');
      arrow.src = `./img/arr-${this.order === 'ASC' ? 'down' : 'up'}.png`;
      timeWrapper.append(arrow);
    } else if (this.sort === 'wins') {
      const arrow = document.createElement('img');
      arrow.src = `./img/arr-${this.order === 'ASC' ? 'down' : 'up'}.png`;
      winsWrapper.append(arrow);
    }
    row.append(
      tableHeaderNumber,
      tableHeaderCar,
      tableHeaderName,
      tableHeaderWins,
      tableHeaderTime,
    );
  }

  private addCarToTable(item: WinnerItem, indx: number): HTMLElement {
    const tableRow = addElement('tr', 'winners-row');
    const tableCellNumber = addElement(
      'td',
      'winners-cell',
      String(this.currentPage * 10 + indx - 9),
    );
    tableRow.append(tableCellNumber);
    request<CarItem>(`${RequestPath.address}${RequestPath.getCars}/${item.id}`)
      .then((dataCar) => {
        const tableCellCar = addElement('td', 'winners-cell');
        tableCellCar.innerHTML = addCarImage(dataCar.color);
        const tableCellName = addElement('td', 'winners-cell', dataCar.name);
        const tableCellWins = addElement('td', 'winners-cell', String(item.wins));
        const tableCellTime = addElement('td', 'winners-cell', String(item.time));

        tableRow.append(
          tableCellCar,
          tableCellName,
          tableCellWins,
          tableCellTime,
        );
      })
      .catch((err) => console.error(err));

    return tableRow;
  }

  private changePage(page: string): void {
    if (page === 'prev') {
      this.currentPage -= 1;
    } else if (page === 'next') {
      this.currentPage += 1;
    }
    this.requestWinners();
  }

  private requestWinners(): void {
    requestWithHeader<WinnerItem[]>(
      `${RequestPath.address}${RequestPath.getWinners}?_limit=10&_page=${this.currentPage}&_sort=${this.sort}&_order=${this.order}`,
    ).then((data) => this.initWinners(data));
  }

  private addSort(value: string): void {
    this.sort = value;
    this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
    localStorage.setItem('sortKH', this.sort);
    localStorage.setItem('orderKH', this.order);
    this.requestWinners();
  }
}
