import { Graphql, Storage as localStorage } from "@/utils";
import Store from './index'

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
    setIsModalOn(state : {isModalOn : boolean},nextState : boolean ) : void{
      state.isModalOn = nextState;
    }
  },
  actions : {
    modalOn({commit} : {commit : any}) : void{
      commit('setIsModalOn',true);
    },
    modalOff({commit} : {commit : any}) : void{
      commit('setIsModalOn',false);
    },
    async login({commit,state} : {commit : any,state: any},loginForm : {username :string, password : string}) :Promise<void>{
      try{
      const {username, password} = loginForm;
      const token = await state.fileStorage.login(username,password);
      if(!token) throw new Error('다시 입력해주세요');
      commit('setIsModalOn',false);
      window.localStorage.setItem('jwt',token);
      Store.dispatch('user/init');
      }catch(e : any){
        alert(e.message)
      }
    }
  }
}