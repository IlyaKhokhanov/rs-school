import { ILevelData } from '../../utils/types';
import { addElement } from '../../utils/utils';
import App from '../app/app';
import './levelViewer.scss';

export default class LevelViewer {
  currentLevel: number | null = 0;

  private sidebar: HTMLElement = addElement('aside', 'sidebar');

  constructor(private app: App, private levelsData: ILevelData[]) {
    this.initLevels();
  }

  public initLevels(): void {
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

      elem.append(icon, elemText);

      elem.addEventListener('click', (e) => {
        const { target } = e;
        if (target) {
          this.currentLevel =
            Number((target as HTMLElement).textContent?.split(' ')[1]) - 1;
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
      'sidebar-reset--btn'
    );

    sidebarButton.textContent = 'Reset Progress';
    sidebarButton.addEventListener('click', () => {
      this.levelsData.map((level) => ({
        ...level,
        complete: false,
      }));
      this.currentLevel = 0;
      this.initLevels();
    });

    this.sidebar.append(sidebarHeader, sidebarList, sidebarButton);
    document.body.append(this.sidebar);
    this.app.initApp(this.levelsData[this.currentLevel || 0]);
  }

  public nextLevel(): void {
    if (this.currentLevel) this.currentLevel += 1;
    this.initLevels();
  }
}
