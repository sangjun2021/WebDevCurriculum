import { postType } from './utils/post.d.ts';

export interface storageType{
  auth?();
  login?(id: any, password: any);
  logOut?();
  getList() : Promise<Array<postType>>
  setCurrentPage? (id : string) : void
  getCurrentPage? () : postType
  insertFile(nextFile : postType) : Promise<postType>
  createFile({ title = 'untitled', text = '' }? : postType?) : Promise<postType>
  getFile(id : string) : Promise<postType>
  checkOverLap(title :string) : Promise<postType>
  updateFile ({
    id, title, text, edit,
  } : postType) : Promise<postType>
  removeFile (id :string) : void
  makeId?() : string
}
