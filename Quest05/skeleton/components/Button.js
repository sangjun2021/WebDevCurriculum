class Button {
  #onClick;
  #targetElement;
  constructor(targetElement, onClick) {
    this.#targetElement = targetElement;
    this.#onClick = onClick;
  }
}

export default Button;
