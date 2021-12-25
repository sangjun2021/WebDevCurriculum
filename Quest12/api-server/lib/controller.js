class Controller {
  #currentUser;
  #service;
  constructor(service) {
    this.#service = service;
  }
  async createUser(username, salt, password) {
    await this.#service.createUser(username, salt, password);
  }
  async getFile(id) {
    const result = await this.#service.getPost(id, this.#currentUser);
    return JSON.stringify(result);
  }
  async setUser(username) {
    const userId = await this.#service.getUserId(username);
    this.#currentUser = userId;
  }
  async getUserPasswordList() {
    const result = await this.#service.getUserPasswordList();
    return JSON.stringify(result);
  }
  async deleteFile(id) {
    await this.#service.deletePost(id, this.#currentUser);
  }
  async writeFile(id, payLoad) {
    const isExist = await this.#service.getPost(id, this.#currentUser);
    if (isExist) await this.#service.updatePost(id, payLoad, this.#currentUser);
    else await this.#service.insertPost(id, payLoad, this.#currentUser);
  }

  async getFileList() {
    const result = await this.#service.getPostList(this.#currentUser);
    return JSON.stringify(result);
  }
}

module.exports = Controller;
