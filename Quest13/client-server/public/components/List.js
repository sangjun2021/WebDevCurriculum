import Storage from "../utils/Storage.js";
import Event from "../utils/Event.js";
class List {
  #className;
  #deleteEvent;
  #clickEvent;
  #state;
  #targetElement;
  #event = new Event();
  #storage;
  constructor({ targetElement, className, deleteEvent, clickEvent, storage }) {
    this.#targetElement = targetElement;
    this.#className = className;
    this.#deleteEvent = deleteEvent;
    this.#clickEvent = clickEvent;
    this.#storage = new Storage(storage);
    this.#render();
    this.#setEvent();
  }
  #setEvent() {
    this.#targetElement.addEventListener("click", (e) => {
      const id = e.target.closest("li").dataset.id;
      if (e.target.id === "js-close-button") {
        this.#event.dispatch(this.#deleteEvent, id);
      } else {
        this.#event.dispatch(this.#clickEvent, id);
      }
    });
  }
  #render() {
    try {
      this.#targetElement.innerHTML = this.#state
        .map((file) => {
          return `<li class="${this.#className} ${
            file.isSelected ? "js-selected" : ""
          }" data-id="${file.id}">
          <span class="title ${file.isEdited ? "js-edited" : ""}">${
            file.title
          }</span>
            <button id="js-close-button" class=>X</button>
          </li>`;
        })
        .join("");
    } catch (e) {
      console.log(e.message);
      return;
    }
  }
  setState(id) {
    const nextState = this.#storage.getList().map((tab) => {
      if (tab.id !== id) return { ...tab, isSelected: false };
      return { ...tab, isSelected: true };
    });
    this.#storage.setCurrentPage(id);
    this.#state = nextState;
    this.#render();
  }
  setStateByList(nextState) {
    this.#state = nextState;
    this.#render();
  }
}

export default List;
