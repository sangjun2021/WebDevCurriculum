const postService = require("../services/post_service");

class PostContorller {
  #service;
  constructor(postService) {
    this.#service = postService;
  }
  async getPost(id, user) {
    return await this.#service.getPost(id, user);
  }
  async deletePost(id, user) {
    await this.#service.deletePost(id, user);
  }
  async writePost(id, payLoad, user) {
    const isExist = await this.#service.getPost(id, user);
    if (isExist) await this.#service.updatePost(id, payLoad, user);
    else await this.#service.insertPost(id, payLoad, user);
  }

  async getPostList(user) {
    return await this.#service.getPostList(user);
  }
}
const postController = new PostContorller(postService);

module.exports = postController;
