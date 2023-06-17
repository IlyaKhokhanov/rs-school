import { addElement } from '../../utils/utils';
import './htmlViewer.scss';

export default class HtmlViewer {
  constructor(public container: HTMLElement) {
    this.initHtmlViewer();
  }

  initHtmlViewer() {
    const htmlViewerWrapper = addElement('div', 'html-viewer-wrapper');

    this.container.append(htmlViewerWrapper);
  }
}
