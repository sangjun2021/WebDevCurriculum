import Storage from '../utils/Storage.js';
import Event from '../utils/Event.js';
import { postType } from '../types/post';
import { eventType } from '../types/event';
import { editorType } from '../types/editor';

class Editor implements editorType {
  private targetElement : HTMLElement;

  private Storage : any = new Storage(window.localStorage);

  private state : postType = {};

  private event : eventType = new Event();

  constructor(targetElement :HTMLElement) {
    this.targetElement = targetElement;
    this.targetElement.addEventListener('input', (e : any) => {
      this.onInput(e.target.innerText);
    });
  }

  private onInput(text :string) : void {
    const nextState = this.Storage.updateFile({
      id: this.state.id,
      text,
      title: this.state.title,
      isEdited: true,
    });
    console.log(this.state.id);
    this.event.dispatch('updateText', nextState.text);
  }

  private render() : void {
    this.targetElement.innerText = this.state.text || '';
  }

  setState(id : string | undefined) : void {
    if (id === undefined) return;
    this.state = this.Storage.getFile(id) || { text: null };
    this.render();
  }
}

export default Editor;
