import { ISourcesObject } from '../../../types';
import './sources.css';

class Sources {
  static draw(data: ISourcesObject[] | null): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

    if (sourceItemTemp) {
      data.forEach((item) => {
        const sourceClone: Node = sourceItemTemp.content.cloneNode(true);

        (<HTMLElement>sourceClone)
          .querySelector('.source__item-name')
          .textContent = item.name;

        (<HTMLElement>sourceClone)
          .querySelector('.source__item')
          .setAttribute('data-source-id', String(item.id));

        fragment.append(sourceClone);
      });

      document.querySelector('.sources').append(fragment);
    }
  }
}

export default Sources;
