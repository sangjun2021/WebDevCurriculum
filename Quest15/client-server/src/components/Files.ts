import { listType, postType, storageType } from '../types';
import List from './List.js';

class Files {
  private list : listType;

  private storage : storageType;

  constructor(targetElement : HTMLElement, storage : storageType) {
    this.storage = storage;
    this.list = new List({
      targetElement,
      className: 'file',
      deleteEvent: 'onDeleteFile',
      clickEvent: 'onClickFile',
      storage,
    });
  }

  async setState() : Promise<void> {
    const list : Array<postType | boolean> = await this.storage.getList();
    this.list.setStateByList(list);
  }

  logout() : void {
    this.list.setStateByList([]);
  }
}

export default Files;
