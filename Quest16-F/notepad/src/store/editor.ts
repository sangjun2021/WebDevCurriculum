import { postType } from "types"
import Store from './index'
import {Storage as localStorage} from '../utils'
export default{
  namespaced : true,
  state(){
    return{
      post : {text : ''},
      sotrage : new localStorage(window.localStorage)
    }
  },
  mutations :{
    setPost(state : {post : postType},nextState : postType) : void{
      state.post = nextState
    }
  },
  actions : {
    //to tab, editor
    updateText({commit,state} : {commit : any, state : any},nextState : string) : void{
      const nextPost = {...state.post, text : nextState, isEdited : true};
      commit('setPost',nextPost);
      Store.dispatch('tab/updatePost',nextPost);
    },
    //to file,tab, editor
    async getCurrentPage(){
      const currentPageId = 1;
      await Store.dispatch('file/selectPost',currentPageId)
      await Store.dispatch('tab/selectPost',currentPageId)
    }
  }
}