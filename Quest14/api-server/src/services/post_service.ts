import postModel from '../models/post';
import { postType } from '../types/post';
import { postServiceType } from '../types/postService';

class PostService implements postServiceType {
  private postModel;

  constructor(model : any) {
    this.postModel = model;
  }

  async getPost(id : string, userId : number | undefined) : Promise<postType | undefined> {
    try {
      const result = await this.postModel.findOne({
        attributes: ['id', 'title', 'text'],
        where: {
          id,
          userId,
        },
      });
      const data = result.dataValues;
      return data;
    } catch (e : any) {
      console.log('postService select error: ', e.message);
    }
  }

  async deletePost(id : string, userId : number | undefined) : Promise<void> {
    try {
      await this.postModel.destroy({
        where: {
          id,
          userId,
        },
      });
    } catch (e : any) {
      console.log('postService delete error : ', e.message);
    }
  }

  async updatePost(id : string, payLoad : postType, userId : number | undefined) : Promise<void> {
    try {
      await this.postModel.update(
        { title: payLoad.title, text: payLoad.text },
        {
          where: {
            id,
            userId,
          },
        },
      );
    } catch (e : any) {
      console.log('post update error : ', e.message);
    }
  }

  async insertPost(id : string, payLoad : postType, userId : number | undefined) : Promise<void> {
    try {
      await this.postModel.create({
        id,
        title: payLoad.title,
        text: payLoad.text,
        userId,
      });
    } catch (e : any) {
      console.log('postService insert error : ', e.message);
    }
  }

  async getPostList(userId : number | undefined) : Promise<Array<postType> | undefined> {
    try {
      const result = await this.postModel.findAll({
        attributes: ['id', 'title', 'text'],
        where: {
          userId,
        },
      });
      const listArray : Array<postType> = [];
      result.forEach((record : {dataValues : any}) => {
        const { id } = record.dataValues;
        const { title } = record.dataValues;
        const { text } = record.dataValues;
        listArray.push({ id, title, text });
      });
      return listArray;
    } catch (e : any) {
      console.log('postService select error: ', e.message);
    }
  }
}
const postService = new PostService(postModel);

export default postService;
