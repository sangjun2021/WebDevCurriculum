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
    try {
      const nextState = this.#sessionStorage.saveFile({
        id: this.#state.id,
        text,
        edit: true,
      });
      this.setState(nextState);
    } catch (e) {
      console.log(e.message);
      return;
    }
  }
  #render() {
    this.#targetElement.innerText = this.#state.text || "";
  }
  setState(id) {
    const nextState = this.#sessionStorage.getFile(id);
    this.#state = nextState;
    this.#event.dispatch("updateFile", this.#state);
    this.#render();
  }
}

export default Editor;
