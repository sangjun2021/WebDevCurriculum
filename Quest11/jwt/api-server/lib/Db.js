const { DataTypes } = require("sequelize");

class Db {
  #dataBase;
  #currentUser;
  #userTable;
  #postTable;
  constructor(sequelize) {
    this.#dataBase = sequelize;
    this.#initTable();
  }
  async #createUser(username, password) {
    try {
      await this.#userTable.create({
        username,
        password,
      });
    } catch (e) {
      console.log("user insert error : ", e.message);
    }
  }
  async getFile(id) {
    try {
      const result = await this.#postTable.findOne({
        attributes: ["id", "title", "text"],
        where: {
          id: id,
          userId: this.#currentUser,
        },
      });
      return JSON.stringify(result.dataValues);
    } catch (e) {
      console.log("post select error: ", e.message);
    }
  }
  async setUser(user) {
    const currentUser = await this.#userTable.findOne({
      attributes: ["id"],
      where: {
        username: user,
      },
    });
    const { id } = currentUser.dataValues;
    this.#currentUser = id;
    return true;
  }
  getUser() {
    return this.#currentUser;
  }
  async getUserPasswordList() {
    const result = await this.#userTable.findAll({
      attributes: ["username", "password"],
    });
    const listObject = {};
    result.forEach((record) => {
      const username = record.dataValues.username;
      const password = record.dataValues.password;
      listObject[username] = password;
    });
    return JSON.stringify(listObject);
  }
  async deleteFile(id) {
    await this.#postTable.destroy({
      where: {
        id: id,
        userId: this.#currentUser,
      },
    });
  }
  async writeFile(id, payLoad) {
    const isExist = await this.getFile(id);
    if (isExist) {
      try {
        await this.#postTable.update(
          { title: payLoad.title, text: payLoad.text },
          {
            where: {
              id: id,
              userId: this.#currentUser,
            },
          }
        );
      } catch (e) {
        console.log("post update error : ", e.message);
      }
    } else {
      try {
        await this.#postTable.create({
          id,
          title: payLoad.title,
          text: payLoad.text,
          userId: this.#currentUser,
        });
      } catch (e) {
        console.log("post insert error : ", e.message);
      }
    }
  }
  async getFileList() {
    try {
      const result = await this.#postTable.findAll({
        attributes: ["id", "title"],
        where: {
          userId: this.#currentUser,
        },
      });
      const listArray = [];
      result.forEach((record) => {
        const id = record.dataValues.id;
        const title = record.dataValues.title;
        listArray.push({ id, title });
      });
      return JSON.stringify(listArray);
    } catch (e) {
      console.log("post select error: ", e.message);
    }
  }
  async #initTable() {
    try {
      this.#userTable = await this.#dataBase.define("User", {
        username: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      });
      this.#postTable = await this.#dataBase.define("Post", {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        text: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
        },
      });
      await this.#dataBase.sync({ force: true });
      await this.#createUser(
        "user1",
        "1ARVn2Auq2/WAqx2gNrL+q3RNjAzXpUfCXrzkA6d4Xa22yhRLy4AC50E+6UTPoscbo31nbOoq51gvkuXzJ6B2w=="
      );
      await this.#createUser(
        "user2",
        "Cm+euqVeIc4nC23y59gSyYfVEasEctJLUBYitYePnksDARNW88n4WwhM92Oplak/FC1RB/qaktjmDnjTyWphSg=="
      );
      await this.#createUser(
        "user3",
        "d0frPJ0OyLGmkN67opGYvJvVzXiktz3ucb905qOXGmUMxflBJ03dE3kcN80JKYZBVUgH7b1YFB1TqMUqlfYBzw=="
      );
      console.log("All models were synchronized successfully.");
    } catch (e) {
      console.log("database error : ", e.message);
    }
  }
}

module.exports = Db;
