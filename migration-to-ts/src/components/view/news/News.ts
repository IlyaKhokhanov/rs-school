import { NewsTempClass } from '../../../enum';
import { NewsObject } from '../../../types';
import './news.css';

class News {
  static draw(data: NewsObject[]): void {
    const news: NewsObject[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

    const fragment: DocumentFragment = document.createDocumentFragment();
    const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

    if (newsItemTemp instanceof HTMLTemplateElement) {
      news.forEach((item, idx) => {
        const newsClone: Node = newsItemTemp.content.cloneNode(true);

        if (idx % 2) {
          (<HTMLElement>newsClone)
            .querySelector(NewsTempClass.item)
            .classList.add('alt');
        }

        (<HTMLElement>newsClone)
          .querySelector<HTMLDivElement>(NewsTempClass.photo)
          .style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;

        (<HTMLElement>newsClone)
          .querySelector(NewsTempClass.author)
          .textContent = item.author || item.source.name;

        (<HTMLElement>newsClone)
          .querySelector(NewsTempClass.date)
          .textContent = item.publishedAt
            .slice(0, 10)
            .split('-')
            .reverse()
            .join('-');

        (<HTMLElement>newsClone)
          .querySelector(NewsTempClass.title)
          .textContent = item.title;

        (<HTMLElement>newsClone)
          .querySelector(NewsTempClass.source)
          .textContent = item.source.name;

        (<HTMLElement>newsClone)
          .querySelector(NewsTempClass.content)
          .textContent = item.description;

        (<HTMLElement>newsClone)
          .querySelector(NewsTempClass.link)
          .setAttribute('href', item.url);

        fragment.append(newsClone);
      });
    }

    const newsEl: HTMLElement = document.querySelector('.news');
    newsEl.innerHTML = '';
    newsEl.appendChild(fragment);
  }
}

export default News;
