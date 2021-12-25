const userModel = require("../models/user");
const postModel = require("../models/post");
const { sequelize } = require("../models/index");

class Service {
  #userModel;
  #postModel;
  constructor(userModel, postModel) {
    this.#userModel = userModel;
    this.#postModel = postModel;
    this.#init();
  }
  async #init() {
    await sequelize.sync({ force: true });
    console.log("All models were synchronized successfully.");
    await this.createUser(
      "user1",
      "39gie",
      "8a01051db9f80adc3aa9860d8f2dd6cf077a5a1a92c235058a659ea0be2b28ba537f3a415c2efdc8ecb5f493b87a0589e040753352bbc2d88289bd05a6c147bb"
    );
    await this.createUser(
      "user2",
      "1wi2x",
      "0c7f6cbfbaf5b1b361f2ba41dcdd3264cc499e1c76517761cf2b83102d3797913ac8fa9023c78e1e8c0a4723380d4b175ef2d77654390eecccf9e8aadc043385"
    );
    await this.createUser(
      "user3",
      "cj2if",
      "b093d082f000c87c9f9d01bcd829b25eec290d27c54c588fced9a581934d50398a18405bfc97d979220443bbd6ffc8afe846b55262f78c060972ac95bbff9316"
    );
    console.log("user info insert complete");
  }
  async createUser(username, salt, password) {
    try {
      this.#userModel.create({
        username,
        salt,
        password,
      });
    } catch (e) {
      console.log("userModel insert error : ", e.message);
    }
  }
  async getUserId(username) {
    try {
      const currentUser = await this.#userModel.findOne({
        attributes: ["id"],
        where: {
          username: username,
        },
      });
      const { id } = currentUser.dataValues;
      return id;
    } catch (e) {
      console.log("userModel select error : ", e.message);
    }
  }
  async getUserPasswordList() {
    try {
      const result = await this.#userModel.findAll({
        attributes: ["username", "salt", "password"],
      });
      const listObject = {};
      result.forEach((record) => {
        const username = record.dataValues.username;
        const password = record.dataValues.password;
        const salt = record.dataValues.salt;
        listObject[username] = { password, salt };
      });
      return listObject;
    } catch (e) {
      console.log("userModel select error : ", e.message);
    }
  }
  async getPost(id, userId) {
    try {
      const result = await this.#postModel.findOne({
        attributes: ["id", "title", "text"],
        where: {
          id: id,
          userId: userId,
        },
      });
      return result.dataValues;
    } catch (e) {
      console.log("postModel select error: ", e.message);
    }
  }
  async deletePost(id, userId) {
    try {
      await this.#postModel.destroy({
        where: {
          id: id,
          userId: userId,
        },
      });
    } catch (e) {
      console.log("postModel delete error : ", e.message);
    }
  }
  async updatePost(id, payLoad, userId) {
    try {
      await this.#postModel.update(
        { title: payLoad.title, text: payLoad.text },
        {
          where: {
            id: id,
            userId: userId,
          },
        }
      );
    } catch (e) {
      console.log("post update error : ", e.message);
    }
  }
  async insertPost(id, payLoad, userId) {
    try {
      await this.#postModel.create({
        id,
        title: payLoad.title,
        text: payLoad.text,
        userId: userId,
      });
    } catch (e) {
      console.log("postModel insert error : ", e.message);
    }
  }
  async getPostList(userId) {
    try {
      const result = await this.#postModel.findAll({
        attributes: ["id", "title"],
        where: {
          userId: userId,
        },
      });
      const listArray = [];
      result.forEach((record) => {
        const id = record.dataValues.id;
        const title = record.dataValues.title;
        listArray.push({ id, title });
      });
      return listArray;
    } catch (e) {
      console.log("postModel select error: ", e.message);
    }
  }
}
const service = new Service(userModel, postModel);
module.exports = service;
