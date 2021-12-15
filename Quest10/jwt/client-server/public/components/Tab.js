import List from "./List.js";

class Tab {
  #list;
  constructor(targetElement) {
    this.#list = new List({
      targetElement,
      className: "tab",
      deleteEvent: "onDeleteTab",
      clickEvent: "onClickTab",
      storage: window.localStorage,
    });
  }
  setState(id) {
    this.#list.setState(id);
  }
}

export default Tab;
