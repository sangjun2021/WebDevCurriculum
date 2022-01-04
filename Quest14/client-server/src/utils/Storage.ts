import Event from './Event.js';
import { postType } from '../types/post';
import { storageType } from '../types/storage';
import { eventType } from '../types/event';

class Storage implements storageType {
  private storage : any;

  private key : string;

  private event : eventType = new Event();

  constructor(storage : any) {
    this.key = '';
    this.storage = storage;
    this.onKey();
  }

  getList() : Array<postType> {
    try {
      const list : Array<postType> = JSON.parse(this.storage.getItem(this.key)) || [];
      return list;
    } catch (e : any) {
      console.log(e.message);
      return [];
    }
  }

  setCurrentPage(id : string) : void {
    this.storage.setItem(`${this.key}_currentPage`, id);
  }

  getCurrentPage() : null | postType {
    const result = this.storage.getItem(`${this.key}_currentPage`) || null;
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

  insertFile(nextFile : postType) : Array<postType | null> | false {
    const prevState : Array<postType | null> = this.getList();
    const isExist : postType | null | undefined = prevState.find((file : postType | null) => {
      if (file !== null) {
        return file.id === nextFile.id;
      }
    });
    if (isExist !== undefined) {
      return false;
    }
    const nextState : Array<postType | null> = [...prevState, nextFile];
    this.setList(nextState);
    return nextState;
  }

  createFile({ title = 'untitled', text = '' } : postType) : postType {
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

  getFile(id : string) : postType | null | undefined {
    const nextFile : Array<postType | null | undefined> = this.getList().filter((file : postType | null) => {
      if (file === null) return false;
      return file.id === id;
    });
    const nextState = nextFile[0];
    return nextState;
  }

  checkOverLap(title :string) : postType | null | undefined {
    const prevState : postType | null | undefined = this.getList().find((file : postType) => file.title === title);
    if (prevState === null || prevState === undefined) throw new Error('중복된 파일이름입니다.');
    return prevState;
  }

  updateFile({
    id, title, text, isEdited,
  } : postType) : postType {
    let result : postType = { id };
    const prevState : Array<postType> = this.getList();
    const nextState : Array<postType | undefined> = prevState.map((file : postType) => {
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

  removeFile(id :string) : void {
    const prevState : Array<postType> = this.getList();
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
