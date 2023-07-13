function addElement(
  tagName: string,
  className?: string | string[],
  textContent?: string,
): HTMLElement {
  const elem: HTMLElement = document.createElement(tagName);
  if (className) {
    if (Array.isArray(className)) {
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

function getRandomNumber(numder: number): number {
  return Math.round(Math.random() * numder);
}

function getRandomColor(): string {
  const values = '0123456789ABCDEF';
  let res = '#';
  while (res.length < 7) {
    res += values[getRandomNumber(15)];
  }
  return res;
}

export { addElement, getRandomNumber, getRandomColor };
