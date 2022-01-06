import { elementType } from '../types';

class Element implements elementType {
  editorTarget : HTMLElement = document.createElement('div');

  tabTarget : HTMLElement = document.createElement('ul');

  buttonTarget : HTMLElement = document.createElement('ul');

  filesTarget : HTMLElement = document.createElement('ul');

  constructor() {
    this.createElement(this.editorTarget, document.querySelector('.editor-container'), 'text-editor');
    this.createElement(this.tabTarget, document.querySelector('.tab-container'), 'tab-list');
    this.createElement(this.buttonTarget, document.querySelector('.left-sidebar'), 'button-container');
    this.createElement(this.filesTarget, document.querySelector('.left-sidebar'), 'file-container');
    this.makeContentEditable(this.editorTarget);
  }

  private createElement(childElement : HTMLElement, targetElement : HTMLElement | null, className : string) : void {
    childElement.classList.add(className);
    targetElement?.appendChild(childElement);
  }

  private makeContentEditable(element : HTMLElement) : void {
    element.setAttribute('data-placeholder', '내용을 입력해주세요');
    element.setAttribute('contenteditable', 'true');
    element.setAttribute('tabindex', '0');
  }
}

export default Element;
