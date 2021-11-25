class Tab {
  #state;
  #targetElement;
  #store;
  constructor({ targetElement, initialState, onClick, onCloseTab, store }) {
    this.#state = initialState;
    this.#targetElement = targetElement;
    this.#store = store;
    targetElement.addEventListener("click", (e) => {
      const id = e.target.closest("li").dataset.id;
      if (e.target.id === "js-close-button") onCloseTab(id);
      else onClick(id);
    });
  }
  render() {
    try {
      this.#targetElement.innerHTML = this.#state
        .map((file) => {
          if (typeof file.title !== "string") {
            console.log(file.title);
            throw new Error("리스트에는 문자만 들어와야합니다.");
          }
          return `<li class="tab" data-id="${file.id}">
          <span class="indicator ${file.isEdited ? "edited" : ""}">${
            file.title
          }</span>
            <button id="js-close-button" class=>X</button>
          </li>`;
        })
        .join("");
    } catch (e) {
      console.log(e.message);
    }
  }
  setState(nextState) {
    this.#state = nextState;
    this.render();
  }
}

export default Tab;
