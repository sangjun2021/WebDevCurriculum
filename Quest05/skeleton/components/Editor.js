class Editor {
  #targetElement;
  #state;
  constructor({ targetElement, onInput }) {
    this.#targetElement = targetElement;
    this.#targetElement.addEventListener("input", (e) =>
      onInput(e.target.innerText)
    );
  }
  render() {
    this.#targetElement.innerText = this.#state.text || "";
  }
  setState(nextState) {
    this.#state = nextState;
    this.render();
  }
}

export default Editor;
