import Board from './Board';
import { addElement } from './utilits';

export default class Minesweeper {
  connainer = null;

  timer = 0;

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

    const settLevel = addElement('div', 'settings__level');
    settLevel.textContent = 'Medium'; // easy hard

    const settBombs = addElement('div', 'settings__bombs');
    settBombs.textContent = '10';

    const settAdditWrap = addElement('div', 'settings__addit');

    const settRecords = addElement('div', 'settings__records');
    settRecords.textContent = '📊';

    const settSound = addElement('div', 'settings__sound');
    settSound.textContent = '🔊';

    const settTheme = addElement('div', 'settings__theme');
    settTheme.textContent = '🌑';
    settTheme.addEventListener('click', (e) => this.changeTheme(e));

    const infoBlock = addElement('div', 'info');

    const infoBombs = addElement('div', 'info__bombs');
    infoBombs.textContent = '💣99';

    const infoButton = addElement('div', 'info__button');
    infoButton.textContent = 'Start game';

    this.infoTime = addElement('div', 'info__time');
    this.infoTime.textContent = '000';

    settMainWrap.append(settLevel, settBombs);
    settAdditWrap.append(settRecords, settSound, settTheme);
    settBlock.append(settMainWrap, settAdditWrap);

    infoBlock.append(infoBombs, infoButton, this.infoTime);

    this.minesweeperElement.append(header, text, settBlock, infoBlock);

    this.board = new Board(this, this.container, 10);
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
    btnClose.addEventListener('click', () => {
      overlay.remove();
    });

    const content = addElement('div', 'modal__content');
    content.textContent = value;

    modal.append(btnClose, content);
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

  startNewGame() {
    this.board.boardElement.remove();
    this.board = null;
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
    };
    clearInterval();
    setInterval(activeTimer, 1000);
  }
}
