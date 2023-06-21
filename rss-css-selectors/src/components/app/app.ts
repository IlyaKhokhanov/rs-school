import levelsData from '../../data/levels.json';
import { ILevelData } from '../../utils/types';
import { addElement } from '../../utils/utils';
import CssEditor from '../cssEditor/cssEditor';
import ElementsViewer from '../elementsViewer/elementsViewer';
import HtmlViewer from '../htmlViewer/htmlViewer';
import LevelViewer from '../levelViewer/levelViewer';

export default class App {
  private mainContainer: HTMLElement = addElement('main', 'main');

  elements = new ElementsViewer(this.mainContainer);

  cssEditor = new CssEditor(this.mainContainer);

  htmlViewer = new HtmlViewer(this.mainContainer);

  levels = new LevelViewer(this, levelsData);

  initApp(levelData: ILevelData): void {
    this.mainContainer.innerHTML = '';
    this.elements.initElements(levelData);
    this.cssEditor.initCssEditor();
    this.htmlViewer.initHtmlViewer(levelData);
    document.body.append(this.mainContainer);
  }
}
