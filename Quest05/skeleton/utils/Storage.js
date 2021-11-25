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
  setList(nextState) {
    this.#storage.setItem(this.#key, JSON.stringify(nextState));
  }
  insertFile(file) {
    const prevState = this.getList();
    const nextState = [...prevState, file];
    this.setList(nextState);
  }
  createFile({ title, text }) {
    try {
      const id = this.makeId();
      const file = {
        title,
        text,
        id,
        isEdited: false,
      };
      this.insertFile(file);
      return file;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }
  getFile(id) {
    try {
      const prevState = this.getList();
      return prevState.find((file) => file.id === id) || false;
    } catch (e) {
      console.log(e.message);
      return [];
    }
  }
  saveFile({ id, title, text }) {
    let result;
    const prevState = this.getList();
    const nextState = prevState.map((file) => {
      if (file.id !== id) return file;
      file.title = title || file.title;
      file.text = text || text;
      file.isEdited = false;
      result = file;
      return file;
    });
    this.setList(nextState);
    return result;
  }
  removeFile(id) {
    const prevState = this.getList();
    const nextState = prevState.filter((file) => file.id !== id);
    this.setList(nextState);
    return nextState;
  }
  makeId() {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  }
}

export default Storage;
