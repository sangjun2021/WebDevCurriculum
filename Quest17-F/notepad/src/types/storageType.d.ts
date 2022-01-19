import { postType } from './postType';

export interface storageType{
  auth?(key :string) : Promise<string>;
  login?(id: string, password: string);
  logOut?();
  getPostList(key : string) : Promise<Array<postType>>
  setCurrentPage? (key :string,id : string) : Promise<void>
  getCurrentPage? (key :string) : Promise<postType>
  insertPost?(key:string,nextPost : postType) : Promise<postType>
  createPost(key:string,post : postType) : Promise<postType>
  getPost(key:string,id : string) : Promise<postType>
  checkOverLap(key:string,title :string) : Promise<boolean>
  updatePost (key:string,{
    id, title, text, isEdited,
  } : postType) : Promise<postType>
  deletePost (ket:string,id :string) : void
  makeId?() : string
}
