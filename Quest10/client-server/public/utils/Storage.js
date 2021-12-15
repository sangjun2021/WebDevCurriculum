import Event from "./Event.js";

class Storage {
  #storage;
  #key;
  #event = new Event();
  constructor(storage) {
    this.#storage = storage;
    this.#onKey();
  }
  getList() {
    try {
      const list = JSON.parse(this.#storage.getItem(this.#key)) || [];
      return list;
    } catch (e) {
      console.log(e.message);
      return [];
    }
  }
  #onKey() {
    this.#event.setEvent("onKey", (e) => {
      this.#setKey(e.detail);
    });
  }
  #setKey(key) {
    this.#key = key;
  }
  #setList(nextState) {
    this.#storage.setItem(this.#key, JSON.stringify(nextState));
  }
  insertFile(nextFile) {
    const prevState = this.getList();
    const isExist = prevState.find((file) => file.id === nextFile.id);
    if (isExist) return;
    const nextState = [...prevState, nextFile];
    this.#setList(nextState);
    return nextState;
  }
  createFile({ title = "untitled", text = "" }) {
    const id = this.#makeId();
    const file = {
      title,
      text,
      id,
      isEdited: false,
    };
    this.insertFile(file);
    return file;
  }
  getFile(id) {
    const nextFile = this.getList().find((file) => file.id === id);
    return nextFile;
  }
  checkOverLap(title) {
    const prevState = this.getList().find((file) => file.title === title);
    if (prevState) throw new Error("중복된 파일이름입니다.");
    return prevState;
  }
  updateFile({ id, title, text, edit }) {
    let result;
    const prevState = this.getList();
    const nextState = prevState.map((file) => {
      if (file.id !== id) return file;
      file.title = title || file.title;
      file.text = text || file.text;
      file.isEdited = edit;
      result = file;
      return file;
    });
    this.#setList(nextState);
    return result;
  }
  removeFile(id) {
    const prevState = this.getList();
    const nextState = prevState.filter((file) => file.id !== id);
    this.#setList(nextState);
  }
  #makeId() {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  }
}

export default Storage;
