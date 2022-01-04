import { postType } from './post';

export interface handleApiType{
  getList() : Promise<Array<postType | boolean>>
  insertFile (nextFile : postType) : Promise<postType | boolean>
  login(username :string, password : string) : Promise<string | false | undefined>
  auth(): Promise<string | false | undefined>
  logOut () : Promise<void>
  createFile() : Promise<postType | boolean>
  getFile(id : string) : Promise<postType | boolean>
  checkOverLap(title : string) : Promise<boolean>
  updateFile(data : postType) : Promise<postType | boolean>
  removeFile(id :string) : Promise<boolean>
}
