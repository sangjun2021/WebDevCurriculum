const userModel = require("../models/user");
class UserService {
  #userModel;
  constructor(userModel) {
    this.#userModel = userModel;
  }
  async createUser(username, salt, password) {
    try {
      this.#userModel.create({
        username,
        salt,
        password,
      });
    } catch (e) {
      console.log("userService insert error : ", e.message);
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
      console.log("userService select error : ", e.message);
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
      console.log("userService select error : ", e.message);
    }
  }
}
const userService = new UserService(userModel);
module.exports = userService;
