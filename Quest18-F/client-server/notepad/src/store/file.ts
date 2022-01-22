import { Commit } from "vuex"
import { postType, storageType } from "@/types"
interface stateType {
  postList : Array<postType>;
  fileStorage : storageType;
  tabSStorage : storageType;
}
export default{
  namespaced : true,
  state(){
    return{
      postList : []
    }
  },
  mutations :{
    setPostList(state : stateType, nextState : Array<postType>) : void{
      state.postList = nextState
    }
  },
  actions : {
    updatePostList({commit} : {commit : Commit},nextList : Array<postType>){
      commit('setPostList',nextList);
    },
    logout({commit} : {commit : Commit}){
      commit('setPostList',[])
    }
  },
}