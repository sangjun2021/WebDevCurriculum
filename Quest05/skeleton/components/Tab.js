import Storage from "../utils/Storage.js";
import Event from "../utils/Event.js";
class Tab {
  #state;
  #targetElement;
  #event = new Event();
  #sessionStorage = new Storage(window.sessionStorage);
  constructor(targetElement) {
    this.#targetElement = targetElement;
    this.#targetElement.addEventListener("click", (e) => {
      const id = e.target.closest("li").dataset.id;
      if (e.target.id === "js-close-button") {
        this.#event.dispatch("deleteTab", id);
      } else {
        this.#event.dispatch("deleteTab", id);
      }
    });
  }
  #render() {
    try {
      this.#targetElement.innerHTML = this.#state
        .map((file) => {
          if (typeof file.title !== "string") {
            throw new Error("파일제목에는 문자만 들어와야합니다.");
          }
          return `<li class="tab ${
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
    const nextState = this.#sessionStorage.getList().map((tab) => {
      if (tab.id !== id) return { ...tab, isSelected: false };
      return { ...tab, isSelected: true };
    });
    this.#state = nextState;
    this.#render();
  }
}

export default Tab;
