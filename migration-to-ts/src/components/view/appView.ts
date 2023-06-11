import News from './news/news';
import Sources from './sources/sources';
import { ISourcesResponse, INewsResponse } from '../../types';

export class AppView {
  private news: typeof News = News;

  private sources: typeof Sources = Sources;

  public drawNews(data?: INewsResponse) {
    const values = data?.articles ? data?.articles : [];
    this.news.draw(values);
  }

  public drawSources(data?: ISourcesResponse) {
    const values = data?.sources ? data?.sources : [];
    this.sources.draw(values);
  }
}

export default AppView;
