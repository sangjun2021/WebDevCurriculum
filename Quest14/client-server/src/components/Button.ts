import Event from '../utils/Event.js';
import { eventNameType, eventType } from '../types/event';
import { buttonType } from '../types/button';

class Button implements buttonType {
  private targetElement : HTMLElement;

  private event : eventType = new Event();

  constructor(targetElement : HTMLElement) {
    this.targetElement = targetElement;
  }

  createButton(text : eventNameType) : void {
    const listElement : HTMLElement = document.createElement('li');
    const buttonElement : HTMLElement = document.createElement('button');
    buttonElement.classList.add('button');
    buttonElement.innerText = text;
    buttonElement.addEventListener('click', () => {
      this.event.dispatch(text, null);
    });
    listElement.appendChild(buttonElement);
    this.targetElement.appendChild(listElement);
  }
}

export default Button;
