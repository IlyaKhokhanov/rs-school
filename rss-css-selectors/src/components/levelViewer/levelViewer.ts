import { ILevelData } from '../../utils/types';
import { addElement } from '../../utils/utils';
import data from '../../data/levels.json';
import './levelViewer.scss';
import Modal from '../modal/modal';

export default class LevelViewer {
  private levelsData: ILevelData[] = /* JSON.parse(localStorage.getItem('testData')) || */ data;

  private currentLevel: number | null = 0;

  private sidebar: HTMLElement = addElement('aside', 'sidebar');

  constructor(private container: HTMLElement, private callback:(levelData: ILevelData)=> void) {
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

    const sidebarButton: HTMLElement = addElement(
      'button',
      'sidebar-reset--btn',
    );

    sidebarButton.textContent = 'Reset Progress';
    sidebarButton.addEventListener('click', () => this.resetProgress());

    this.sidebar.append(sidebarHeader, sidebarList, sidebarButton);
    document.body.append(this.sidebar);
    this.callback(this.levelsData[this.currentLevel || 0]);
  }

  private resetProgress(): void {
    this.levelsData = this.levelsData.map((level) => ({
      ...level,
      complete: false,
    }));
    this.currentLevel = 0;
    this.initLevels();
  }

  public nextLevel(): void {
    if (this.currentLevel !== null) {
      this.levelsData[this.currentLevel].complete = true;
      if (this.currentLevel !== this.levelsData.length - 1) this.currentLevel += 1;
      if (this.levelsData.length === this.levelsData.filter((level) => level.complete).length) {
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
  }

  public addInfoHelp(): void {
    if (this.currentLevel !== null) {
      this.levelsData[this.currentLevel].help = true;
    }
  }
}
