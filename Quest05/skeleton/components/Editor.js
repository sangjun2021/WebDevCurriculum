import Storage from "../utils/Storage.js";
import Event from "../utils/Event.js";
class Editor {
  #targetElement;
  #sessionStorage = new Storage(window.sessionStorage);
  #state = {};
  #event = new Event();
  constructor(targetElement) {
    this.#targetElement = targetElement;
    this.#targetElement.addEventListener("input", (e) => {
      this.#onInput(e.target.innerText);
    });
  }
  #onInput(text) {
    const nextState = this.#sessionStorage.updateFile({
      id: this.#state.id,
      text,
      title: this.#state.title,
      edit: true,
    });
    this.#event.dispatch("updateText", nextState.text);
  }
  #render() {
    this.#targetElement.innerText = this.#state.text || "";
  }
  setState(id) {
    if (!id) return;
    this.#state = this.#sessionStorage.getFile(id);
    this.#render();
  }
}

export default Editor;
