import { createStore } from "vuex";
import editor from "./editor";
import file from "./file";
import tab from "./tab";
import info from "./info";
import modal from "./modal";
import loading from "./loading";
import dependency from "./dependency";
const store : any = createStore({
  modules : {
    editor,
    file,
    tab,
    info,
    modal,
    loading,
    dependency
  }
})

export default store