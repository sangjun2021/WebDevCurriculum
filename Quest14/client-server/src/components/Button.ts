import Event from '../utils/Event';

class Button {
  #targetElement : HTMLElement;

  #event = new Event();

  constructor(targetElement : HTMLElement) {
    this.#targetElement = targetElement;
  }

  createButton(text : string) {
    const listElement = document.createElement('li');
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('button');
    buttonElement.innerText = text;
    buttonElement.addEventListener('click', () => {
      this.#event.dispatch(text);
    });
    listElement.appendChild(buttonElement);
    this.#targetElement.appendChild(listElement);
  }
}

export default Button;
