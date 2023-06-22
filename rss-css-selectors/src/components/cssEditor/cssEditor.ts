import { addElement } from '../../utils/utils';
import './cssEditor.scss';

export default class CssEditor {
  private cssEditorInput: HTMLInputElement | null = null;

  constructor(private container: HTMLElement) {}

  public initCssEditor(answer: string[]) {
    const cssEditorWrapper = addElement('div', 'css-editor-wrapper');
    const cssEditorHeaderBlock = addElement('div', 'css-editor-header-block');
    const cssEditorHeader = addElement('h2', 'css-editor-header', 'CSS Editor');
    const cssEditorHeaderFile = addElement(
      'span',
      'css-editor-header-file',
      'style.css'
    );

    cssEditorHeaderBlock.append(cssEditorHeader, cssEditorHeaderFile);

    const cssEditorCodeWrapper = addElement('div', 'css-editor-code-wrapper');
    const cssEditorNumbers = addElement('div', 'css-editor-code-numbers');

    for (let i = 1; i <= 19; i += 1) {
      const numberEl = addElement('div', 'css-editor-code-number', String(i));
      cssEditorNumbers.append(numberEl);
    }

    const cssEditorCode = addElement('div', 'css-editor-code');
    cssEditorCode.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.checkAnswer(answer);
      }
    });

    const cssEditorInputWrapper = addElement(
      'div',
      'css-editor-code-input-wrapper'
    );

    this.cssEditorInput = document.createElement('input');
    this.cssEditorInput.classList.add('css-editor-code-input');
    this.cssEditorInput.setAttribute('placeholder', 'Type in a CSS selector');

    const cssEditorInputBtn = addElement('button', 'css-editor-code-input-btn');
    cssEditorInputBtn.textContent = 'Enter';
    cssEditorInputBtn.addEventListener('click', () => this.checkAnswer(answer));

    cssEditorInputWrapper.append(this.cssEditorInput, cssEditorInputBtn);

    const cssEditorCodeVal = addElement('div', 'css-editor-code-value');

    cssEditorCodeVal.textContent = '{\n/* Styles would go here. */\n}';

    cssEditorCode.append(cssEditorInputWrapper, cssEditorCodeVal);

    cssEditorCodeWrapper.append(cssEditorNumbers, cssEditorCode);
    cssEditorWrapper.append(cssEditorHeaderBlock, cssEditorCodeWrapper);
    this.container.append(cssEditorWrapper);
  }

  private checkAnswer(answer: string[]) {
    if (this.cssEditorInput?.value) {
      if (
        answer.includes(
          this.cssEditorInput.value
            .split(' ')
            .map((item) => item.trim())
            .join(' ')
        )
      ) {
        console.log('win');
      } else {
        console.log('lose');
      }
    }
  }
}
