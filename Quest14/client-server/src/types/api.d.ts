import { postType } from './post';

export interface apiType {
  auth() : Promise<string | false | undefined>
  login(username :string, password : string) : Promise<string | false | undefined>;
  logout() : void | Promise<void>;
  checkOverLap (title : string) : Promise<boolean>;
  getFile(id :string) : Promise<postType | boolean>;
  getFileList() : Promise<Array<postType|boolean>>
  deleteFile (id :string) : Promise<boolean>
  createFile(payLoad : postType) : Promise<postType | boolean>
  updateFile(payLoad : postType) : Promise<postType | boolean>
}
