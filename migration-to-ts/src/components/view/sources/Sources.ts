import { SourcesTempClass } from '../../../enum';
import { SourcesObject } from '../../../types';
import './sources.css';

class Sources {
  static draw(data: SourcesObject[] | null): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

    if (sourceItemTemp instanceof HTMLTemplateElement) {
      data.forEach((item) => {
        const sourceClone: Node = sourceItemTemp.content.cloneNode(true);

        (<HTMLElement>sourceClone)
          .querySelector(SourcesTempClass.name)
          .textContent = item.name;

        (<HTMLElement>sourceClone)
          .querySelector(SourcesTempClass.item)
          .setAttribute('data-source-id', String(item.id));

        fragment.append(sourceClone);
      });

      document.querySelector('.sources').append(fragment);
    }
  }
}

export default Sources;
