import { storageType, userType } from "types";
import Store from './index'
import { Graphql } from "@/utils";
import {Commit} from 'vuex';
interface stateType {
  fileStorage : storageType,
  username : string,
  token : string
}
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
      commit : Commit, state : stateType
    },nextState : string) : void{
      commit('setUser',{...state, username : nextState});
    },
    updateToken({commit, state} :{
      commit : Commit, state : stateType
    },nextState : string) : void{
      commit('setUser',{...state, token : nextState});
    },
    async init({commit,state} : {
      commit : Commit, state : stateType
    }) : Promise<void>{
      try{
      const token = window.localStorage.getItem('jwt');
      const username = await state.fileStorage.auth?.(token || "");
      commit('setUser',{token,username});
      Store.dispatch('file/init');
      }catch(e){
        commit('setUser',{token : '', username : ''})
      }
    },
    logout({commit} : {commit : Commit}){
      commit('setUser',{token : '', username : ''})
      window.localStorage.removeItem('jwt');
    }
  }
}