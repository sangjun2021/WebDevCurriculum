/* eslint-disable no-unused-vars */
import { postType } from './post.d.ts';

export interface authType{
  (): Promise<string | false | undefined>;
}
export interface logInType{
  (username :string, password : string) : Promise<string | false | undefined>;
}
export interface logOutType{
  () : void | Promise<void>;
}
export interface checkOverLapType{
  (title : string) : Promise<boolean>;
}
export interface getFileType{
  (id :string) : Promise<postType | boolean>;
}
export interface getFileListType{
  () : Promise<Array<postType> | boolean>
}
export interface deleteFileType{
  (id :string) : Promise<boolean>
}
export interface createFileType{
  (payLoad : postType) : Promise<postType | boolean>
}
export interface updateFileType{
  (payLoad : postType) : Promise<postType | boolean>
}
export interface apiType {
  auth() :authType;
  logIn() :logInType;
  logOut() :logOutType;
  checkOverLap() :checkOverLapType;
  getFile() :getFileType;
  getFileList() :getFileListType;
  deleteFile() :deleteFileType;
  createFile() :createFileType;
  updateFile() :updateFileType;

}
