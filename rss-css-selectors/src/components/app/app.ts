import levelsData from '../../data/levels.json';
import { ILevelData } from '../../utils/types';
import LevelViewer from '../levelViewer/levelViewer';

export default class App {
  levelsData: ILevelData[] = levelsData;

  container: HTMLElement = document.createElement('main');

  levels = new LevelViewer(levelsData);

  initApp(): void {
    document.body.append(this.container);
  }
}
