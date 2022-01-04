import Event from './Event';
import { postType } from '../types/post.d.ts';
import { storageType } from '../types/storage.d.ts';
import { eventType } from '../types/event.d.ts';

class Storage implements storageType {
  private storage : any;

  private key : string;

  private event : eventType = new Event();

  constructor(storage : any) {
    this.key = '';
    this.storage = storage;
    this.onKey();
  }

  getList() : Array<postType | null> {
    try {
      const list : Array<postType | null> = JSON.parse(this.storage.getItem(this.key)) || [];
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

  private setList(nextState : postType) : void {
    this.storage.setItem(this.key, JSON.stringify(nextState));
  }

  insertFile(nextFile : postType) : Array<postType | null> | false {
    const prevState : Array<postType> = this.getList();
    const isExist : Array<postType> = prevState.find((file : postType) => file.id === nextFile.id);
    if (isExist.length !== 0) return false;
    const nextState = [...prevState, nextFile];
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

  getFile(id : string) : postType {
    const nextFile : postType = this.getList().find((file) => file.id === id);
    return nextFile;
  }

  checkOverLap(title :string) : postType {
    const prevState : postType = this.getList().find((file) => file.title === title);
    if (prevState) throw new Error('중복된 파일이름입니다.');
    return prevState;
  }

  updateFile({
    id, title, text, edit,
  } : postType) : postType {
    let result : postType;
    const prevState : Array<postType | null> = this.getList();
    const nextState : Array<postType | null> = prevState.map((file : postType) => {
      if (file.id !== id) return file;
      file.title = title || file.title;
      file.text = text || file.text;
      file.isEdited = edit;
      result = file;
      return file;
    });
    this.setList(nextState);
    return result;
  }

  removeFile(id :string) : void {
    const prevState : Array<postType | null> = this.getList();
    const nextState : Array<postType|null> = prevState.filter((file : postType) => file.id !== id);
    this.setList(nextState);
  }

  makeId() : string {
    const dateString = Date.now().toString(36);
    const randomness = Math.random().toString(36).substr(2);
    return dateString + randomness;
  }
}

export default Storage;
