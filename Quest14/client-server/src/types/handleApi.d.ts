import { postType } from './post.d.ts';

export interface getListType{
  () : Promise<Array<postType> | boolean>
}
export interface insertFileType{
  (nextFile : postType) : Promise<postType | boolean>
}
export interface loginType{
  (username :string, password : string) : Promise<string | false | undefined>
}
export interface authType{
  (nextFile : postType) : Promise<postType | boolean>
}
export interface logOutType{
  () : Promise<void>
}
export interface createFileType{
  () : Promise<postType | boolean>
}
export interface getFileType{
  (id : string) : Promise<postType>
}
export interface checkOverLapType{
  checkOverLap(title : string) : Promise<boolean>
}
export interface updateFileType{
  (data : postType) : Promise<postType | boolean>
}
export interface removeFileType{
  (id :string) : Promise<boolean>
}

export interface handleApiType{
  getList() : getListType
  insertFile() : insertFileType
  login() : loginType
  auth() : authType
  logOut() : logOutType
  createFile() : createFileType
  getFile() : getFileType
  checkOverLap() : checkOverLapType
  updateFile() : updateFileType
  removeFile() : removeFileType
}
