import { ILevelData } from '../../utils/types';
import { addElement } from '../../utils/utils';
import data from '../../data/levels.json';
import './levelViewer.scss';
import Modal from '../modal/modal';

const LSdata: string | null = localStorage.getItem('testDataKH');

export default class LevelViewer {
  private levelsData: ILevelData[] = LSdata ? JSON.parse(LSdata) : data;

  private currentLevel: number | null = Number(localStorage.getItem('testLevelKH')) || 0;

  private sidebar: HTMLElement = addElement('aside', 'sidebar');

  private sidebarBtn: HTMLElement = addElement('button', 'sidebar__btn');

  private sidebarOverlay: HTMLElement = addElement('div', 'sidebar-overlay');

  constructor(
    private container: HTMLElement,
    private callback: (levelData: ILevelData) => void,
  ) {
    this.resetAndInitEventListeners();
    this.initLevels();
  }

  private initLevels(): void {
    this.sidebar.innerHTML = '';
    const sidebarHeader: HTMLElement = addElement('h2', 'sidebar-header');
    sidebarHeader.textContent = 'Levels';

    const sidebarList: HTMLElement = addElement('ul', 'sidebar-list');
    this.levelsData.forEach((level, levelIndx) => {
      const elem: HTMLElement = addElement('li', 'sidebar-level');
      const icon: HTMLImageElement = document.createElement('img');
      icon.classList.add('sidebar-level--img');
      icon.src = `./img/check-${level.complete ? 'green' : 'black'}.png`;

      const elemText = addElement('span', 'sidebar-level--text');
      elemText.textContent = level.name;

      const elemWrapper = addElement('span', 'sidebar-level--wrapper');
      elemWrapper.append(icon, elemText);
      elem.append(elemWrapper);

      if (level.help) {
        const iconHelp: HTMLImageElement = document.createElement('img');
        iconHelp.classList.add('sidebar-level--img');
        iconHelp.src = './img/question.png';
        elem.append(iconHelp);
      }
      elem.addEventListener('click', (e) => {
        const { target } = e;
        if (target) {
          this.currentLevel = Number((target as HTMLElement).textContent?.split(' ')[1]) - 1;
        }
        this.initLevels();
      });
      if (this.currentLevel === levelIndx) {
        elem.classList.add('sidebar-level--active');
      }
      sidebarList.append(elem);
    });

    const sidebarResetBtn: HTMLElement = addElement(
      'button',
      'sidebar-reset--btn',
    );
    sidebarResetBtn.textContent = 'Reset Progress';
    sidebarResetBtn.addEventListener('click', () => {
      this.resetProgress();
      if (document.documentElement.clientWidth < 768) {
        this.toggleMenu();
      }
    });

    this.sidebar.append(
      this.sidebarBtn,
      sidebarHeader,
      sidebarList,
      sidebarResetBtn,
    );
    document.body.append(this.sidebarOverlay, this.sidebar);
    this.callback(this.levelsData[this.currentLevel || 0]);
  }

  private resetProgress(): void {
    this.levelsData = this.levelsData.map((level) => ({
      ...level,
      complete: false,
      help: false,
    }));
    this.currentLevel = 0;
    this.initLevels();
    localStorage.removeItem('testDataKH');
    localStorage.removeItem('testLevelKH');
  }

  public nextLevel(): void {
    if (this.currentLevel !== null) {
      this.levelsData[this.currentLevel].complete = true;
      if (this.currentLevel !== this.levelsData.length - 1) this.currentLevel += 1;
      if (this.levelsData.length === this.levelsData.filter((level) => level.complete).length
      ) {
        this.initLevels();
        const modal = new Modal(this.container, this.resetProgress.bind(this));
      } else if (this.currentLevel === this.levelsData.length - 1) {
        this.currentLevel = this.levelsData.findIndex((el) => !el.complete);
        this.initLevels();
      } else if (!this.levelsData[this.currentLevel].complete) {
        this.initLevels();
      } else {
        this.nextLevel();
      }
    }
    localStorage.setItem('testDataKH', JSON.stringify(this.levelsData));
    localStorage.setItem('testLevelKH', JSON.stringify(this.currentLevel));
  }

  public addInfoHelp(): void {
    if (this.currentLevel !== null) {
      this.levelsData[this.currentLevel].help = true;
    }
  }

  resetAndInitEventListeners() {
    const sidebarBtnSpan1 = addElement('span');
    const sidebarBtnSpan2 = addElement('span');
    const sidebarBtnSpan3 = addElement('span');
    this.sidebarBtn.append(sidebarBtnSpan1, sidebarBtnSpan2, sidebarBtnSpan3);
    this.sidebar.addEventListener('click', (e) => {
      const { target } = e;
      if (
        target
        && (<HTMLElement>target).closest('.sidebar-level')
        && this.sidebar.closest('.sidebar--active')
      ) {
        this.toggleMenu();
      }
    });
    this.sidebarOverlay.addEventListener('click', () => this.toggleMenu());
    this.sidebarBtn.addEventListener('click', () => this.toggleMenu());
  }

  private toggleMenu() {
    this.sidebarBtn.classList.toggle('sidebar__btn--active');
    this.sidebar.classList.toggle('sidebar--active');
    this.sidebarOverlay.classList.toggle('sidebar-overlay--active');
    document.body.style.overflow = document.body.style.overflow ? '' : 'hidden';
  }
}
