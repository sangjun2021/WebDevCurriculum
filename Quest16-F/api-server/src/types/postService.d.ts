import { postType } from './post';

export interface postServiceType{
  getPost(id : string, userId : number | undefined) : Promise<postType | undefined>
  deletePost(id : string, userId : number | undefined) : Promise<void>
  updatePost(id : string, payLoad : postType, userId : number | undefined) : Promise<void>
  insertPost(id : string, payLoad : postType, userId : number | undefined) : Promise<void>
  getPostList(userId : number | undefined) : Promise<Array<postType> | undefined>
}
