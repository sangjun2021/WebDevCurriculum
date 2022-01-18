import { Graphql, Storage as localStorage } from "@/utils"
import { Commit } from "vuex"
import Store from './index'
import { postType, storageType } from "types"
interface stateType {
  fileList : Array<postType>;
  fileStorage : storageType;
  tabSStorage : storageType;
}
export default{
  namespaced : true,
  state(){
    return{
      fileList : [],
      fileStorage : new Graphql(),
      tabStorage : new localStorage(window.localStorage)
    }
  },
  mutations :{
    setFileList(state : stateType, nextState : Array<postType>) : void{
      state.fileList = nextState
    }
  },
  actions : {
    async init({commit,state} :{commit :Commit,state : stateType}){
      const key = Store.state.user.token;
      const auth = await state.fileStorage.auth?.(key);
      if(!auth) return;
      const postList = await state.fileStorage.getPostList(key);
      await commit('setFileList',postList);
      await Store.dispatch('tab/init');
    },
    async createPost({commit,state} : {commit : Commit, state : stateType}) : Promise<void>{
      try{
        const token = Store.state.user.token;
        if(!token) throw new Error('로그인을 먼저해주세요')
        const newPost = await state.fileStorage.createPost(token,{title : "untitled", text : ""});
        const newPostList = await state.fileStorage.getPostList(token);
        commit('setFileList',newPostList);
        await Store.dispatch('tab/insertPost',newPost);
        await Store.dispatch('file/selectPost',newPost.id);
        await Store.dispatch('tab/selectPost',newPost.id);
      }catch(e){
        console.log(e);
        alert(e.message);
        commit('setFileList',[]);
      }
    },
    async deletePost({commit,state} : {commit : Commit,state : stateType},id : string) : Promise<void>{
      try{
        const token = Store.state.user.token;
        if(!token) throw new Error('로그인을 먼저해주세요');
        await state.fileStorage.deletePost(token,id);
        const newPostList = await state.fileStorage.getPostList(token);
        commit('setFileList',newPostList);
        Store.dispatch('tab/deletePost',id);
      }catch(e){
        alert(e.message);
        commit('setFileList',[]);
      }
    },
    async selectPost({commit, state} : {commit : Commit, state : stateType},id : string) : Promise<void>{
      try{
        const token = Store.state.user.token;
        if(!token) throw new Error('로그인을 먼저해주세요')
        const postList = await state.fileStorage.getPostList(token);
        const post = await state.fileStorage.getPost(token,id);
        const newPostList = postList.map((post: postType)=>{
          return {...post, isSelected : post.id === id}
        })
        commit('setFileList',newPostList);
        await Store.dispatch('editor/updatePost',post);
      }catch(e){
        alert(e.message);
        commit('setFileList',[]);
      }
    },
    async updatePost({commit,state} : {commit : Commit, state : stateType}, nextState : postType) : Promise<void>{
      try{
        const token = Store.state.user.token;
        if(!token) throw new Error('로그인을 먼저해주세요');
        const newPost = await state.fileStorage.updatePost(token,nextState);
        const newPostList = await state.fileStorage.getPostList(token);
        commit('setFileList',newPostList);
       await Store.dispatch('tab/updatePost',newPost);
      }catch(e){
        alert(e.message);
        commit('setFieList',[]);
      }
    },
    logout({commit} : {commit : Commit}){
      commit('setFileList',[])
    }
  },
}