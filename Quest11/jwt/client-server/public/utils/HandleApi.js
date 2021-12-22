class HandleApi {
  #API;
  constructor(api) {
    this.#API = api;
  }
  async getList() {
    return await this.#API.getFileList();
  }
  async insertFile(nextFile) {
    return await this.#API.createFile(nextFile);
  }
  async login(username, password) {
    try {
      const result = await this.#API.login(username, password);
      return result;
    } catch (e) {
      return false;
    }
  }
  async auth() {
    return await this.#API.auth();
  }
  async logOut() {
    return await this.#API.logOut();
  }
  async createFile() {
    const file = {
      title: "untitled",
      text: "",
      isEdited: false,
    };
    const data = await this.insertFile(file);
    return JSON.parse(data);
  }
  async getFile(id) {
    const data = await this.#API.getFile(id);
    return JSON.parse(data);
  }
  async checkOverLap(title) {
    return await this.#API.CheckOverLap(title);
  }
  async updateFile(data) {
    return await this.#API.updateFile(data);
  }
  async removeFile(id) {
    return await this.#API.deleteFile(id);
  }
}

export default HandleApi;
