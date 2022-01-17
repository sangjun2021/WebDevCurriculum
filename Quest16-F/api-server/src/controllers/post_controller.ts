import { postType } from '../types/post';
import { postServiceType } from '../types/postService';
import postService from '../services/post_service';
import { postControllerType } from '../types/postController';

class PostContorller implements postControllerType {
  private service : postServiceType;

  constructor(service : postServiceType) {
    this.service = service;
  }

  async getPost(id : string, user : number | undefined) : Promise<postType | undefined> {
    const result = await this.service.getPost(id, user);
    return result;
  }

  async deletePost(id : string, user : number | undefined) : Promise<void> {
    await this.service.deletePost(id, user);
  }

  async writePost(id : string, payLoad : postType, user : number | undefined) : Promise<void> {
    const isExist = await this.service.getPost(id, user);
    if (isExist) await this.service.updatePost(id, payLoad, user);
    else await this.service.insertPost(id, payLoad, user);
  }

  async getPostList(user : number | undefined) : Promise<Array<postType> | undefined> {
    const result = await this.service.getPostList(user);
    return result;
  }
}
const postController = new PostContorller(postService);

export default postController;
