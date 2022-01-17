import { postType } from './post';

export interface dbControllerType{
  createUser(username : string, salt : string, password : string) : Promise<void>
  setUser(username : string) : Promise<void>
  getUserPasswordList() : Promise<any>
  getFile(id : string) : Promise<postType>
  deleteFile(id : string) : Promise<void>
  writeFile(id : string, payLoad : postType) : Promise<void>
  getFileList() : Promise<Array<postType>| undefined>
}
