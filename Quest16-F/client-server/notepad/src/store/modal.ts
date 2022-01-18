import { Graphql, Storage as localStorage } from "@/utils";
import Store from './index'
import { Commit } from "vuex";
import { storageType } from "types";
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
      fileStorage : new Graphql(),
      tabStorage : new localStorage(window.localStorage),
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
    },
    async login({commit,state} : {commit : Commit,state: stateType},loginForm : {username :string, password : string}) :Promise<void>{
      try{
      const {username, password} = loginForm;
      const token = await state.fileStorage.login?.(username,password);
      if(!token) throw new Error('다시 입력해주세요');
      commit('setIsModalOn',false);
      window.localStorage.setItem('jwt',token);
      Store.dispatch('user/init');
      }catch(e){
        alert(e.message)
      }
    }
  }
}