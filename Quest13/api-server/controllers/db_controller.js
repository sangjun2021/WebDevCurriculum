const postController = require("./post_controller");
const userController = require("./user_controller");
const { sequelize } = require("../models/base");
class DbController {
  #postController;
  #userController;
  #currentUser;
  constructor(postController, userController) {
    this.#postController = postController;
    this.#userController = userController;
    this.#init();
  }
  async #init() {
    try {
      await sequelize.sync({ force: true });
      console.log("All models were synchronized successfully.");
      await this.#userController.createUser(
        "user1",
        "39gie",
        "8a01051db9f80adc3aa9860d8f2dd6cf077a5a1a92c235058a659ea0be2b28ba537f3a415c2efdc8ecb5f493b87a0589e040753352bbc2d88289bd05a6c147bb"
      );
      await this.#userController.createUser(
        "user2",
        "1wi2x",
        "0c7f6cbfbaf5b1b361f2ba41dcdd3264cc499e1c76517761cf2b83102d3797913ac8fa9023c78e1e8c0a4723380d4b175ef2d77654390eecccf9e8aadc043385"
      );
      await this.#userController.createUser(
        "user3",
        "cj2if",
        "b093d082f000c87c9f9d01bcd829b25eec290d27c54c588fced9a581934d50398a18405bfc97d979220443bbd6ffc8afe846b55262f78c060972ac95bbff9316"
      );
      console.log("user info insert complete");
    } catch (e) {
      console.log("controller init error : ", e.message);
    }
  }
  async createUser(username, salt, password) {
    await this.#userController.createUser(username, salt, password);
  }
  async setUser(username) {
    const userId = await this.#userController.getUserId(username);
    this.#currentUser = userId;
  }
  async getUserPasswordList() {
    return await this.#userController.getUserPasswordList();
  }
  async getFile(id) {
    const result = await this.#postController.getPost(id, this.#currentUser);
    return result;
  }
  async deleteFile(id) {
    await this.#postController.deletePost(id, this.#currentUser);
  }
  async writeFile(id, payLoad) {
    await this.#postController.writePost(id, payLoad, this.#currentUser);
  }

  async getFileList() {
    return await this.#postController.getPostList(this.#currentUser);
  }
}
const dbController = new DbController(postController, userController);

module.exports = dbController;
