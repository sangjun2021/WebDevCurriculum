import { postType, storageType } from "types"
import Store from './index'
import {Storage as localStorage} from '../utils'
import { Commit } from "vuex"
interface stateType {
  tabList : Array<postType>;
  storage : storageType
}
export default{
  namespaced : true,
  state(){
    return{
      tabList : [],
      storage : new localStorage(window.localStorage)
    }
  },
  mutations :{
    setTabList(state : stateType, nextState : Array<postType>) : void{
      state.tabList = nextState
    }
  },
  actions : {
    async init({commit,state} :{commit : Commit,state : stateType}){
      const key = Store.state.user.username;
      const postList = await state.storage.getPostList(key);
      commit('setTabList',postList);
    },
    async insertPost({commit,state} : {commit : Commit, state : stateType}, nextState : postType) : Promise<void>{
      try{
        const key = Store.state.user.username;
        if(!key) throw new Error('로그인을 먼저 해주세요')
        await state.storage.insertFile?.(key,nextState);
        const newList = await state.storage.getPostList(key);
        commit('setTabList',newList);
      }catch(e){
        alert(e.message)
        commit('setTabList',[])
      }
    },
    async deletePost({commit,state} : {commit : Commit, state : stateType},id : string) : Promise<void>{
      try{
        const key = Store.state.user.username;
        if(!key) throw new Error('로그인을 먼저 해주세요');
        await state.storage.deletePost(key,id);
        const newList = await state.storage.getPostList(key);
        commit('setTabList',newList);
      }catch(e){
        alert(e.message);
        commit('setTabList',[])
      }
    },
    async selectPost({commit, state} : {commit : Commit, state : stateType},id : string) : Promise<void>{
      try{
        const key = Store.state.user.username;
        const nextList = state.tabList.map((post : postType)=>{
          return {...post, isSelected : post.id === id};
        })
        const nextPost = await state.storage.getPost(key,id);
        commit('setTabList',nextList);
        Store.dispatch('editor/updatePost',nextPost)
      }catch(e){
        alert(e.message);
        commit('setTabList',[])
      }
    },
    async updatePost({commit,state} : {commit : Commit,state : stateType}, nextState : postType) : Promise<void>{
      try{
        const key = Store.state.user.username;
        await state.storage.updatePost(key,nextState);
        const nextList = await state.storage.getPostList(key);
        console.log(nextList);
        commit('setTabList',nextList);
      }catch(e){
        alert(e.message);
        commit('setTabList',[])
      }
    },
    logout({commit} : {commit : Commit}){
      commit('setTabList',[])
    }
  }
}