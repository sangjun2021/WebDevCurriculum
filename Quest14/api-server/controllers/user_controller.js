const userService = require("../services/user_service");
class UserController {
  #service;
  #currentUser;
  constructor(userService) {
    this.#service = userService;
  }
  async createUser(username, salt, password) {
    await this.#service.createUser(username, salt, password);
  }
  async getUserPasswordList() {
    return await this.#service.getUserPasswordList();
  }
  async getUserId(username) {
    return await this.#service.getUser(username);
  }
  async setUser(username) {
    const userId = await this.#service.getUserId(username);
    this.#currentUser = userId;
  }
}
const userController = new UserController(userService);
module.exports = userController;
