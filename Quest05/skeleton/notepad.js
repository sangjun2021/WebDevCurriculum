import Storage from "./utils/Storage.js";
import Aside from "./components/Files.js";
import Button from "./components/Button.js";
import Editor from "./components/Editor.js";
import Tab from "./components/Tab.js";

const data = [
  {
    title: "javascript.js",
    text: "console.log('hello')",
    id: "1",
    isEdited: true,
  },
  { title: "index.html", text: "<html>", id: "2", isEdited: false },
  { title: "style.css", text: "width : 100px", id: "3", isEdited: false },
];

class Notepad {
  #list;
  #currentFile;
  constructor({ editorTarget, tabTarget, buttonTarget }) {
    this.#list = data;
    const sessionStorage = new Storage(window.sessionStorage);
    const localStorage = new Storage(window.localStorage);
    const editor = new Editor({
      targetElement: editorTarget,
      onInput: (text) => {
        const nextState = sessionStorage.saveFile({
          id: this.#currentFile.id,
          text,
        });
        this.setState({ nextFile: nextState });
      },
    });
    const tab = new Tab({
      targetElement: tabTarget,
      initialState: data,
      onClick: (id) => {
        const nextFile = sessionStorage.getFile(id);
        this.setState({ nextFile, editor });
      },
      onCloseTab: (id) => {
        const nextList = sessionStorage.removeFile(id);
        this.setState({ nextList, tab });
        if (this.#currentFile.id === id) {
          const nextFile = this.#list[0] || {
            text: "",
          };
          this.setState({ nextFile, editor });
        }
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
        const nextList = sessionStorage.getList();
        localStorage.insertFile(newFile);
        this.setState({
          nextFile: newFile,
          nextList,
          editor,
          tab,
          editorTarget,
        });
      },
      text: "새파일 생성",
    });
    button.createButton({
      callback: () => console.log("테스트", editor.text),
      text: "저장",
    });
    button.createButton({
      callback: () => console.log("테스트", editor.text),
      text: "다른이름으로 저장",
    });
  }
  setState({ nextFile, nextList, editor, tab, editorTarget }) {
    if (nextFile) {
      this.#currentFile = nextFile;
      editor && editor.setState(this.#currentFile);
      editorTarget && editorTarget.setAttribute("contenteditable", true);
    }
    if (nextList) {
      this.#list = nextList;
      tab && tab.setState(this.#list);
      // file.setState(this.#list);
    }
  }
}
new Notepad({
  editorTarget: document.querySelector(".text-editor"),
  tabTarget: document.querySelector(".tab-list"),
  buttonTarget: document.querySelector(".button-container"),
});
export default Notepad;
