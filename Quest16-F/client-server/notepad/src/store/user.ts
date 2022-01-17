import { userType } from "types";
import Store from './index'
import { Graphql } from "@/utils";
export default{
  namespaced : true,
  state(){
    return{
      fileStorage : new Graphql(),
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
    async init({commit,state} : {
      commit : any, state : any
    }) : Promise<void>{
      try{
      const token = window.localStorage.getItem('jwt');
      const username = await state.fileStorage.auth(token);
      commit('setUser',{token,username});
      Store.dispatch('file/init');
      }catch(e){
        commit('setUser',{token : '', username : ''})
      }
    },
    logout({commit} : {commit : any}){
      commit('setUser',{token : '', username : ''})
      window.localStorage.removeItem('jwt');
    }
  }
}