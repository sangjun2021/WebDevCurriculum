import Event from "../utils/Event.js";

class Button {
  #targetElement;
  #event = new Event();
  constructor(targetElement) {
    this.#targetElement = targetElement;
  }
  createButton(text) {
    const listElement = document.createElement("li");
    const buttonElement = document.createElement("button");
    buttonElement.classList.add("button");
    buttonElement.innerText = text;
    buttonElement.addEventListener("click", () => {
      this.#event.dispatch(text);
    });
    listElement.appendChild(buttonElement);
    this.#targetElement.appendChild(listElement);
  }
}

export default Button;
