import { createStore } from "vuex";
import editor from "./editor";
import file from "./file";
import tab from "./tab";
import user from "./user";
import modal from "./modal";
import menu from './menu'
import loading from "./loading";
const store : any = createStore({
  modules : {
    editor,
    file,
    tab,
    user,
    modal,
    menu,
    loading
  }
})

export default store