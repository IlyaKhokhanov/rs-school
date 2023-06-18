function addElement(tagName: string, className?: string): HTMLElement {
  const elem: HTMLElement = document.createElement(tagName);
  if (className) elem.classList.add(className);
  return elem;
}

function util() {}

export { addElement, util };
