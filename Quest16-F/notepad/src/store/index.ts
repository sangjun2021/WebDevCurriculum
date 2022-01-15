import { createStore } from "vuex";
import editor from "./editor";
import file from "./file";
import tab from "./tab";
import user from "./user";
const store = createStore({
  modules : {
    editor,
    file,
    tab,
    user
  }
})

export default store