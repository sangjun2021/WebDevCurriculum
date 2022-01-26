import { postType } from '@/types';
import {Commit} from 'vuex';
interface stateType {
  username : string
  token : string
  post : postType
  isOnline : boolean
}
export default{
  namespaced : true,
  state(){
    return{
      username : '',
      token : '',
      post : {},
      isOnline : true
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
    },
    setIsOnline(state : stateType, nextState : boolean) : void {
      state.isOnline = nextState;
    }
  },
  actions : {
    connect({commit} : {commit : Commit}){
      commit('setIsOnline',true)
    },
    disConnect({commit} : {commit : Commit}){
      commit('setIsOnline',false)
    },
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