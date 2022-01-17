import { postType } from "types"
import Store from './index'
import {Storage as localStorage} from '../utils'
export default{
  namespaced : true,
  state(){
    return{
      post : {text : ''},
      storage : new localStorage(window.localStorage)
    }
  },
  mutations :{
    setPost(state : {post : postType},nextState : postType) : void{
      state.post = nextState
    }
  },
  actions : {
    updateText({commit,state} : {commit : any, state : any},nextState : string) : void{
      const nextPost = {...state.post, text : nextState, isEdited : true, isSelected : true};
      commit('setPost',nextPost);
      Store.dispatch('tab/updatePost',nextPost);
    },
    updatePost({commit}:{commit : any},nextState : postType){
      commit('setPost',nextState);
    },
    logout({commit} : {commit : any}){
      commit('setPost',{})
    }
  }
}