import { postType } from './post';

export interface apiType {
  auth() : Promise<string | false>
  login(username :string, password : string) : Promise<string | false>;
  logout() : void | Promise<void>;
  checkOverLap (title : string) : Promise<boolean>;
  getFile(id :string) : Promise<postType | boolean>;
  getFileList() : Promise<Array<postType|boolean>>
  deleteFile (id :string) : Promise<void>
  createFile(payLoad : postType) : Promise<postType | boolean>
  updateFile(payLoad : postType) : Promise<postType | boolean>
}

export interface graphqlType{
    data? : {
      login? : {
        token? : string
      }
      writeFile? : {
        title? :string
        id? :string
        text? :string
      }
      user? : {
        username? : string
        posts? : Promise<Array<postType>>
      }
    }
  }
