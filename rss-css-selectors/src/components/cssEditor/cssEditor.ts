import { addElement } from '../../utils/utils';
import './cssEditor.scss';

export default class CssEditor {
  constructor(public container: HTMLElement) {
    this.CssEditor();
  }

  CssEditor() {
    const cssEditorWrapper = addElement('div', 'css-editor-wrapper');
    const cssEditorHeaderBlock = addElement('div', 'css-editor-header-block');
    const cssEditorHeader = addElement('h2', 'css-editor-header', 'CSS Editor');
    const cssEditorHeaderFile = addElement(
      'span',
      'css-editor-header-file',
      'field.html'
    );

    cssEditorHeaderBlock.append(cssEditorHeader, cssEditorHeaderFile);

    const cssEditorCodeWrapper = addElement('div', 'css-editor-code-wrapper');
    const cssEditorNumbers = addElement('div', 'css-editor-code-numbers');

    for (let i = 1; i <= 19; i += 1) {
      const numberEl = addElement('div', 'css-editor-code-number', String(i));
      cssEditorNumbers.append(numberEl);
    }

    const cssEditorCode = addElement('div', 'css-editor-code');

    const cssEditorInputWrapper = addElement('div', 'css-editor-code-input-wrapper');

    const cssEditorInput = addElement('input', 'css-editor-code-input');
    cssEditorInput.setAttribute('placeholder', 'Type in a CSS selector');

    const cssEditorInputBtn = addElement('button', 'css-editor-code-input-btn');

    cssEditorInputBtn.textContent = 'Enter';

    cssEditorInputWrapper.append(cssEditorInput, cssEditorInputBtn);

    const cssEditorCodeVal = addElement('div', 'css-editor-code-value');

    cssEditorCodeVal.textContent = '{\n/* Styles would go here. */\n}';

    cssEditorCode.append(cssEditorInputWrapper, cssEditorCodeVal);

    cssEditorCodeWrapper.append(cssEditorNumbers, cssEditorCode);
    cssEditorWrapper.append(cssEditorHeaderBlock, cssEditorCodeWrapper);
    this.container.append(cssEditorWrapper);
  }
}
