import Storage from "./utils/Storage.js";
import Event from "./utils/Event.js";
import Button from "./components/Button.js";
import Editor from "./components/Editor.js";
import Tab from "./components/Tab.js";
import Files from "./components/Files.js";
class Notepad {
  #sessionStorage = new Storage(window.sessionStorage);
  #localStorage = new Storage(window.localStorage);
  #event = new Event();
  #state = {};
  #editor;
  #tab;
  #files;
  #button;
  constructor({ editorTarget, tabTarget, buttonTarget, filesTarget }) {
    try {
      this.#editor = new Editor(editorTarget);
      this.#tab = new Tab(tabTarget);
      this.#files = new Files(filesTarget);
      this.#button = new Button(buttonTarget);
      this.#button.createButton("new");
      this.#button.createButton("save");
      this.#button.createButton("save as");
      this.#setAddEvent();
      this.#setSaveEvent();
      this.#setSaveAsEvent();
      this.#setInputEvent();
    } catch (e) {
      alert(e.message);
    }
  }
  #setAddEvent() {
    this.#event.setEvent("new", () => {
      this.#state = this.#localStorage.createFile({});
      this.#sessionStorage.insertFile(this.#state);
      const { id } = this.#state;
      this.#files.setState(id);
      this.#tab.setState(id);
      this.#editor.setState(id);
    });
  }
  #setSaveEvent() {
    this.#event.setEvent("save", () => {
      if (this.#state.title === "untitled") {
        const title = prompt("이름을 입력해주세요");
        this.#localStorage.checkOverLap(title) ||
          this.#setState({ ...this.#state, title });
      }
      this.#localStorage.updateFile(this.#state);
      this.#sessionStorage.updateFile(this.#state);
      const { id } = this.#state;
      this.#files.setState(id);
      this.#tab.setState(id);
    });
  }
  #setSaveAsEvent() {
    this.#event.setEvent("save as", () => {
      const title = prompt("이름을 입력해주세요");
      this.#localStorage.checkOverLap(title) ||
        this.#setState({ ...this.#state, title });
      this.#localStorage.updateFile(this.#state);
      this.#sessionStorage.updateFile(this.#state);
      const { id } = this.#state;
      this.#files.setState(id);
      this.#tab.setState(id);
    });
  }
  #setInputEvent() {
    this.#event.setEvent("updateText", (e) => {
      this.#setState({ ...this.#state, text: e.detail });
      this.#sessionStorage.updateFile({ ...this.#state, edit: true });
      this.#tab.setState(this.#state.id);
    });
  }
  #setState(nextState) {
    this.#state = nextState;
  }
}
const editorTarget = document.querySelector(".text-editor");
const tabTarget = document.querySelector(".tab-list");
const buttonTarget = document.querySelector(".button-container");
const filesTarget = document.querySelector(".file-container");

new Notepad({
  editorTarget,
  tabTarget,
  buttonTarget,
  filesTarget,
});
