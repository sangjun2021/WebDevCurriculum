export default {
  namespaced : true,
  state(){
    return {
      isLoading : false,
    }
  },
  mutations : {
    setIsLoading(state : {isLoading : boolean},nextState : boolean){
      state.isLoading = nextState;
    }
  },
  actions : {
    lodingStart({commit} : {commit : any}){
      commit('setIsLoading',true);
    },
    lodingEnd({commit} : {commit : any}){
      commit('setIsLoading',false);
    }
  }
}