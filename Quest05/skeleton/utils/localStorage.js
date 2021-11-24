class Storage {
  #storage;
  constructor(storage) {
    this.#storage = storage;
  }
  getStore(key) {
    try {
      if (!key) throw new Error("key값이 유호하지 않습니다.");
      return this.#storage.getItem(key) || "데이터가 없습니다.";
    } catch (e) {
      console.log(e.message);
      return "데이터가 없습니다.";
    }
  }
  setStore(key, value) {
    try {
      if (!key) throw new Error("key값이 유호하지 않습니다.");
      this.#storage.setItem(key, value || "데이터가 없습니다.");
      return true;
    } catch (e) {
      console.log(e.message);
      return false;
    }
  }

  getStoreList() {
    try {
      if (this.#storage.length < 1)
        throw new Error("저장된 파일 목록이 없습니다.");
      const result = [];
      for (let i = 0; i < this.#storage.length; i++) {
        result.push(this.#storage.key(i));
      }
      return result;
    } catch (e) {
      console.log(e.message);
      return [];
    }
  }
}

export default Storage;
