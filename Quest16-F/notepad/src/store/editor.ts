import { postType } from "types"
export default{
  namespaced : true,
  state(){
    return{
      post : {text : ''}
    }
  },
  mutations :{
    setPost(state : {post : postType},nextState : postType) : void{
      state.post = nextState
    }
  },
  actions : {
    updatePost({commit} : {commit : any},nextState : postType) : void{
      commit('setPost',nextState);
    },
  }
}