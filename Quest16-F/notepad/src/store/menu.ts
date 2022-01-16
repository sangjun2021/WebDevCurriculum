import Store from './index'
export default{
  namespaced : true,
  state(){
    return{
      menuList : ['newPost','save','saveAs','login','logout'],
      username : '',
      password : ''
    }
  },
  actions:{
    newPost(){
      console.log('새로운 문서를 생성합니다.')
      // createFile
    },
    save(){
      console.log('저장합니다.')
      // checkTitle
      // checkOverlap
      // updateFile
    },
    saveAs(){
      console.log('다른이름으로 저장합니다.')
      // checkOverlap
      // updateFile
    },
    login(){
      Store.dispatch('modal/modalOn');
    },
    logout(){
      console.log('로그아웃합니다.')
      // fileLogout
      // tabLogout
      // editorLogout
    }
  }
}