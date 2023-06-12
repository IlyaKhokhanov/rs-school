import { NewsTempClass } from '../../../enum';
import { NewsObject } from '../../../types';
import './news.css';

class News {
  static draw(data: NewsObject[] | undefined): void {
    const news: NewsObject[] | undefined = data && data.length >= 10
      ? data.filter((_item, idx) => idx < 10)
      : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

    if (newsItemTemp) {
      if (news) {
        news.forEach((item, idx) => {
          const newsClone: Node = newsItemTemp.content.cloneNode(true);

          if (idx % 2) {
            const newsItem: HTMLElement | null = (<HTMLElement>newsClone)
              .querySelector(NewsTempClass.item);
            if (newsItem) {
              newsItem.classList.add('alt');
            }
          }

          const newsPhoto: HTMLElement | null = (<HTMLElement>newsClone)
            .querySelector<HTMLDivElement>(NewsTempClass.photo);
          if (newsPhoto) {
            newsPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
          }

          const newsAuthor: HTMLElement | null = (<HTMLElement>newsClone)
            .querySelector(NewsTempClass.author);
          if (newsAuthor) {
            newsAuthor.textContent = item.author || item.source.name;
          }

          const newsDate: HTMLElement | null = (<HTMLElement>newsClone)
            .querySelector(NewsTempClass.date);
          if (newsDate) {
            newsDate.textContent = item.publishedAt
              .slice(0, 10)
              .split('-')
              .reverse()
              .join('-');
          }

          const newsTitle: HTMLElement | null = (<HTMLElement>newsClone)
            .querySelector(NewsTempClass.title);
          if (newsTitle) {
            newsTitle.textContent = item.title;
          }

          const newsSource: HTMLElement | null = (<HTMLElement>newsClone)
            .querySelector(NewsTempClass.source);
          if (newsSource) {
            newsSource.textContent = item.source.name;
          }

          const newsContent: HTMLElement | null = (<HTMLElement>newsClone)
            .querySelector(NewsTempClass.content);
          if (newsContent) {
            newsContent.textContent = item.description;
          }

          const newsLink: HTMLElement | null = (<HTMLElement>newsClone)
            .querySelector(NewsTempClass.link);
          if (newsLink) {
            newsLink.setAttribute('href', item.url);
          }

          fragment.append(newsClone);
        });
      } else {
        throw new Error('News not found');
      }
    }

    const newsEl: HTMLElement | null = document.querySelector('.news');
    if (newsEl instanceof HTMLElement) {
      newsEl.innerHTML = '';
      newsEl.appendChild(fragment);
    } else {
      throw new Error('Error with news');
    }
  }
}

export default News;
