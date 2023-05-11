import Minesweeper from './Minesweeper';
import { addElement } from './utilits';

export default function app() {
  const main = addElement('div', 'main');
  document.body.append(main);
  const minesweeper = new Minesweeper(main);
}
