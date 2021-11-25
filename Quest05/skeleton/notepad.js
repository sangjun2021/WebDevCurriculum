import Storage from "./utils/Storage.js";
import Button from "./components/Button.js";
import Editor from "./components/Editor.js";
import List from "./components/List.js";

class Notepad {
  #tabList = [];
  #fileList = [];
  #currentFile = {};
  constructor({ editorTarget, tabTarget, buttonTarget, filesTarget }) {
    const sessionStorage = new Storage(window.sessionStorage);
    const localStorage = new Storage(window.localStorage);
    const editor = new Editor({
      targetElement: editorTarget,
      onInput: (text) => {
        try {
          if (!this.#currentFile.hasOwnProperty("id")) {
            throw new Error("문서를 선택해주세요.");
          }
          const nextFile = sessionStorage.saveFile({
            id: this.#currentFile.id,
            text,
            edit: true,
          });
          const nextTabList = sessionStorage.getList();
          this.setState({ nextFile, nextTabList, tab });
        } catch (e) {
          alert(e.message);
          return;
        }
      },
    });
    const tab = new List({
      targetElement: tabTarget,
      initialState: [],
      onClick: (id) => {
        const nextTabList = sessionStorage.getList();
        const nextFile = sessionStorage.getFile(id);
        this.setState({ nextFile, editor, nextTabList, tab });
      },
      onDelete: (id) => {
        const file = sessionStorage.getFile(id);
        if (
          file.isEdited &&
          !confirm("저장안된 파일입니다. 정말 삭제하시겠습니까?")
        )
          return;

        const nextTabList = sessionStorage.removeFile(id);
        this.setState({ nextTabList, tab });
        if (this.#currentFile.id === id) {
          const nextFile = this.#tabList[0] || {
            text: "",
          };
          this.setState({ nextFile, editor });
        }
      },
    });
    const file = new List({
      targetElement: filesTarget,
      initialState: [],
      onClick: (id) => {
        const isExist = sessionStorage.getFile(id);
        const nextFile = isExist
          ? sessionStorage.getFile(id)
          : localStorage.getFile(id);
        const nextTabList = isExist
          ? false
          : sessionStorage.insertFile(nextFile);
        this.setState({ nextFile, editor, nextTabList, tab });
      },
      onDelete: (id) => {
        if (!confirm("정말 삭제하시겠습니까?")) return;
        const nextFileList = localStorage.removeFile(id);
        const nextTabList = sessionStorage.removeFile(id);
        if (this.#currentFile.id === id)
          this.#currentFile = nextTabList[0] || {
            text: "",
          };
        const nextFile = this.#currentFile;
        this.setState({
          nextFileList,
          nextTabList,
          file,
          tab,
          nextFile,
          editor,
        });
      },
    });
    const button = new Button({
      targetElement: buttonTarget,
    });
    button.createButton({
      callback: () => {
        const newFile = sessionStorage.createFile({
          title: "untitled",
          text: "",
        });
        const nextTabList = sessionStorage.getList();
        const nextFileList = localStorage.insertFile(newFile);
        this.setState({
          nextFile: newFile,
          nextTabList,
          editor,
          tab,
          editorTarget,
          nextFileList,
          file,
        });
      },
      text: "새파일 생성",
    });
    button.createButton({
      callback: () => {
        try {
          if (this.#currentFile.title === "untitled") {
            const nextTitle = prompt("저장할 파일이름을 입력해주세요");
            console.log(nextTitle);
            if (nextTitle.trim().length < 1) {
              throw new Error("공백만 입력하면 안됩니다.");
            }
            localStorage.checkOverLap(nextTitle);
            this.#currentFile.title = nextTitle;
          }
          localStorage.saveFile(this.#currentFile);
          sessionStorage.saveFile({
            id: this.#currentFile.id,
            title: this.#currentFile.title,
          });
          const nextFileList = localStorage.getList();
          const nextTabList = sessionStorage.getList();
          this.setState({ nextFileList, file, nextTabList, tab });
        } catch (e) {
          alert(e.message);
        }
      },
      text: "저장",
    });
    button.createButton({
      callback: () => {
        try {
          const nextTitle = prompt("저장할 파일이름을 입력해주세요");
          if (nextTitle.trim().length < 1) {
            throw new Error("공백만 입력하면 안됩니다.");
          }
          localStorage.checkOverLap(nextTitle);
          this.#currentFile.title = nextTitle;
          localStorage.saveFile(this.#currentFile);
          sessionStorage.saveFile({
            id: this.#currentFile.id,
            title: this.#currentFile.title,
          });
          const nextFileList = localStorage.getList();
          const nextTabList = sessionStorage.getList();
          this.setState({ nextFileList, file, nextTabList, tab });
        } catch (e) {
          alert(e.message);
        }
      },
      text: "다른이름으로 저장",
    });
    this.init({ localStorage, sessionStorage, file, tab, editor });
  }
  init({ localStorage, sessionStorage, file, tab, editor }) {
    const nextFileList = localStorage.getList();
    const nextTabList = sessionStorage.getList();
    const nextFile = nextTabList[0];
    this.setState({ nextFileList, file, nextTabList, tab, nextFile, editor });
  }
  setState({ nextFile, nextTabList, nextFileList, file, editor, tab }) {
    if (nextFile) {
      this.#currentFile = nextFile;
      editor && editor.setState(this.#currentFile);
    }
    nextTabList = (nextTabList || this.#tabList).map((tab) => {
      if (tab.id !== this.#currentFile.id) return { ...tab, isSelected: false };
      return { ...tab, isSelected: true };
    });
    if (nextTabList !== [] && nextTabList) {
      this.#tabList = nextTabList;
      tab && tab.setState(this.#tabList);
    }
    if (nextFileList) {
      this.#fileList = nextFileList;
      file && file.setState(this.#fileList);
    }
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
