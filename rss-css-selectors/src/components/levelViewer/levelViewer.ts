import { ILevelData } from '../../utils/types';
import { addElement } from '../../utils/utils';
import './levelViewer.scss';

export default class LevelViewer {
  currentLevel: string | null = 'Level 1';

  private sidebar: HTMLElement = addElement('aside', 'sidebar');

  constructor(private levelsData: ILevelData[]) {
    this.initLevels();
  }

  public initLevels(): void {
    this.sidebar.innerHTML = '';

    const sidebarHeader: HTMLElement = addElement('h2', 'sidebar-header');
    sidebarHeader.textContent = 'Levels';

    const sidebarList: HTMLElement = addElement('ul', 'sidebar-list');

    this.levelsData.forEach((level) => {
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
          this.currentLevel = (target as HTMLElement).textContent;
        }
        this.initLevels();
      });

      if (this.currentLevel === level.name) elem.classList.add('sidebar-level--active');

      sidebarList.append(elem);
    });

    const sidebarButton: HTMLElement = addElement(
      'button',
      'sidebar-reset--btn',
    );

    sidebarButton.textContent = 'Reset Progress';
    sidebarButton.addEventListener('click', () => {
      this.levelsData.map((level) => ({
        ...level,
        complete: false,
      }));
      this.currentLevel = 'Level 1';
      this.initLevels();
    });

    this.sidebar.append(sidebarHeader, sidebarList, sidebarButton);
    document.body.append(this.sidebar);
  }

  public nextLevel(): void {
    this.currentLevel = `Level ${Number(this.currentLevel?.split(' ')[1]) + 1}`;
    this.initLevels();
  }
}
