import List from "./List.js";
class File {
  #list;
  #API;
  constructor(targetElement, api) {
    this.#API = api;
    this.#list = new List({
      targetElement,
      className: "file",
      deleteEvent: "onDeleteFile",
      clickEvent: "onClickFile",
      storage: window.localStorage,
    });
  }
  async setState() {
    const list = await this.#API.getList();
    this.#list.setStateByList(list);
  }
  logout() {
    this.#list.setStateByList([]);
  }
}

export default File;
