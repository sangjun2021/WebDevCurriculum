export interface postControllerType{
  getPost(id : string, user : number | undefined) : Promise<postType | undefined>
  deletePost(id : string, user : number | undefined) : Promise<void>
  writePost(id : string, payLoad : postType, user : number | undefined) : Promise<void>
  getPostList(user : number | undefined) : Promise<Array<postType> | undefined>
}
