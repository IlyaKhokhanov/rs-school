import Board from './Board';
import { addElement } from './utilits';

export default class Minesweeper {
  connainer = null;

  constructor(container) {
    this.container = container;

    this.createSettings();

    this.board = new Board(container, 10);

    const text = addElement('div', 'description');
    text.textContent = 'To set a flag, right click';
    this.container.append(text);
  }

  createSettings() {
    const minesweeperElement = addElement('div', 'minesweeper');

    const header = addElement('h2', 'header');
    header.textContent = 'Minesweeper';

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

    const infoTime = addElement('div', 'info__time');
    infoTime.textContent = '000';

    settMainWrap.append(settLevel, settBombs);
    settAdditWrap.append(settRecords, settSound, settTheme);
    settBlock.append(settMainWrap, settAdditWrap);

    infoBlock.append(infoBombs, infoButton, infoTime);

    minesweeperElement.append(header, settBlock, infoBlock);
    this.container.append(minesweeperElement);
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
}
