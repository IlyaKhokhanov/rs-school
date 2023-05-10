import Board from './Board';
import { addElement } from './utilits';

export default function app() {
  const main = addElement('div', 'main');
  document.body.append(main);
  const board = new Board(main, 10);
}
