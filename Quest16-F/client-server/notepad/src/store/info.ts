import { postType } from 'types';
import {Commit} from 'vuex';
interface stateType {
  username : string
  token : string
  post : postType
}
export default{
  namespaced : true,
  state(){
    return{
      username : '',
      token : '',
      post : {}
    }
  },
  mutations :{
    setUsername(state : stateType,nextState : string) : void{
      state.username = nextState;
    },
    setToken(state : stateType,nextState : string) : void{
      state.token = nextState;
    },
    setPost(state :stateType, nextState : postType) : void{
      state.post = nextState;
    }
  },
  actions : {
    updateUsername({commit} : {commit : Commit} ,nextState : string){
      commit('setUsername',nextState);
    },
    updateToken({commit} :{commit : Commit}, nextState : string){
      window.localStorage.setItem('jwt',nextState);
      commit('setToken',nextState);
    },
    updatePostId({commit} : {commit : Commit}, nextId : string){
      commit('setPostId',nextId);
    },
    updatePost({commit} : {commit : Commit},nextPost :postType){
      commit('setPost',nextPost);
    },
    logout({commit} : {commit : Commit}){
      commit('setPostId',"");
      commit('setUsername',"");
      commit('setToken',"");
      window.localStorage.removeItem('jwt');
    }
  }
}