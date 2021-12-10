import Storage from "./utils/Storage.js";
import Event from "./utils/Event.js";
import Button from "./components/Button.js";
import Editor from "./components/Editor.js";
import Tab from "./components/Tab.js";
import Files from "./components/Files.js";
import HandleApi from "./utils/HandleAPI.js";
class Notepad {
  #sessionStorage = new Storage(window.sessionStorage);
  #handleApi = new HandleApi();
  #event = new Event();
  #state;
  #editor;
  #tab;
  #files;
  #button;
  constructor({ editorTarget, tabTarget, buttonTarget, filesTarget }) {
    this.#editor = new Editor(editorTarget);
    this.#tab = new Tab(tabTarget);
    this.#files = new Files(filesTarget);
    this.#button = new Button(buttonTarget);
    this.#button.createButton("new");
    this.#button.createButton("save");
    this.#button.createButton("save as");
    this.#setNewEvent();
    this.#setSaveEvent();
    this.#setSaveAsEvent();
    this.#setInputEvent();
    this.#setTabClickEvent();
    this.#setTabDeleteEvent();
    this.#setFileDeleteEvent();
    this.#setFileClickEvent();
    this.#init();
  }
  //api
  #checkTitle() {
    const title = prompt("이름을 입력해주세요");
    if (!this.#handleApi.checkOverLap(title)) {
      return false;
    }
    this.#setState({ ...this.#state, title });
  }
  //api
  async #saveFile() {
    await this.#handleApi.updateFile(this.#state);
    this.#sessionStorage.updateFile(this.#state);
    const { id } = this.#state;
    this.#files.setState(id);
    this.#tab.setState(id);
  }
  //api
  #setNewEvent() {
    this.#event.setEvent("new", async () => {
      const nextState = await this.#handleApi.createFile();
      this.#sessionStorage.insertFile(nextState);
      this.#setState(nextState);
      this.#editor.setState(this.#state.id);
    });
  }
  //api
  #setSaveEvent() {
    this.#event.setEvent("save", async () => {
      try {
        if (this.#state.title === "untitled") {
          const checking = await this.#checkTitle();
          if (checking) {
            return;
          }
        }
        await this.#saveFile();
      } catch (e) {
        alert(e.message);
      }
    });
  }
  #setSaveAsEvent() {
    this.#event.setEvent("save as", async () => {
      try {
        const checking = await this.#checkTitle();
        if (checking) return;
        await this.#saveFile();
      } catch (e) {
        alert(e.message);
      }
    });
  }
  //api
  #setFileDeleteEvent() {
    this.#event.setEvent("onDeleteFile", async (e) => {
      if (!confirm("정말 삭제하시겠습니까?")) return;
      this.#sessionStorage.removeFile(e.detail);
      await this.#handleApi.removeFile(e.detail);
      if (this.#state.id === e.detail) {
        const list = await this.#handleApi.getList();
        const nextState = list[0] || { id: null };
        this.#setState(nextState);
        this.#editor.setState(nextState.id);
      }
      const { id } = this.#state;
      this.#files.setState(id);
      this.#tab.setState(id);
    });
  }
  #setTabDeleteEvent() {
    this.#event.setEvent("onDeleteTab", (e) => {
      const removeTab = this.#sessionStorage.getFile(e.detail);
      if (
        removeTab.isEdited &&
        !confirm("저장되지 않은탭입니다. 정말 삭제하시겠습니까?")
      )
        return;
      this.#sessionStorage.removeFile(e.detail);
      if (this.#state.id === e.detail) {
        const nextState = this.#sessionStorage.getList()[0] || { id: null };
        this.#setState(nextState);
        this.#editor.setState(this.#state.id);
      }
      this.#tab.setState(this.#state.id);
    });
  }
  //api
  #setFileClickEvent() {
    this.#event.setEvent("onClickFile", async (e) => {
      const data = await this.#handleApi.getFile(e.detail);
      this.#sessionStorage.insertFile(data);
      this.#setState(data);
      this.#editor.setState(this.#state.id);
    });
  }
  #setTabClickEvent() {
    this.#event.setEvent("onClickTab", (e) => {
      const nextState = this.#sessionStorage.getFile(e.detail);
      this.#setState(nextState);
      this.#editor.setState(this.#state.id);
    });
  }
  #setInputEvent() {
    this.#event.setEvent("updateText", (e) => {
      this.#setState({ ...this.#state, text: e.detail });
      this.#sessionStorage.updateFile({ ...this.#state, edit: true });
    });
  }
  #setState(nextState) {
    this.#state = nextState;
    const { id } = this.#state;
    this.#tab.setState(id);
    this.#files.setState(id);
  }
  async #init() {
    const initList = await this.#handleApi.getList();
    const nextState = initList[0] || { id: null };
    this.#setState(nextState);
    this.#editor.setState(nextState.id);
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
