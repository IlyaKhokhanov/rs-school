import { ILevelData } from '../../utils/types';
import { addElement } from '../../utils/utils';
import CssEditor from '../cssEditor/cssEditor';
import ElementsViewer from '../elementsViewer/elementsViewer';
import HtmlViewer from '../htmlViewer/htmlViewer';
import LevelViewer from '../levelViewer/levelViewer';

export default class App {
  private mainContainer: HTMLElement = addElement('main', 'main');

  private elements = new ElementsViewer(this.mainContainer, this.helpWithAnswer.bind(this));

  private cssEditor = new CssEditor(this.mainContainer, this.levelComplete.bind(this));

  private htmlViewer = new HtmlViewer(this.mainContainer);

  private levels = new LevelViewer(this.mainContainer, this.initApp.bind(this));

  private initApp(levelData: ILevelData): void {
    this.mainContainer.innerHTML = '';
    this.elements.initElements(levelData);
    this.cssEditor.initCssEditor(levelData.answer);
    this.htmlViewer.initHtmlViewer(levelData.items);
    document.body.append(this.mainContainer);
  }

  private levelComplete() {
    setTimeout(() => {
      this.levels.nextLevel();
    }, 1000);
  }

  private helpWithAnswer() {
    this.cssEditor.addAnswer();
    this.levels.addInfoHelp();
  }
}
