import { CallbackType, INewsResponse, ISourcesResponse } from '../../types';
import AppLoader from './appLoader';

class AppController extends AppLoader {
  public getSources(callback: CallbackType<ISourcesResponse>): void {
    super.getResp({ endpoint: 'sources' }, callback);
  }

  public getNews(e: Event, callback: CallbackType<INewsResponse>): void {
    let { target } = e;
    const { currentTarget } = e;

    while (target !== currentTarget) {
      if ((<HTMLElement>target).classList.contains('source__item')) {
        const sourceId: string | null = (<HTMLElement>target).getAttribute(
          'data-source-id',
        );
        if (
          (<HTMLElement>currentTarget).getAttribute('data-source') !== sourceId
        ) {
          if (sourceId) {
            (<HTMLElement>currentTarget).setAttribute('data-source', sourceId);
            super.getResp(
              {
                endpoint: 'everything',
                options: {
                  sources: sourceId,
                },
              },
              callback,
            );
          }
        }
        return;
      }
      target = (<HTMLElement>target).parentNode;
    }
  }
}

export default AppController;
