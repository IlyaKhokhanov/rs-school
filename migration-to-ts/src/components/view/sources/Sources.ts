import { SourcesTempClass } from '../../../enum';
import { SourcesObject } from '../../../types';
import './sources.css';

class Sources {
  static draw(data: SourcesObject[] | undefined): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

    if (sourceItemTemp instanceof HTMLTemplateElement) {
      if (data) {
        data.forEach((item) => {
          const sourceClone: Node = sourceItemTemp.content.cloneNode(true);

          const sourceName: HTMLElement | null = (<HTMLElement>sourceClone)
            .querySelector(SourcesTempClass.name);
          if (sourceName) {
            sourceName.textContent = item.name;
          }

          const sourceItem: HTMLElement | null = (<HTMLElement>sourceClone)
            .querySelector(SourcesTempClass.item);
          if (sourceItem) {
            sourceItem.setAttribute('data-source-id', String(item.id));
          }

          fragment.append(sourceClone);
        });

        const sourcesEl: HTMLElement | null = document.querySelector('.sources');
        if (sourcesEl) {
          sourcesEl.append(fragment);
        }
      } else {
        throw new Error('Data not found');
      }
    }
  }
}

export default Sources;
