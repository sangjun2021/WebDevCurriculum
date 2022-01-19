import { Commit } from "vuex"
interface stateType{
  text : string
}

export default{
  namespaced : true,
  state(){
    return{
      text : ""
    }
  },
  mutations :{
    setText(state : stateType, nextState : string) : void{
      state.text = nextState
    }
  },
  actions : {
    updateText({commit} : {commit : Commit},nextText : string) : void{
      commit('setText',nextText);
    },
    logout({commit} : {commit : Commit}){
      commit('setText',"")
    }
  }
}