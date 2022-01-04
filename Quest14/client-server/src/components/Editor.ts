import Storage from '../utils/Storage.js';
import Event from '../utils/Event.js';

class Editor {
  #targetElement : HTMLElement;

  #Storage = new Storage(window.localStorage);

  #state = {};

  #event = new Event();

  constructor(targetElement :HTMLElement) {
    this.#targetElement = targetElement;
    this.#targetElement.addEventListener('input', (e : Event) => {
      this.#onInput(e.target.innerText);
    });
  }

  #onInput(text :string) {
    const nextState = this.#Storage.updateFile({
      id: this.#state.id,
      text,
      title: this.#state.title,
      edit: true,
    });
    this.#event.dispatch('updateText', nextState.text);
  }

  #render() {
    this.#targetElement.innerText = this.#state.text || '';
  }

  setState(id : string) {
    this.#state = this.#Storage.getFile(id) || { text: null };
    this.#render();
  }
}

export default Editor;
