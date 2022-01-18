import { postType, storageType } from "types"
import Store from './index'
import { Commit } from "vuex"
import {Storage as localStorage} from '../utils'
interface stateType{
  post : postType,
  storage : storageType
}

export default{
  namespaced : true,
  state(){
    return{
      post : {text : ''},
      storage : new localStorage(window.localStorage)
    }
  },
  mutations :{
    setPost(state : stateType,nextState : postType) : void{
      state.post = nextState
    }
  },
  actions : {
    updateText({commit,state} : {commit : Commit, state : stateType  },nextState : string) : void{
      const nextPost = {...state.post, text : nextState, isEdited : true, isSelected : true};
      commit('setPost',nextPost);
      Store.dispatch('tab/updatePost',nextPost);
    },
    updatePost({commit}:{commit : Commit},nextState : postType){
      commit('setPost',nextState);
    },
    logout({commit} : {commit : Commit}){
      commit('setPost',{})
    }
  }
}