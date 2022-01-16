import { postType } from "types"
import Store from './index'
import {Storage as localStorage} from '../utils'
export default{
  namespaced : true,
  state(){
    return{
      tabList : [],
      storage : new localStorage(window.localStorage)
    }
  },
  mutations :{
    setTabList(state : {tabList : Array<postType>},nextState : Array<postType>) : void{
      state.tabList = nextState
    }
  },
  actions : {
    async init({commit,state} :{commit :any,state : any}){
      const key = Store.state.user.username;
      const postList = await state.storage.getPostList(key);
      commit('setTabList',postList);
    },
    async insertPost({commit,state} : {commit : any, state : any}, nextState : postType) : Promise<void>{
      try{
        const key = Store.state.user.username;
        if(!key) throw new Error('로그인을 먼저 해주세요')
        await state.storage.insertFile(key,nextState);
        const newList = await state.storage.getPostList(key);
        commit('setTabList',newList);
      }catch(e){
        alert(e.message)
        commit('setTabList',[])
      }
    },
    async deletePost({commit,state} : {commit : any, state : any},id : string) : Promise<void>{
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
    async selectPost({commit, state} : {commit : any, state : any},id : string) : Promise<void>{
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
    async updatePost({commit,state} : {commit : any,state : any}, nextState : postType) : Promise<void>{
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
    logout({commit} : {commit : any}){
      commit('setTabList',[])
    }
  }
}