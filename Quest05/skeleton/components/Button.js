class Button {
  #targetElement;
  constructor({ targetElement }) {
    this.#targetElement = targetElement;
  }
  createButton({ callback, text }) {
    const listElement = document.createElement("li");
    const buttonElement = document.createElement("button");
    buttonElement.classList.add("button");
    buttonElement.innerText = text;
    buttonElement.addEventListener("click", (e) => {
      callback(e);
    });
    listElement.appendChild(buttonElement);
    this.#targetElement.appendChild(listElement);
  }
}

export default Button;
