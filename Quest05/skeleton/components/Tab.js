class Tab {
  #name;
  #editted = false;
  #targetElement;
  constructor(targetElement, name) {
    this.#name = name;
    this.#targetElement = targetElement;
  }
}

export default Tab;
