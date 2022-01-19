import { Commit } from "vuex";
interface stateType {
  isLoading : boolean
}
export default {
  namespaced : true,
  state(){
    return {
      isLoading : false,
    }
  },
  mutations : {
    setIsLoading(state : stateType,nextState : boolean){
      state.isLoading = nextState;
    }
  },
  actions : {
    lodingStart({commit} : {commit : Commit}){
      commit('setIsLoading',true);
    },
    lodingEnd({commit} : {commit : Commit}){
      commit('setIsLoading',false);
    }
  }
}