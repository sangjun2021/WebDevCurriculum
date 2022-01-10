import { postType } from './post';

export interface fileControllerType{
  getFile(id : string) : Promise<string | boolean>
  setUser(user : string) : boolean
  getUser() : string | undefined
  getUserPasswordList() : Promise<string | boolean>
  deleteFile(id : string) : Promise<string | boolean>
  writeFile(id : string, payLoad : postType) : Promise<string>
  getFileList() : Promise<Array<postType>>
}
