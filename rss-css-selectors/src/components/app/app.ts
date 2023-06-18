import levelsData from '../../data/levels.json';
import { ILevelData } from '../../utils/types';
import { addElement } from '../../utils/utils';
import CssEditor from '../cssEditor/cssEditor';
import ElementsViewer from '../elementsViewer/elementsViewer';
import HtmlViewer from '../htmlViewer/htmlViewer';
import LevelViewer from '../levelViewer/levelViewer';

export default class App {
  levelsData: ILevelData[] = levelsData;

  container: HTMLElement = addElement('main', 'main');

  levels = new LevelViewer(levelsData);

  elements = new ElementsViewer(this.container, levelsData[4]);

  cssEditor = new CssEditor(this.container);

  htmlViewer = new HtmlViewer(this.container);

  initApp(): void {
    document.body.append(this.container);
  }
}
