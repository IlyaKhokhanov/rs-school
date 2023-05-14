import Cell from './Cell';
import { addElement, getRandom } from './utilits';
import { checkForPlaint, getNearbyCells } from './boardUtilits';
import {
  soundAK47, soundBomb, soundFlag, soundDefused,
} from './sounds';

const playAK47 = new Audio(soundAK47);
const playBomb = new Audio(soundBomb);
const playFlag = new Audio(soundFlag);
const playDefused = new Audio(soundDefused);

export default class Board {
  matrix = JSON.parse(localStorage.getItem('matrix')) || [];

  totalBombs = +localStorage.getItem('matrixBoms') || 10;

  isFirstClick = !localStorage.getItem('matrix');

  isLost = false;

  isWin = false;

  constructor(settings, container, length, totalBombs = 10) {
    this.settings = settings;
    this.container = container;
    this.length = length;
    this.totalBombs = totalBombs;

    this.boardElement = addElement('div', 'board');
    this.boardElement.setAttribute('data-board-cells', this.length);

    this.container.setAttribute('data-board-cells', this.length);

    this.container.append(this.boardElement);

    if (!localStorage.getItem('matrix')) {
      this.addMatrix(length);
      this.addCells();
    } else {
      this.mapMatrix();
      this.updateCells();
    }
  }

  addMatrix(length) {
    for (let y = 0; y < length; y += 1) {
      const row = [];
      for (let x = 0; x < length; x += 1) {
        row.push(new Cell(x, y));
      }
      this.matrix.push(row);
    }
  }

  addCells() {
    this.matrix.forEach((arr) => {
      arr.forEach((elem) => {
        const cellElement = addElement('div', 'cell');
        cellElement.textContent = '';
        cellElement.addEventListener('click', () => {
          this.clickHandler(elem.x, elem.y);
        });
        cellElement.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          this.addFlag(elem.x, elem.y);
        });
        this.boardElement.append(cellElement);
      });
    });
    this.checkCountFlags();
  }

  mapMatrix() {
    this.settings.startTimer();

    this.matrix = this.matrix.map((arr) => arr.map((elem) => (
      new Cell(elem.x, elem.y, elem.value, elem.isOpen, elem.isFlag))
    ))
  }

  updateCells() {
    this.boardElement.innerHTML = '';

    this.matrix.forEach((arr) => {
      arr.forEach((elem) => {
        const cellElement = addElement('div', 'cell');
        if (elem.isFlag) {
          cellElement.textContent = '🚩';
        }
        if (elem.isOpen) {
          if (!elem.value) {
            cellElement.textContent = '';
          } else if (elem.isFlag) {
            cellElement.textContent = '🚩';
          } else if (elem.value === true) {
            cellElement.textContent = '💥';
          } else if (elem.value > 0) {
            cellElement.textContent = elem.value;
          }
          cellElement.classList.add(`cell${elem.value}`);
        }
        cellElement.addEventListener('click', () => {
          this.clickHandler(elem.x, elem.y);
        });
        cellElement.addEventListener('contextmenu', (e) => {
          e.preventDefault();
          this.addFlag(elem.x, elem.y);
        });
        this.boardElement.append(cellElement);
      });
    });
    this.checkEndGame();
  }

  checkEndGame() {
    const arrOpened = [];

    this.matrix.forEach((arr, y) => {
      arr.forEach((cell, x) => {
        const elem = this.matrix[y][x];
        if (elem.value === true && elem.isOpen) {
          this.isLost = true;
        }
        if (elem.value !== true && elem.isOpen) {
          arrOpened.push(elem);
          if (
            arrOpened.length === this.length * this.length - this.totalBombs
          ) {
            this.isWin = true;
          }
        }
      });
    });

    if (this.isLost) {
      if (this.settings.sound) playBomb.play();
      this.settings.stopTimer();
      this.settings.openModal('defeat');
    }

    if (this.isWin) {
      if (this.settings.sound) playDefused.play();
      this.settings.stopTimer();
      this.settings.openModal('win');
    }

    if (!this.isLost && !this.isWin) {
      localStorage.setItem('matrix', JSON.stringify(this.matrix));
      localStorage.setItem('matrixBoms', this.totalBombs);
      localStorage.setItem('matrixSteps', this.settings.steps);
      localStorage.setItem('matrixFlags', this.settings.flags);
      localStorage.setItem('matrixTimer', this.settings.timer);
    } else {
      localStorage.removeItem('matrix');
      localStorage.removeItem('matrixBoms');
      localStorage.removeItem('matrixSteps');
      localStorage.removeItem('matrixFlags');
      localStorage.removeItem('matrixTimer');
    }
  }

  checkCountFlags() {
    const arrFlags = [];

    this.matrix.forEach((arr, y) => {
      arr.forEach((cell, x) => {
        const elem = this.matrix[y][x];
        if (elem.isFlag) {
          arrFlags.push(elem);
        }
      });
    });

    this.settings.flags = arrFlags.length;
    this.settings.infoBombs.textContent = `💣${
      this.totalBombs - this.settings.flags
    }`;
    this.settings.infoFlags.textContent = `🚩${this.settings.flags}`;
  }

  addBombs(x, y) {
    let countBombs = this.totalBombs;

    while (countBombs) {
      const randomX = getRandom(this.length - 1);
      const randomY = getRandom(this.length - 1);

      if (this.matrix[randomY][randomX]?.value !== true) {
        if ((this.totalBombs < 92 && this.length === 10) || this.length > 10) {
          if (checkForPlaint(this.matrix, x, y, randomX, randomY)) {
            this.matrix[randomY][randomX].value = true;
            countBombs -= 1;
          }
        } else if (this.matrix[y]?.[x] !== this.matrix[randomY]?.[randomX]) {
          this.matrix[randomY][randomX].value = true;
          countBombs -= 1;
        }
      }
    }
    this.addCellsValue();
  }

  clickEmptyCell(x, y) {
    getNearbyCells(this.matrix, x, y).forEach((cell) => {
      if (!cell || cell.isOpen || cell.value === true) return;

      if (cell.value === 0) {
        cell.open();
        this.clickEmptyCell(cell.x, cell.y);
      }
      if (cell.value > 0) {
        cell.open();
      }
    });
  }

  clickNumberCells(x, y) {
    const arrCells = getNearbyCells(this.matrix, x, y);
    const arrFlag = arrCells.filter((cell) => cell?.isFlag);
    if (this.matrix[y][x].value === arrFlag.length) {
      arrCells.forEach((cell) => {
        if (cell && cell.isFlag !== true) {
          cell.open();
          if (cell.value === 0) {
            cell.open();
            this.clickEmptyCell(cell.x, cell.y);
          }
        }
      });
    }
  }

  addFlag(x, y) {
    const elem = this.matrix[y][x];
    if (!elem.isOpen) {
      elem.isFlag = !elem.isFlag;
    }

    if (this.settings.sound) playFlag.play();

    this.settings.steps += 1;
    this.settings.infoSteps.textContent = `🐾${this.settings.steps}`;

    this.checkCountFlags();
    this.updateCells();
  }

  openBombs() {
    this.matrix.forEach((arr, y) => {
      arr.forEach((cell, x) => {
        if (this.matrix[y][x].value === true) {
          this.matrix[y][x].open();
        }
      });
    });
  }

  addCellsValue() {
    this.matrix.forEach((arr, y) => {
      arr.forEach((cell, x) => {
        const val1 = this.matrix[y - 1]?.[x - 1]?.value;
        const val2 = this.matrix[y - 1]?.[x]?.value;
        const val3 = this.matrix[y - 1]?.[x + 1]?.value;
        const val4 = this.matrix[y]?.[x - 1]?.value;
        const val5 = this.matrix[y]?.[x + 1]?.value;
        const val6 = this.matrix[y + 1]?.[x - 1]?.value;
        const val7 = this.matrix[y + 1]?.[x]?.value;
        const val8 = this.matrix[y + 1]?.[x + 1]?.value;

        const countBombs = [
          val1,
          val2,
          val3,
          val4,
          val5,
          val6,
          val7,
          val8,
        ].filter((el) => el === true).length;
        if (this.matrix[y][x].value !== true) {
          this.matrix[y][x].value = countBombs;
        }
      });
    });
  }

  clickHandler(x, y) {
    const elem = this.matrix[y][x];

    if (this.settings.setFlags) {
      this.addFlag(x, y);
      return;
    }

    if (this.isFirstClick) {
      this.addBombs(x, y);
      this.isFirstClick = false;
      this.settings.startTimer();
      if (this.settings.sound) playAK47.play();
      if (this.settings.sound) this.settings.playMainMenu.pause();

      this.settings.steps += 1;
      this.settings.infoSteps.textContent = `🐾${this.settings.steps}`;
    }

    if (!elem.isOpen && !elem.isFlag) {
      if (this.settings.sound) playAK47.play();

      elem.open();
      if (elem.value === 0) {
        this.clickEmptyCell(x, y);
        this.updateCells();
      }

      if (elem.value === true) {
        this.openBombs(x, y);
        this.updateCells();

        if (this.settings.sound) playBomb.play();
      }
    }

    if (elem.isOpen && elem.value > 0) {
      if (elem.value === true) return;
      this.clickNumberCells(x, y);
      this.updateCells();
      if (this.settings.sound) playAK47.play();
      if (!this.isLost && !this.isWin) {
        this.settings.steps += 1;
        this.settings.infoSteps.textContent = `🐾${this.settings.steps}`;
      }
    }
  }
}
