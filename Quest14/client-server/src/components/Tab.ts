import { listType } from '../types/list';
import List from './List.js';

class Tab {
  private list : listType;

  constructor(targetElement : HTMLElement) {
    this.list = new List({
      targetElement,
      className: 'tab',
      deleteEvent: 'onDeleteTab',
      clickEvent: 'onClickTab',
      storage: window.localStorage,
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
