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

  constructor(private container: HTMLElement) {
    requestWithHeader(
      `${RequestPath.address}${RequestPath.getWinners}?_limit=10&_page=${this.currentPage}`,
    )
      .then((data: IWinnersRequest) => this.initWinners(data))
      .catch((err) => console.error(err));
  }

  initWinners(data: IWinnersRequest) {
    this.container.innerHTML = '';
    const header = addElement('h1', 'winners-header', `Winners (${data.header})`);
    const pageCount = addElement('h2', 'winners-page', `Page #${this.currentPage}`);
    const table = addElement('table', 'winners-table');
    const tableBody = addElement('tbody');
    const tableHeaderRow = addElement('tr', 'winners-table-header-row');
    const tableHeaderNumber = addElement('th', 'winners-table-cell', '№');
    const tableHeaderCar = addElement('th', 'winners-table-cell', 'Car');
    const tableHeaderName = addElement('th', 'winners-table-cell', 'Name');
    const tableHeaderWins = addElement('th', 'winners-table-cell', 'Wins');
    const tableHeaderTime = addElement('th', 'winners-table-cell', 'Best Time (sec)');
    tableHeaderRow.append(
      tableHeaderNumber,
      tableHeaderCar,
      tableHeaderName,
      tableHeaderWins,
      tableHeaderTime,
    );
    tableBody.append(tableHeaderRow);
    data.data.then((arr) => arr.forEach((item, indx) => (
      tableBody.append(Winners.addCarToTable(item, indx))
    )));
    table.append(tableBody);
    const buttons = addElement('div', 'winners-buttons-wrapper');
    const prevBtn = addElement('button', 'main-btn', 'prev');
    if (this.currentPage < 2) prevBtn.setAttribute('disabled', 'true');
    prevBtn.addEventListener('click', () => this.changePage('prev'));
    const nextBtn = addElement('button', 'main-btn', 'next');
    if (this.currentPage === Math.ceil(Number(data.header) / 10)) nextBtn.setAttribute('disabled', 'true');
    nextBtn.addEventListener('click', () => this.changePage('next'));
    buttons.append(prevBtn, nextBtn);
    this.container.append(header, pageCount, table, buttons);
  }

  static addCarToTable(item: WinnerItem, indx: number): HTMLElement {
    const tableRow = addElement('tr', 'winners-table-row');
    const tableCellNumber = addElement(
      'td',
      'winners-table-cell',
      String(indx + 1),
    );
    tableRow.append(tableCellNumber);
    request(`${RequestPath.address}${RequestPath.getCars}/${item.id}`)
      .then((dataCar: CarItem) => {
        const tableCellCar = addElement('td', 'winners-table-cell');
        tableCellCar.innerHTML = addCarImage(dataCar.color);
        const tableCellName = addElement('td', 'winners-table-cell', dataCar.name);
        const tableCellWins = addElement('td', 'winners-table-cell', String(item.wins));
        const tableCellTime = addElement('td', 'winners-table-cell', String(item.time));

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

  changePage(page: string): void {
    if (page === 'prev') {
      this.currentPage -= 1;
    } else if (page === 'next') {
      this.currentPage += 1;
    }
    requestWithHeader(
      `${RequestPath.address}${RequestPath.getWinners}?_limit=10&_page=${this.currentPage}`,
    ).then((data: IWinnersRequest) => this.initWinners(data));
  }
}
