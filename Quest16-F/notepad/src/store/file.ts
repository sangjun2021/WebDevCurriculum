import { postType } from "types"
export default{
  namespaced : true,
  state(){
    return{
      fileList : []
    }
  },
  mutations :{
    setFileList(state : {fileList : Array<postType>},nextState : Array<postType>) : void{
      state.fileList = nextState
    }
  },
  actions : {
    updateFileList({commit} : {commit : any},nextState : Array<postType>) : void{
      commit('setFileList',nextState);
    },
  }
}