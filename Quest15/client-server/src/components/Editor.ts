import Storage from '../utils/Storage.js';
import Event from '../utils/Event.js';
import {
  postType, eventType, editorType, storageType,
} from '../types';

class Editor implements editorType {
  private targetElement : HTMLElement;

  private Storage : storageType = new Storage(window.localStorage);

  private state : postType = {};

  private event : eventType = new Event();

  constructor(targetElement :HTMLElement) {
    this.targetElement = targetElement;
    this.targetElement.addEventListener('input', (e : any) => {
      this.onInput(e.target.innerText);
    });
  }

  private async onInput(text :string) : Promise<void> {
    const nextState = await this.Storage.updateFile({
      id: this.state.id,
      text,
      title: this.state.title,
      isEdited: true,
    });
    this.event.dispatch('updateText', nextState.text);
  }

  private render() : void {
    this.targetElement.innerText = this.state.text || '';
  }

  async setState(id : string | undefined) : Promise<void> {
    if (id === undefined) return;
    this.state = await this.Storage.getFile(id) || { text: null };
    this.render();
  }
}

export default Editor;
