import Board from './Board';
import { addElement } from './utilits';
import {
  soundTerroristWin,
  soundWonRound,
  soundClick,
  soundMainMenu,
} from './sounds';

const playClick = new Audio(soundClick);
const playWonRound = new Audio(soundWonRound);
const playTerroristWin = new Audio(soundTerroristWin);

export default class Minesweeper {
  connainer = null;

  lengthBoard = +localStorage.getItem('lengthKH') || 10;

  bombs = +localStorage.getItem('bombsKH') || 10;

  sound = localStorage.getItem('soundKH')
    ? JSON.parse(localStorage.getItem('soundKH'))
    : true;

  darkTheme = JSON.parse(localStorage.getItem('themeKH')) || false;

  steps = +localStorage.getItem('matrixStepsKH') || 0;

  flags = +localStorage.getItem('matrixFlagsKH') || 0;

  setFlags = false;

  timer = +localStorage.getItem('matrixTimerKH') || 0;

  timerWorks = null;

  constructor(container) {
    this.container = container;

    localStorage.getItem('soundKH');

    this.playMainMenu = new Audio(soundMainMenu);
    this.playMainMenu.loop = true;

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
      if (this.sound) playClick.play();
      this.lengthBoard = +e.target.value;
      if (+e.target.value === 10) {
        this.bombs = 10;
        this.settBombsCount.value = 10;
      } else if (+e.target.value === 15) {
        this.bombs = 40;
        this.settBombsCount.value = 40;
      } else if (+e.target.value === 25) {
        this.bombs = 80;
        this.settBombsCount.value = 80;
      }

      localStorage.setItem('lengthKH', +e.target.value);
      localStorage.setItem('bombsKH', this.bombs);
    });

    settLevel.append(option1, option2, option3);

    const settBombs = addElement('div', 'settings__bombs-wrap');
    this.settBombsCount = addElement('input', 'settings__bombs');
    this.settBombsCount.setAttribute('type', 'number');
    this.settBombsCount.setAttribute('min', '10');
    this.settBombsCount.setAttribute('max', '99');
    this.settBombsCount.setAttribute('value', this.bombs);
    this.settBombsCount.addEventListener('change', (e) => {
      if (this.sound) playClick.play();
      if (+e.target.value > 9 && +e.target.value < 100) {
        this.bombs = +e.target.value;
        localStorage.setItem('bombsKH', +e.target.value);
      }
    });
    const settBombsImg = addElement('div', 'settings__bombs-img');
    settBombsImg.textContent = '💣';

    settBombs.append(this.settBombsCount, settBombsImg);

    const settAdditWrap = addElement('div', 'settings__addit');

    const settRecords = addElement('div', 'settings__records');
    settRecords.textContent = '📊';
    settRecords.addEventListener('click', () => this.openModal('records'));

    const settSound = addElement('div', 'settings__sound');
    if (!this.sound) settSound.classList.add('active');
    settSound.textContent = '🎵';
    settSound.addEventListener('click', (e) => this.controlSound(e));

    const settTheme = addElement('div', 'settings__theme');
    if (this.darkTheme) {
      settTheme.classList.add('active');
      this.container.classList.add('dark');
    }

    settTheme.textContent = '☯';
    settTheme.addEventListener('click', (e) => this.changeTheme(e));

    const infoBlock = addElement('div', 'info');

    const infoBlockLeft = addElement('div', 'info__block-left');

    this.infoBombs = addElement('div', 'info__bombs');
    this.infoBombs.textContent = `💣${
      (+localStorage.getItem('matrixBombsKH') || this.bombs) - this.flags
    }`;

    this.infoFlags = addElement('div', 'info__flags');
    this.infoFlags.textContent = `🚩${this.flags}`;
    this.infoFlags.addEventListener('click', (e) => {
      if (e.target.classList.contains('active')) {
        this.setFlags = false;
        e.target.classList.remove('active');
      } else {
        this.setFlags = true;
        e.target.classList.add('active');
      }
    });

    infoBlockLeft.append(this.infoBombs, this.infoFlags);

    const infoButton = addElement('div', 'info__button');
    infoButton.textContent = 'New game';
    infoButton.addEventListener('click', () => this.startNewGame());

    const infoBlockRight = addElement('div', 'info__block-right');

    this.infoSteps = addElement('div', 'info__steps');
    this.infoSteps.textContent = `🐾${this.steps}`;

    this.infoTime = addElement('div', 'info__time');
    this.infoTime.textContent = '000';

    infoBlockRight.append(this.infoSteps, this.infoTime);

    settMainWrap.append(settLevel, settBombs);
    settAdditWrap.append(settRecords, settSound, settTheme);
    settBlock.append(settMainWrap, settAdditWrap);

    infoBlock.append(infoBlockLeft, infoButton, infoBlockRight);

    this.minesweeperElement.append(header, text, settBlock, infoBlock);

    this.board = new Board(
      this,
      this.container,
      JSON.parse(localStorage.getItem('matrixKH'))?.length || this.lengthBoard,
      +localStorage.getItem('matrixBombsKH') || this.bombs,
    );
  }

  openModal(value) {
    const overlay = addElement('div', 'overlay');
    overlay.addEventListener('click', (e) => {
      if (e.target.classList.contains('overlay')) {
        if (value === 'records') {
          overlay.remove();
        } else {
          this.startNewGame();
        }
      }
    });

    const modal = addElement('div', 'modal');
    const btnClose = addElement('div', 'modal__btn-close');
    btnClose.textContent = '×';
    btnClose.addEventListener('click', () => {
      if (value === 'records') {
        overlay.remove();
      } else {
        this.startNewGame();
      }
    });

    const content = addElement('div', 'modal__content');
    if (value === 'win') {
      if (this.sound) playWonRound.play();
      content.classList.add('modal-info');
      content.textContent = `Hooray! You found all mines in ${this.timer} seconds and ${this.steps} moves!`;
    } else if (value === 'defeat') {
      if (this.sound) playTerroristWin.play();
      content.classList.add('modal-info');
      content.textContent = 'Game over. Try again';
    } else if (value === 'records') {
      if (this.sound) playClick.play();
      const header = addElement('h2', 'modal__records-header');
      header.textContent = 'Last results';

      content.append(header);

      if (localStorage.getItem('recordsKH')) {
        const list = addElement('ol', 'modal__records-list');
        JSON.parse(localStorage.getItem('recordsKH'))
          .sort((a, b) => a.time - b.time)
          .forEach((item) => {
            const date = item.date.split('T')[0];
            const time = item.date.split('T')[1].split('.')[0];

            let level = '';
            if (item.level === 10) level = 'Easy';
            if (item.level === 15) level = 'Medium';
            if (item.level === 25) level = 'Hard';
            const itemElem = addElement('li', 'modal__records-item');
            itemElem.textContent = `${item.time} seconds - ${item.steps} steps - ${level} level - ${time} ${date}`;

            list.append(itemElem);
          });
        content.append(list);
      } else {
        const itemElem = addElement('div', 'modal__records-empty');
        itemElem.textContent = 'Results list is empty...';

        content.append(itemElem);
      }
    }

    const btnStart = addElement('div', 'modal__btn-start');
    btnStart.textContent = 'Start new game';
    btnStart.addEventListener('click', () => this.startNewGame());

    modal.append(btnClose, content, btnStart);
    overlay.append(modal);
    this.minesweeperElement.append(overlay);

    if (value === 'win') {
      let storageData = JSON.parse(localStorage.getItem('recordsKH')) || [];
      if (storageData.length === 10) {
        storageData = storageData.slice(1);
      }
      storageData.push({
        time: this.timer,
        steps: this.steps,
        level: this.lengthBoard,
        win: this.board.isWin,
        date: new Date(),
      });
      localStorage.setItem('recordsKH', JSON.stringify(storageData));
    }
  }

  changeTheme(e) {
    if (this.sound) playClick.play();
    if (e.target.classList.contains('active')) {
      this.darkTheme = false;
      localStorage.setItem('themeKH', false);
      e.target.classList.remove('active');
      this.container.classList.remove('dark');
    } else {
      this.darkTheme = true;
      localStorage.setItem('themeKH', true);
      e.target.classList.add('active');
      this.container.classList.add('dark');
    }
  }

  controlSound(e) {
    playClick.play();
    if (e.target.classList.contains('active')) {
      e.target.classList.remove('active');
      this.sound = true;
      localStorage.setItem('soundKH', true);
    } else {
      e.target.classList.add('active');
      this.sound = false;
      this.playMainMenu.pause();
      localStorage.setItem('soundKH', false);
    }
  }

  startNewGame() {
    if (this.sound) this.playMainMenu.play();
    if (this.sound) playClick.play();
    playWonRound.pause();
    this.board.boardElement.remove();
    this.board = null;
    this.timer = 0;
    this.steps = 0;
    this.stopTimer(this.timerWorks);
    localStorage.removeItem('matrixKH');
    localStorage.removeItem('matrixBombsKH');
    localStorage.removeItem('matrixStepsKH');
    localStorage.removeItem('matrixFlagsKH');
    localStorage.removeItem('matrixTimerKH');
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
