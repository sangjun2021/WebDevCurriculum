import List from "./List.js";

class File {
  #list;
  constructor(targetElement) {
    this.#list = new List({
      targetElement,
      className: "file",
      deleteEvent: "onDeleteFile",
      clickEvent: "onClickFile",
      storage: window.localStorage,
    });
  }
  setState(id) {
    this.#list.setState(id);
  }
}

export default File;
