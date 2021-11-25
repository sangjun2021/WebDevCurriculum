class Files {
  #targetElement;
  #state;
  constructor({ targetElement, state }) {
    this.#targetElement = targetElement;
    this.#state = state;
  }
  render() {}
  setState(nextState) {
    this.#state = nextState;
    this.render();
  }
}

export default Files;
