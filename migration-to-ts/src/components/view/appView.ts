import News from './news/News';
import Sources from './sources/Sources';
import { ISourcesResponse, INewsResponse } from '../../types';

export class AppView {
  private news: typeof News = News;

  private sources: typeof Sources = Sources;

  public drawNews(data: INewsResponse) {
    if (data.status === 'ok') {
      const values = data.articles ? data.articles : [];
      this.news.draw(values);
    } else {
      throw new Error('Data could not be retrieved');
    }
  }

  public drawSources(data: ISourcesResponse) {
    if (data.status === 'ok') {
      const values = data.sources ? data.sources : [];
      this.sources.draw(values);
    } else {
      throw new Error('Data could not be retrieved');
    }
  }
}

export default AppView;
