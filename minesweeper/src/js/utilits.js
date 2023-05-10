export function getRandom(max) {
  return Math.floor(Math.random() * (max + 1));
}

export function addElement(tagName, className) {
  const elem = document.createElement(tagName);
  elem.classList.add(className);
  return elem;
}

// export function checkCells(x, y, matrix, callback) {
//   let count = 0
// }
