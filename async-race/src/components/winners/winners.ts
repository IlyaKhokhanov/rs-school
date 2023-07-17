import RequestPath from '../../utils/enum';
import { CarItem, WinnerItem } from '../../utils/types';
import { addCarImage, addElement, requestGarage } from '../../utils/utils';
import './winners.scss';

export default class Winners {
  constructor(private container: HTMLElement) {
    requestGarage(`${RequestPath.address}${RequestPath.getWinners}`).then(
      (data: WinnerItem[]) => this.initWinners(data)
    );
  }

  initWinners(data: WinnerItem[]) {
    this.container.innerHTML = '';
    const header = addElement(
      'h1',
      'winners-header',
      `Winners (${data.length})`
    );
    const pageCount = addElement('h2', 'winners-page', `Page #${1}`);
    const table = addElement('table', 'winners-table');
    const tableBody = addElement('tbody');
    const tableHeaderRow = addElement('tr', 'winners-table-header-row');
    const tableHeaderNumber = addElement('th', 'winners-table-cell', '№');
    const tableHeaderCar = addElement('th', 'winners-table-cell', 'Car');
    const tableHeaderName = addElement('th', 'winners-table-cell', 'Name');
    const tableHeaderWins = addElement('th', 'winners-table-cell', 'Wins');
    const tableHeaderTime = addElement(
      'th',
      'winners-table-cell',
      'Best Time (sec)'
    );
    tableHeaderRow.append(
      tableHeaderNumber,
      tableHeaderCar,
      tableHeaderName,
      tableHeaderWins,
      tableHeaderTime
    );
    tableBody.append(tableHeaderRow);
    data.forEach((item, indx) =>
      tableBody.append(Winners.addCarToTable(item, indx))
    );
    table.append(tableBody);
    const buttons = addElement('div', 'winners-buttons-wrapper');
    const prevBtn = addElement('button', ['main-btn', 'winners-btn'], 'prev');
    prevBtn.addEventListener('click', () => console.log('prev'));
    const nextBtn = addElement('button', ['main-btn', 'winners-btn'], 'next');
    nextBtn.addEventListener('click', () => console.log('next'));
    buttons.append(prevBtn, nextBtn);
    this.container.append(header, pageCount, table, buttons);
  }

  static addCarToTable(item: WinnerItem, indx: number): HTMLElement {
    const tableRow = addElement('tr', 'winners-table-row');
    const tableCellNumber = addElement(
      'td',
      'winners-table-cell',
      String(indx + 1)
    );
    tableRow.append(tableCellNumber);
    requestGarage(`${RequestPath.address}${RequestPath.getCars}/${item.id}`)
      .then((dataCar: CarItem) => {
        const tableCellCar = addElement('td', 'winners-table-cell');
        tableCellCar.innerHTML = addCarImage(dataCar.color);
        const tableCellName = addElement(
          'td',
          'winners-table-cell',
          dataCar.name
        );
        const tableCellWins = addElement(
          'td',
          'winners-table-cell',
          String(item.wins)
        );
        const tableCellTime = addElement(
          'td',
          'winners-table-cell',
          String(item.time)
        );

        tableRow.append(
          tableCellCar,
          tableCellName,
          tableCellWins,
          tableCellTime
        );
      })
      .catch((err) => console.error(err));

    return tableRow;
  }
}
