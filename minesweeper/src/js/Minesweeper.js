import Board from './Board';
import { addElement } from './utilits';

export default class Minesweeper {
  connainer = null;
  lengthBoard = 10;
  timer = 0;
  timerWorks = null;
  bombs = 10;
  steps = 0;
  flags = 0;
  sound = true;

  constructor(container) {
    this.container = container;

    this.minesweeperElement = addElement('div', 'minesweeper');
    this.container.append(this.minesweeperElement);

    this.createSettings();
  }

  createSettings() {
    this.minesweeperElement.innerHTML = '';

    const header = addElement('h2', 'header');
    header.textContent = 'Minesweeper';

    const text = addElement('div', 'description');
    text.textContent = 'To set a flag, click right mouse button';

    const settBlock = addElement('div', 'settings');
    const settMainWrap = addElement('div', 'settings__main');

    const settLevel = addElement('select', 'settings__level');
    const option1 = addElement('option', 'settings__option');
    option1.textContent = 'Easy';
    option1.setAttribute('value', '10');
    const option2 = addElement('option', 'settings__option');
    option2.textContent = 'Medium';
    option2.setAttribute('value', '15');
    const option3 = addElement('option', 'settings__option');
    option3.textContent = 'Hard';
    option3.setAttribute('value', '25');

    if (this.lengthBoard === 10) {
      option1.setAttribute('selected', 'true');
    } else if (this.lengthBoard === 15) {
      option2.setAttribute('selected', 'true');
    } else if (this.lengthBoard === 25) {
      option3.setAttribute('selected', 'true');
    }

    settLevel.addEventListener('change', (e) => {
      this.lengthBoard = +e.target.value;
    });

    settLevel.append(option1, option2, option3);

    const settBombs = addElement('div', 'settings__bombs-wrap');
    const settBombsCount = addElement('input', 'settings__bombs');
    settBombsCount.setAttribute('type', 'number');
    settBombsCount.setAttribute('min', '10');
    settBombsCount.setAttribute('max', '99');
    settBombsCount.setAttribute('value', this.bombs);
    settBombsCount.addEventListener('change', (e) => {
      if (+e.target.value > 9) {
        this.bombs = +e.target.value;
      }
    });
    const settBombsImg = addElement('div', 'settings__bombs-img');
    settBombsImg.textContent = '💣';

    settBombs.append(settBombsCount, settBombsImg);

    const settAdditWrap = addElement('div', 'settings__addit');

    const settRecords = addElement('div', 'settings__records');
    settRecords.textContent = '📊';
    settRecords.addEventListener('click', () => this.openModal('records'));

    const settSound = addElement('div', 'settings__sound');
    settSound.textContent = '🔊';
    settSound.addEventListener('click', (e) => this.controlSound(e));

    const settTheme = addElement('div', 'settings__theme');
    settTheme.textContent = '🌑';
    settTheme.addEventListener('click', (e) => this.changeTheme(e));

    const infoBlock = addElement('div', 'info');

    this.infoBombs = addElement('div', 'info__bombs');
    this.infoBombs.textContent = `🚩${this.bombs - this.flags}`;

    const infoButton = addElement('div', 'info__button');
    infoButton.textContent = 'Start game';
    infoButton.addEventListener('click', () => this.startNewGame());

    this.infoTime = addElement('div', 'info__time');
    this.infoTime.textContent = '000';

    settMainWrap.append(settLevel, settBombs);
    settAdditWrap.append(settRecords, settSound, settTheme);
    settBlock.append(settMainWrap, settAdditWrap);

    infoBlock.append(this.infoBombs, infoButton, this.infoTime);

    this.minesweeperElement.append(header, text, settBlock, infoBlock);

    this.board = new Board(this, this.container, this.lengthBoard, this.bombs);
  }

  openModal(value) {
    const overlay = addElement('div', 'overlay');
    overlay.addEventListener('click', (e) => {
      if (e.target.classList.contains('overlay')) {
        this.startNewGame();
      }
    });

    const modal = addElement('div', 'modal');
    const btnClose = addElement('div', 'modal__btn-close');
    btnClose.textContent = '×';
    btnClose.addEventListener('click', () => this.startNewGame());

    const content = addElement('div', 'modal__content');
    if (value === 'win') {
      content.classList.add('modal-info');
      content.textContent = `Hooray! You found all mines in ${this.timer} seconds and ${this.steps} moves!`;
    } else if (value === 'defeat') {
      content.classList.add('modal-info');
      content.textContent = 'Game over. Try again';
    } else if (value === 'records') {
      content.classList.add('modal-info');
      content.textContent = 'Records';
    }

    const btnStart = addElement('div', 'modal__btn-start');
    btnStart.textContent = 'Start new game';
    btnStart.addEventListener('click', () => this.startNewGame());

    modal.append(btnClose, content, btnStart);
    overlay.append(modal);
    this.minesweeperElement.append(overlay);
  }

  changeTheme(e) {
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');
      this.container.classList.remove('dark');
    } else {
      e.target.classList.add('active');
      this.container.classList.add('dark');
    }
  }

  controlSound(e) {
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');
      this.sound = true;
    } else {
      e.target.classList.add('active');
      this.sound = false;
    }
  }

  startNewGame() {
    this.board.boardElement.remove();
    this.board = null;
    this.timer = 0;
    this.steps = 0;
    this.stopTimer(this.timerWorks);
    this.createSettings();
  }

  startTimer() {
    const activeTimer = () => {
      this.timer += 1;
      if (this.timer < 10) {
        this.infoTime.textContent = `00${this.timer}`;
      } else if (this.timer < 100) {
        this.infoTime.textContent = `0${this.timer}`;
      } else {
        this.infoTime.textContent = this.timer;
      }

      if (this.timer > 600) {
        this.board.isLost = true;
        this.stopTimer();
        this.openModal('defeat');
      }
    };

    clearInterval();
    this.timerWorks = setInterval(activeTimer, 1000);
  }

  stopTimer() {
    clearInterval(this.timerWorks);
  }
}
