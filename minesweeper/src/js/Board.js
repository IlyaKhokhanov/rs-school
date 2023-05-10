import Cell from './Cell';
import { addElement, getRandom } from './utilits';

export default class Board {
  matrix = [];

  isFirstClick = true;

  constructor(container, length) {
    this.container = container;
    this.length = length;
    const boardElement = addElement('div', 'board');
    this.container.append(boardElement);

    this.addMatrix(length);
    this.addCells(boardElement);
  }

  addMatrix(length) {
    for (let y = 0; y < length; y += 1) {
      const row = [];
      for (let x = 0; x < length; x += 1) {
        row.push(new Cell(this, x, y));
      }
      this.matrix.push(row);
    }
  }

  addCells(boardElement) {
    this.matrix.forEach((arr) => {
      arr.forEach((elem) => {
        const cellElement = addElement('div', 'cell');
        cellElement.textContent = '';
        cellElement.addEventListener('click', () => {
          this.addBombs(elem.x, elem.y);
        });
        boardElement.append(cellElement);
      });
    });
  }

  addBombs(x, y) {
    let totalBombs = this.length;

    while (totalBombs) {
      const randomX = getRandom(this.length - 1);
      const randomY = getRandom(this.length - 1);

      if (
        x !== randomX &&
        x - 1 !== randomX &&
        x + 1 !== randomX &&
        y !== randomY &&
        y - 1 !== randomY &&
        y + 1 !== randomY
      ) {
        this.matrix[randomY][randomX].value = true;
        totalBombs -= 1;
      }
    }
    console.log(this.matrix[y][x]);
  }
}
