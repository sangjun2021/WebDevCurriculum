import Storage from '../utils/Storage.js';
import Event from '../utils/Event.js';
import {
  postType, storageType, listArgsType, listType,
} from '../types';

class List implements listType {
  private className : string;

  private deleteEvent : any;

  private clickEvent : any;

  private state : Array<postType | boolean> = [{}];

  private targetElement : HTMLElement;

  private event = new Event();

  private storage : storageType;

  constructor({
    targetElement, className, deleteEvent, clickEvent, storage,
  } : listArgsType) {
    this.targetElement = targetElement;
    this.className = className;
    this.deleteEvent = deleteEvent;
    this.clickEvent = clickEvent;
    this.storage = storage;
    this.render();
    this.setEvent();
  }

  private setEvent() : void {
    this.targetElement.addEventListener('click', (e : any) => {
      const { id } = e.target.closest('li').dataset;
      if (e.target.id === 'js-close-button') {
        this.event.dispatch(this.deleteEvent, id);
      } else {
        this.event.dispatch(this.clickEvent, id);
      }
    });
  }

  private render() : void {
    try {
      this.targetElement.innerHTML = this.state
        .map((file : postType | boolean) => {
          if (typeof file === 'boolean') return;
          if (file.id === undefined) return;
          return `<li class="${this.className} ${
            file.isSelected ? 'js-selected' : ''
          }" data-id="${file.id}">
          <span class="title ${file.isEdited ? 'js-edited' : ''}">${
  file.title
}</span>
            <button id="js-close-button" class=>X</button>
          </li>`;
        })
        .join('');
    } catch (e : any) {
      console.log(e.message);
    }
  }

  async setState(id : string) : Promise<void> {
    const state : Array<postType> = await this.storage.getList();
    const nextState = state.map((tab) => {
      if (tab.id !== id) return { ...tab, isSelected: false };
      return { ...tab, isSelected: true };
    });
    if (this.storage?.setCurrentPage === undefined) return;
    this.storage.setCurrentPage(id);
    this.state = nextState;
    this.render();
  }

  setStateByList(nextState : Array<postType | boolean>) : void {
    if (typeof nextState === 'boolean') {
      this.state = [];
      this.render();
      return;
    }
    this.state = nextState;
    this.render();
  }
}

export default List;
