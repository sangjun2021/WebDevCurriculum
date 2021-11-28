import Storage from "../utils/Storage.js";
import Event from "../utils/Event.js";
class Files {
  #state;
  #targetElement;
  #event = new Event();
  #localStorage = new Storage(window.localStorage);
  constructor(targetElement) {
    this.#targetElement = targetElement;
    this.#targetElement.addEventListener("click", (e) => {
      const id = e.target.closest("li").dataset.id;
      if (e.target.id === "js-close-button") {
        this.#event.dispatch("onDeleteFile", id);
      } else {
        this.#event.dispatch("onClickFile", id);
      }
    });
  }
  #render() {
    try {
      this.#targetElement.innerHTML = this.#state
        .map((file) => {
          return `<li class="file ${
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
    const nextState = this.#localStorage.getList().map((tab) => {
      if (tab.id !== id) return { ...tab, isSelected: false };
      return { ...tab, isSelected: true };
    });
    this.#state = nextState;
    this.#render();
  }
}

export default Files;
