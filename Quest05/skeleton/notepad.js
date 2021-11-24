import Storage from "./utils/localStorage.js";
import Aside from "./components/Aside.js";
import Button from "./components/Button.js";
import Editor from "./components/Editor.js";
import Tab from "./components/Tab.js";
class Notepad {
  #targetElement;
  constructor(targetElement) {
    this.#targetElement = targetElement;
  }
}
