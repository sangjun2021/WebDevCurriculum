import { userType } from "types";

export default{
  namespaced : true,
  state(){
    return{
      username : '',
      token : ''
    }
  },
  mutations :{
    setUser(state : userType,nextState : userType) : void{
      state.username = nextState.username;
      state.token = nextState.token;
    }
  },
  actions : {
    updateUsername({commit, state} : {
      commit : any, state : any
    },nextState : string) : void{
      commit('setUser',{...state, username : nextState});
    },
    updateToken({commit, state} :{
      commit : any, state : any
    },nextState : string) : void{
      commit('setUser',{...state, token : nextState});
    },
  }
}