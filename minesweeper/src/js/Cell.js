export default class Cell {
  constructor(x, y, value = 0, isOpen = false, isFlag = false) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.isOpen = isOpen;
    this.isFlag = isFlag;
  }

  open() {
    this.isOpen = true;
  }
}
