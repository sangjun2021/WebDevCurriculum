import { createStore } from "vuex";
import editor from "./editor";
import file from "./file";
import tab from "./tab";
import user from "./user";
import modal from "./modal";
import menu from './menu'
const store = createStore({
  modules : {
    editor,
    file,
    tab,
    user,
    modal,
    menu
  }
})

export default store