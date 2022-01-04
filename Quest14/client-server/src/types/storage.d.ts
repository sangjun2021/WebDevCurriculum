import { postType } from './post.d.ts';

export interface getListType{
  () : Array<postType | null>
}
export interface setCurrentPageType{
  (id : string) : void
}
export interface getCurrentPageType{
  () : null | postType
}
export interface insertFileType{
  (nextFile : postType) : Array<postType | null> | false
}
export interface createFileType{
  ({ title = 'untitled', text = '' } : postType) : postType
}
export interface getFileType{
  (id : string) : postType
}
export interface checkOverLapType{
  (title :string) : postType
}
export interface updateFileType{
  ({
    id, title, text, edit,
  } : postType) : postType
}
export interface removeFileType{
  (id :string) : void
}
export interface makeIdType{
  () : string
}

export interface stroageType{
  getList() : getListType
  setCurrentPage() : setCurrentPageType
  getCurrentPage() : getCurrentPageType
  insertFile() : insertFileType
  createFile() : createFileType
  getFile() : getFileType
  checkOverLap() : checkOverLapType
  updateFile() : updateFileType
  removeFile() : removeFileType
  makeId() : makeIdType
}
