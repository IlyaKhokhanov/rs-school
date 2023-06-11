import AppController from '../controller/controller';
import { AppView } from '../view/appView';

class App {
  private controller: AppController = new AppController();

  private view: AppView = new AppView();

  public start(): void {
    (document.querySelector('.sources') as HTMLDivElement)
      .addEventListener('click', (e) => {
        this.controller.getNews(e, (data) => this.view.drawNews(data));
      });
    this.controller.getSources((data) => this.view.drawSources(data));
  }
}

export default App;
