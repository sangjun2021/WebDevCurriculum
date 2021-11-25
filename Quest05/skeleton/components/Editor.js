class Editor {
  #targetElement;
  #file;
  constructor({ targetElement, onInput }) {
    this.#targetElement = targetElement;
    this.#targetElement.addEventListener("input", (e) =>
      onInput(e.target.innerText)
    );
  }
  render() {
    this.#targetElement.innerText = this.#file.text || "";
  }
  setState(nextState) {
    this.#file = nextState;
    this.render();
  }
  get text() {
    return this.#targetElement.innerText;
  }
}

export default Editor;
