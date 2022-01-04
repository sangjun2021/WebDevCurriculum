import { postType } from './post.d.ts';

export interface storageType{
  getList() : Array<postType | null>
  setCurrentPage (id : string) : void
  getCurrentPage () : null | postType
  insertFile(nextFile : postType) : Array<postType | null> | false
  createFile({ title = 'untitled', text = '' } : postType) : postType
  getFile(id : string) : postType
  checkOverLap(title :string) : postType
  updateFile ({
    id, title, text, edit,
  } : postType) : postType
  removeFile (id :string) : void
  makeId() : string
}
