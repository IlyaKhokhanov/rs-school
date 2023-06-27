function addElement(
  tagName: string,
  className?: string | [],
  textContent?: string,
): HTMLElement {
  const elem: HTMLElement = document.createElement(tagName);
  if (className) {
    if (className instanceof Array) {
      className.forEach((classEl) => {
        elem.classList.add(classEl);
      });
    } else {
      elem.classList.add(className);
    }
  }
  if (textContent) elem.textContent = textContent;
  return elem;
}

function elemToHtmlViewer(
  tagValue: string,
  isOpenTag: boolean,
  innerItem: boolean,
  classValue?: string,
): HTMLElement {
  const element = addElement('span');
  if (isOpenTag) {
    const openBracket = addElement('span', 'operator', '<');
    element.append(openBracket);
  } else {
    const openBracket = addElement('span', 'operator', '</');
    element.append(openBracket);
  }
  const tag = addElement('span', 'tag', tagValue);
  element.append(tag);
  if (classValue) {
    const classEl = addElement('span', 'classEl', ' class');
    const classOperatorOpen = addElement('span', 'operator', '="');
    const classVal = addElement('span', 'classVal', classValue);
    const classOperatorClose = addElement('span', 'operator', '"');
    element.append(classEl, classOperatorOpen, classVal, classOperatorClose);
  }
  if (innerItem) {
    const closeBracket = addElement('span', 'operator', '>');
    element.append(closeBracket);
  } else {
    const closeBracket = addElement('span', 'operator', ' />');
    element.append(closeBracket);
  }
  return element;
}

function illuminateElementsAndCode(event: MouseEvent, add: boolean): void {
  if ((event.target as HTMLElement).closest('[data-id]')) {
    const idElem = (
      (event.target as HTMLElement).closest('[data-id]') as HTMLElement
    )?.dataset?.id;
    if (idElem) {
      document.querySelectorAll(`[data-id="${idElem}"]`).forEach((el) => {
        if (add) {
          el.classList.add('hovered');
        } else {
          el.classList.remove('hovered');
        }
      });
    }
  }
}

export { addElement, elemToHtmlViewer, illuminateElementsAndCode };
