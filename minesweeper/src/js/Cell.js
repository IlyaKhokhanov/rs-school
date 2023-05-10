export default class Cell {
  constructor(board, x, y, value = '', isOpen = false) {
    this.board = board;
    this.x = x;
    this.y = y;
    this.value = value;
    this.isOpen = isOpen;
  }
}
