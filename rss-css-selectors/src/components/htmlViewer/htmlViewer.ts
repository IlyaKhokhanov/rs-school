import { addElement, elemToHtmlViewer, illuminateElementsAndCode } from '../../utils/utils';
import { LevelItemsT } from '../../utils/types';
import './htmlViewer.scss';

export default class HtmlViewer {
  private items: LevelItemsT[] | null = null;

  constructor(private container: HTMLElement) {}

  public initHtmlViewer(levelItems: LevelItemsT[]): void {
    this.items = levelItems;
    const htmlViewerWrapper = addElement('div', 'html-viewer-wrapper');
    const htmlViewerHeaderBlock = addElement('div', 'html-viewer-header-block');
    const htmlViewerHeader = addElement(
      'h2',
      'html-viewer-header',
      'HTML Viewer',
    );
    const htmlViewerHeaderFile = addElement(
      'span',
      'html-viewer-header-file',
      'field.html',
    );

    htmlViewerHeaderBlock.append(htmlViewerHeader, htmlViewerHeaderFile);

    const htmlViewerCodeWrapper = addElement('div', 'html-viewer-code-wrapper');
    const htmlViewerNumbers = addElement('div', 'html-viewer-code-numbers');

    for (let i = 1; i <= 20; i += 1) {
      const numberEl = addElement('div', 'html-viewer-code-number', String(i));
      htmlViewerNumbers.append(numberEl);
    }

    const htmlViewerCode = addElement('div', 'html-viewer-code');
    htmlViewerCode.addEventListener('mouseover', (e) => illuminateElementsAndCode(e, true));
    htmlViewerCode.addEventListener('mouseout', (e) => illuminateElementsAndCode(e, false));

    const fieldOpenDiv = addElement('div');
    const fieldOpenSpan = elemToHtmlViewer('div', true, true, 'field');
    fieldOpenDiv.append(fieldOpenSpan);
    htmlViewerCode.append(fieldOpenDiv);

    this.items.forEach((elem, indx) => {
      const itemToHTML = addElement('div', 'html-viewer-code-item');
      itemToHTML.dataset.id = String(indx);
      if (!elem.innerElement) {
        const openTag = elemToHtmlViewer(elem.element, true, false, elem.id);
        itemToHTML.append(openTag);
      } else {
        const openItemToHTML = elemToHtmlViewer(
          elem.element,
          true,
          true,
          elem.id,
        );

        itemToHTML.append(openItemToHTML);
        const elemToItem = addElement('div', 'html-viewer-code-item');
        elemToItem.dataset.id = `in${indx}`;
        const spanToElem = elemToHtmlViewer(
          elem.innerElement.element,
          true,
          false,
          elem.innerElement.id,
        );

        elemToItem.append(spanToElem);
        itemToHTML.append(elemToItem);
        const closeItemToHTML = elemToHtmlViewer(elem.element, false, true);
        itemToHTML.appendChild(closeItemToHTML);
      }
      htmlViewerCode.append(itemToHTML);
    });

    const fieldCloseDiv = addElement('div');
    const fieldCloseSpan = elemToHtmlViewer('div', false, true);

    fieldCloseDiv.append(fieldCloseSpan);
    htmlViewerCode.append(fieldCloseDiv);
    htmlViewerCodeWrapper.append(htmlViewerNumbers, htmlViewerCode);
    htmlViewerWrapper.append(htmlViewerHeaderBlock, htmlViewerCodeWrapper);
    this.container.append(htmlViewerWrapper);
  }
}
