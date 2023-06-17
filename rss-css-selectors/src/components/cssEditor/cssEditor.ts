import { addElement } from '../../utils/utils';
import './cssEditor.scss';

export default class CssEditor {
  constructor(public container: HTMLElement) {
    this.CssEditor();
  }

  CssEditor() {
    const cssEditorWrapper = addElement('div', 'css-editor-wrapper');

    this.container.append(cssEditorWrapper);
  }
}
