import { ILevelData } from '../../utils/types';
import { addElement } from '../../utils/utils';
import './elementsViewer.scss';

export default class ElementsViewer {
  constructor(public container: HTMLElement) {
  }

  initElements(levelData: ILevelData): void {
    const elementsWrapper = addElement('div', 'elements-wrapper');

    const header = addElement('h2', 'elements-header');
    header.textContent = levelData.description;

    const helpBtn = addElement('button', 'elements-btn');
    helpBtn.textContent = "Help, I'm stuck!";
    helpBtn.addEventListener('click', (e) => console.log('help me'));

    const field = addElement('field');

    levelData.items.forEach((elem) => {
      const itemToField = addElement(elem.element, elem.class);
      if (elem.id) itemToField.classList.add(elem.id);

      if (elem.innerElement) {
        const elemToItem = addElement(
          elem.innerElement.element,
          elem.innerElement.class,
        );
        if (elem.innerElement.id) {
          elemToItem.classList.add(elem.innerElement.id);
        }

        itemToField.append(elemToItem);
      }
      field.append(itemToField);
    });

    elementsWrapper.append(header, helpBtn, field);
    this.container.append(elementsWrapper);
  }
}
