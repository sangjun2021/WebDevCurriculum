import Store from './index'
import { Graphql } from '../utils'
export default{
  namespaced : true,
  state(){
    return{
      fileStorage : new Graphql(),
      menuList : ['newPost','save','saveAs','login','logout'],
      username : '',
      password : ''
    }
  },
  actions:{
    newPost(){
      Store.dispatch('file/createPost');
    },
    async save({commit,state} : {commit : any, state:any}){
      try{
      const post = Store.state.editor.post;
      const token = Store.state.user.token;
      if(post.title === 'untitled'){
        const newTitle = prompt('제목을 입력해주세요');
        const isOverLap = await state.fileStorage.checkOverLap(token,newTitle);
        if(isOverLap)throw new Error('중복된 제목입니다.');
        await Store.dispatch('file/updatePost',{...post, title : newTitle})
        return;
      }
      await Store.dispatch('file/updatePost',post);
    }catch(e){
      console.log(e)
      alert(e.message);
    }
  },
    async saveAs({commit,state} : {commit : any, state: any}){
      try{
      const post = Store.state.editor.post;
      const token = Store.state.user.token;
      const newTitle = prompt('제목을 입력해주세요');
        const isOverLap = await state.fileStorage.checkOverLap(token,newTitle);
        if(isOverLap){
          throw new Error('중복된 제목입니다.');
          return
        } 
        await Store.dispatch('file/updatePost',{...post, title : newTitle})
      }catch(e){
        alert(e.message);
      }
    },
    login(){
      Store.dispatch('modal/modalOn');
    },
    logout(){
      Store.dispatch('file/logout');
      Store.dispatch('tab/logout');
      Store.dispatch('editor/logout');
      Store.dispatch('user/logout');
    }
  }
}