import List from "./List.js";
import API from "../api/index.js";
class File {
  #list;
  #API = new API("http://localhost:8080");
  constructor(targetElement) {
    this.#list = new List({
      targetElement,
      className: "file",
      deleteEvent: "onDeleteFile",
      clickEvent: "onClickFile",
      storage: window.localStorage,
    });
  }
  async setState(id) {
    const list = await this.#API.getFileList();
    this.#list.setStateByApi(list);
  }
}

export default File;
