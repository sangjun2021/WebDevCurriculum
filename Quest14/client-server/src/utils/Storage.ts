import Event from './Event.js';
import { postType, storageType, eventType } from '../types';

class Storage implements storageType {
  private storage : any;

  private key : string;

  private event : eventType = new Event();

  constructor(storage : any) {
    this.key = '';
    this.storage = storage;
    this.onKey();
  }

  async getList() : Promise<Array<postType>> {
    try {
      const list : Array<postType> = JSON.parse(this.storage.getItem(this.key)) || [{}];
      return list;
    } catch (e : any) {
      console.log(e.message);
      return [{}];
    }
  }

  setCurrentPage(id : string) : void {
    this.storage.setItem(`${this.key}_currentPage`, id);
  }

  getCurrentPage() :postType {
    const result = this.storage.getItem(`${this.key}_currentPage`) || {};
    return result;
  }

  private onKey() : void {
    this.event.setEvent('onKey', (e : any) => {
      this.setKey(e.detail);
    });
  }

  private setKey(key : string) {
    this.key = key;
  }

  private setList(nextState : Array<postType | null | undefined>) : void {
    this.storage.setItem(this.key, JSON.stringify(nextState));
  }

  async insertFile(nextFile : postType) : Promise<postType> {
    const prevState : Array<postType> = await this.getList();
    const isExist : postType | null | undefined = prevState.find((file : postType | null) => {
      if (file !== null) {
        return file.id === nextFile.id;
      }
    });
    if (isExist !== undefined) {
      return {};
    }
    const nextState : Array<postType> = [...prevState, nextFile];
    this.setList(nextState);
    return nextFile;
  }

  async createFile({ title = 'untitled', text = '' } : postType) : Promise<postType> {
    const id : string = this.makeId();
    const file : postType = {
      title,
      text,
      id,
      isEdited: false,
    };
    this.insertFile(file);
    return file;
  }

  async getFile(id : string) : Promise<postType> {
    const nextFiles : Array<postType> = await this.getList();
    const nextFile : Array<postType> = await nextFiles.filter((file : postType) => file.id === id);
    const nextState = nextFile[0];
    return nextState || [{}];
  }

  async checkOverLap(title :string) : Promise<boolean> {
    const prevState : Array<postType> = await this.getList();
    const isOverlap : Array<postType> = prevState.filter((file : postType) => file.title === title);
    if (isOverlap.length > 0) throw new Error('중복된 파일이름입니다.');
    return false;
  }

  async updateFile({
    id, title, text, isEdited,
  } : postType) : Promise<postType> {
    let result : postType = { id };
    const prevState : Array<postType> = await this.getList();
    const nextState : Array<postType> = prevState.map((file : postType) => {
      if (file.id !== id) return file;
      file.title = title || file.title;
      file.text = text || file.text;
      file.isEdited = isEdited;
      result = file;
      return file;
    });
    this.setList(nextState);
    return result;
  }

  async removeFile(id :string) : Promise<void> {
    const prevState : Array<postType> = await this.getList();
    const nextState : Array<postType> = prevState.filter((file : postType) => file.id !== id);
    this.setList(nextState);
  }

  makeId() : string {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  }
}

export default Storage;
