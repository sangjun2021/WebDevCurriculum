class Storage {
  #storage;
  #key = "notepad";
  constructor(storage) {
    this.#storage = storage;
  }
  getList() {
    try {
      return JSON.parse(this.#storage.getItem(this.#key)) || [];
    } catch (e) {
      console.log(e.message);
      return [];
    }
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
  #checkOverLap(title) {
    const prevState = this.getList().find((file) => file.title === title);
    return prevState;
  }
  updateFile({ id, title, text, edit }) {
    if (this.#checkOverLap(title)) {
      throw new Error("중복된 제목입니다.");
      return;
    }
    const prevState = this.getList();
    const nextState = prevState.map((file) => {
      if (file.id !== id) return file;
      file.title = title || file.title;
      file.text = text || file.text;
      file.isEdited = edit;
      file.text = text === "" ? "" : file.text;
      return file;
    });
    this.#setList(nextState);
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
