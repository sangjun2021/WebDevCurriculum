import {postType,storageType} from 'types/index'
export default class Storage implements storageType {
  private storage;

  constructor(storage : any) {
    this.storage = storage;
  }

  async getPostList(key : string) : Promise<Array<postType>> {
    try {
      const list : Array<postType> = JSON.parse(this.storage.getItem(key)) || [{}];
      return list;
    } catch (e : any) {
      console.log(e.message);
      return [];
    }
  }
  async setCurrentPage(key :string,id : string) : Promise<void> {
    this.storage.setItem(`${key}_currentPage`, id);
  }

  async getCurrentPage(key : string) :Promise<postType> {
    const result = this.storage.getItem(`${key}_currentPage`) || {};
    return result;
  }

  private setList(key: string,nextState : Array<postType>) : void {
    this.storage.setItem(key, JSON.stringify(nextState));
  }

  async insertFile(key :string,nextFile : postType) : Promise<postType> {
    const prevState : Array<postType> = await this.getPostList(key);
    const isExist : postType | null | undefined = prevState.find((file : postType | null) => {
      if (file !== null) {
        return file.id === nextFile.id;
      }
    });
    if (isExist !== undefined) {
      return {};
    }
    const nextState : Array<postType> = [...prevState, nextFile];
    this.setList(key,nextState);
    return nextFile;
  }

  async createPost(key :string,{ title = 'untitled', text = '' } : postType) : Promise<postType> {
    const id : string = this.makeId();
    const file : postType = {
      title,
      text,
      id,
      isEdited: false,
    };
    this.insertFile(key,file);
    return file;
  }

  async getPost(key : string,id : string) : Promise<postType> {
    const nextFiles : Array<postType> = await this.getPostList(key);
    const nextFile : Array<postType> = await nextFiles.filter((file : postType) => file.id === id);
    const nextState = nextFile[0];
    return nextState || [{}];
  }

  async checkOverLap(key:string,title :string) : Promise<boolean> {
    const prevState : Array<postType> = await this.getPostList(key);
    const isOverlap : Array<postType> = prevState.filter((file : postType) => file.title === title);
    if (isOverlap.length > 0) return true;
    return false;
  }

  async updatePost(key:string,{
    id, title, text, isEdited,
  } : postType) : Promise<postType> {
    let result : postType = { id };
    const prevState : Array<postType> = await this.getPostList(key);
    const nextState : Array<postType> = prevState.map((file : postType) => {
      if (file.id !== id) return file;
      file.title = title || file.title;
      file.text = text || file.text;
      file.isEdited = isEdited;
      result = file;
      return file;
    });
    this.setList(key,nextState);
    return result;
  }

  async deletePost(key:string,id :string) : Promise<void> {
    const prevState : Array<postType> = await this.getPostList(key);
    const nextState : Array<postType> = prevState.filter((file : postType) => file.id !== id);
    this.setList(key,nextState);
  }

  makeId() : string {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  }
}
