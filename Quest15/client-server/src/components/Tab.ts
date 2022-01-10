import { listType, storageType } from '../types';
import List from './List.js';

class Tab {
  private list : listType;

  constructor(targetElement : HTMLElement, stroage : storageType) {
    this.list = new List({
      targetElement,
      className: 'tab',
      deleteEvent: 'onDeleteTab',
      clickEvent: 'onClickTab',
      storage: stroage,
    });
  }

  setState(id : string | undefined) : void {
    this.list.setState(id);
  }

  logout() : void {
    this.list.setStateByList([]);
  }
}

export default Tab;
