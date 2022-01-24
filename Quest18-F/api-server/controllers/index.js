const dbController = require("./db_controller");
const hashController = require("./hash_controller");
const jwtController = require("./jwt_controller");
class Controller {
  #dataController;
  #hashController;
  #jwtController;
  constructor(dataController, hashController, jwtController) {
    this.#dataController = dataController;
    this.#hashController = hashController;
    this.#jwtController = jwtController;
  }
  async getFile(id) {
    return this.#dataController.getFile(id);
  }
  async setUser(user) {
    return await this.#dataController.setUser(user);
  }
  async getUserPasswordList() {
    return await this.#dataController.getUserPasswordList();
  }
  async deleteFile(id) {
    return await this.#dataController.deleteFile(id);
  }
  async writeFile(id, payLoad) {
    return await this.#dataController.writeFile(id, payLoad);
  }
  async getFileList() {
    return await this.#dataController.getFileList();
  }
  async createKey(key, salt) {
    return await this.#hashController.createToken(key, salt);
  }
  async validateKey(key, salt, value) {
    return await this.#hashController.validateKey(key, salt, value);
  }
  createToken(username) {
    return this.#jwtController.createToken(username);
  }
  validateToken(token) {
    return this.#jwtController.validateToken(token);
  }
}

const controller = new Controller(dbController, hashController, jwtController);

module.exports = controller;
