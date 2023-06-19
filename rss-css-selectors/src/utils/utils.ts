function addElement(
  tagName: string,
  className?: string,
  textContent?: string,
): HTMLElement {
  const elem: HTMLElement = document.createElement(tagName);
  if (className) elem.classList.add(className);
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

export { addElement, elemToHtmlViewer };
