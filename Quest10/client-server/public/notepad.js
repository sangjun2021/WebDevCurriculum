import Storage from "./utils/Storage.js";
import Event from "./utils/Event.js";
import Button from "./components/Button.js";
import Editor from "./components/Editor.js";
import Tab from "./components/Tab.js";
import Files from "./components/Files.js";
import HandleApi from "./utils/HandleAPI.js";
class Notepad {
  #isLoading = false;
  #tabStorage;
  #fileStorage;
  #event = new Event();
  #state;
  #editor;
  #tab;
  #files;
  #button;
  constructor({
    editorTarget,
    tabTarget,
    buttonTarget,
    filesTarget,
    fileStorage,
    tabStorage,
  }) {
    this.#editor = new Editor(editorTarget);
    this.#tab = new Tab(tabTarget);
    this.#files = new Files(filesTarget);
    this.#button = new Button(buttonTarget);
    this.#fileStorage = fileStorage;
    this.#tabStorage = tabStorage;
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
  async #checkTitle() {
    const title = prompt("이름을 입력해주세요");
    const checking = await this.#fileStorage.checkOverLap(title);
    if (checking) return true;
    this.#setState({ ...this.#state, title });
  }
  //api
  async #saveFile() {
    await this.#fileStorage.updateFile(this.#state);
    this.#tabStorage.updateFile(this.#state);
    const { id } = this.#state;
    await this.#files.setState(id);
    this.#tab.setState(id);
  }
  //api
  #setNewEvent() {
    this.#event.setEvent("new", async () => {
      try {
        if (this.#isLoading) {
          console.log("아직 로딩중입니다.");
          return;
        }
        this.#isLoading = true;
        const nextState = await this.#fileStorage.createFile();
        this.#tabStorage.insertFile(nextState);
        this.#setState(nextState);
        this.#editor.setState(this.#state.id);
        this.#isLoading = false;
      } catch (e) {
        console.log(e.message);
        this.#isLoading = false;
        return;
      }
    });
  }
  //api
  async #setSaveEvent() {
    this.#event.setEvent("save", async () => {
      if (this.#isLoading) return;
      this.#isLoading = true;
      try {
        let checking = false;
        if (this.#state.title === "untitled") {
          checking = await this.#checkTitle();
        }
        if (checking) throw new Error("중복된 이름입니다.");
        await this.#saveFile();
        this.#isLoading = false;
      } catch (e) {
        alert(e.message);
        this.#isLoading = false;
      }
    });
  }
  #setSaveAsEvent() {
    this.#event.setEvent("save as", async () => {
      if (this.#isLoading) return;
      this.#isLoading = true;
      try {
        const checking = await this.#checkTitle();
        if (checking) throw new Error("중복된 이름입니다.");
        await this.#saveFile();
        this.#isLoading = false;
      } catch (e) {
        alert(e.message);
        this.#isLoading = false;
      }
    });
  }
  //api
  #setFileDeleteEvent() {
    this.#event.setEvent("onDeleteFile", async (e) => {
      if (!confirm("정말 삭제하시겠습니까?")) return;
      this.#tabStorage.removeFile(e.detail);
      await this.#fileStorage.removeFile(e.detail);
      if (this.#state.id === e.detail) {
        const list = await this.#fileStorage.getList();
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
      const removeTab = this.#tabStorage.getFile(e.detail);
      if (
        removeTab.isEdited &&
        !confirm("저장되지 않은탭입니다. 정말 삭제하시겠습니까?")
      )
        return;
      this.#tabStorage.removeFile(e.detail);
      if (this.#state.id === e.detail) {
        const nextState = this.#tabStorage.getList()[0] || { id: null };
        this.#setState(nextState);
        this.#editor.setState(this.#state.id);
      }
      this.#tab.setState(this.#state.id);
    });
  }
  //api
  #setFileClickEvent() {
    this.#event.setEvent("onClickFile", async (e) => {
      const data = await this.#fileStorage.getFile(e.detail);
      this.#tabStorage.insertFile(data);
      this.#setState(data);
      this.#editor.setState(this.#state.id);
    });
  }
  #setTabClickEvent() {
    this.#event.setEvent("onClickTab", (e) => {
      const nextState = this.#tabStorage.getFile(e.detail);
      this.#setState(nextState);
      this.#editor.setState(this.#state.id);
    });
  }
  #setInputEvent() {
    this.#event.setEvent("updateText", (e) => {
      this.#state = { ...this.#state, text: e.detail };
      this.#tabStorage.updateFile({ ...this.#state, edit: true });
      this.#tab.setState(this.#state.id);
    });
  }
  #setState(nextState) {
    this.#state = nextState;
    const { id } = this.#state;
    this.#tab.setState(id);
    this.#files.setState(id);
  }
  async #init() {
    const initList = await this.#fileStorage.getList();
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
  tabStorage: new Storage(window.sessionStorage),
  fileStorage: new HandleApi(),
});
