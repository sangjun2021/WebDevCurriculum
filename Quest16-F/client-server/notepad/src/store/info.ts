import {Commit} from 'vuex';
interface stateType {
  username : string
  token : string
  postId : string
}
export default{
  namespaced : true,
  state(){
    return{
      username : '',
      token : '',
      postId : '',
    }
  },
  mutations :{
    setInfo(state : stateType,nextState : stateType) : void{
      state.username = nextState.username;
      state.token = nextState.token;
      state.postId = nextState.postId;
    }
  },
  actions : {
    updateUsername({commit, state} : {
      commit : Commit, state : stateType
    },nextState : string){
      commit('setUser',{...state, username : nextState});
    },
    updateToken({commit, state} :{
      commit : Commit, state : stateType
    },nextState : string){
      window.localStorage.setItem('jwt',nextState);
      commit('setUser',{...state, token : nextState});
    },
    updatePostId({commit,state} : {commit : Commit, state : stateType}, nextId : string){
      commit('setUser',{...state, postId : nextId})
    },
    logout({commit} : {commit : Commit}){
      commit('setUser',{token : '', username : ''})
      window.localStorage.removeItem('jwt');
    }
  }
}