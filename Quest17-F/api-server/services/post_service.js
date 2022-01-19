const postModel = require("../models/post");
class PostService {
  #postModel;
  constructor(postModel) {
    this.#postModel = postModel;
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
      console.log("postService select error: ", e.message);
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
      console.log("postService delete error : ", e.message);
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
      console.log("postService insert error : ", e.message);
    }
  }
  async getPostList(userId) {
    try {
      const result = await this.#postModel.findAll({
        attributes: ["id", "title", "text"],
        where: {
          userId: userId,
        },
      });
      const listArray = [];
      result.forEach((record) => {
        const id = record.dataValues.id;
        const title = record.dataValues.title;
        const text = record.dataValues.text;
        listArray.push({ id, title, text });
      });
      return listArray;
    } catch (e) {
      console.log("postService select error: ", e.message);
    }
  }
}
const postService = new PostService(postModel);

module.exports = postService;
