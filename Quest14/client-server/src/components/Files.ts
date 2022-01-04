import { handleApiType } from '../types/handleApi';
import { listType } from '../types/list';
import { postType } from '../types/post';
import List from './List.js';

class File {
  private list : listType;

  private API : handleApiType | null;

  constructor(targetElement : HTMLElement, api : handleApiType | null) {
    this.API = api;
    this.list = new List({
      targetElement,
      className: 'file',
      deleteEvent: 'onDeleteFile',
      clickEvent: 'onClickFile',
      storage: window.localStorage,
    });
  }

  async setState() : Promise<void> {
    if (this.API === null) return;
    const list : Array<postType | boolean> = await this.API.getList();
    this.list.setStateByList(list);
  }

  logout() : void {
    this.list.setStateByList([]);
  }
}

export default File;
