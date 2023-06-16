function addElement(tagName: string, className: string): HTMLElement {
  const elem: HTMLElement = document.createElement(tagName);
  elem.classList.add(className);
  return elem;
}

function util() {}

export { addElement, util };
