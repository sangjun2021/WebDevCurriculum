import { Graphql, Storage as localStorage } from "@/utils"
import Store from './index'
import { postType } from "types"
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
    setFileList(state : {fileList : Array<postType>},nextState : Array<postType>) : void{
      state.fileList = nextState
    }
  },
  actions : {
    async init({commit,state} :{commit :any,state : any}){
      const key = Store.state.user.token;
      const auth = await state.fileStorage.auth(key);
      if(!auth) return;
      const postList = await state.fileStorage.getPostList(key);
      await commit('setFileList',postList);
      await Store.dispatch('tab/init');
    },
    async createPost({commit,state} : {commit : any, state : any}) : Promise<void>{
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
    async deletePost({commit,state} : {commit : any,state : any},id : string) : Promise<void>{
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
    async selectPost({commit, state} : {commit : any, state : any},id : string) : Promise<void>{
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
    async updatePost({commit,state} : {commit : any, state : any}, nextState : postType) : Promise<void>{
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
    logout({commit} : {commit : any}){
      commit('setFileList',[])
    }
  },
}