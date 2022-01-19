import { Commit } from "vuex";
import { storageType } from "@/types";
interface stateType {
  isModalOn : boolean,
  fileStorage : storageType,
  tavbStorage : storageType
}
export default{
  namespaced : true,
  state(){
    return{
      isModalOn : false,
    }
  },
  mutations :{
    setIsModalOn(state : stateType,nextState : boolean ) : void{
      state.isModalOn = nextState;
    }
  },
  actions : {
    modalOn({commit} : {commit : Commit}) : void{
      commit('setIsModalOn',true);
    },
    modalOff({commit} : {commit : Commit}) : void{
      commit('setIsModalOn',false);
    }
  }
}