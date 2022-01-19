<template>
  <div v-show="isModalOn" class="modal">
    <div class="login">
      <button @click="modalOff" class="close-button">x</button>
      <label for="js-username-input">아이디</label>
      <input id="js-username-input" type="text" v-model="username" class="input">
      <label for="js-password-input">비밀번호</label>
      <input id="js-password-input" type="password" v-model="password" class="input">
      <button @click="login" class="input">로그인</button>
    </div>
    {{token}}
    {{key}}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data() {
    return {
      username: '',
      password: '',
    };
  },
  computed : {
    isModalOn(){
      return this.$store.state.modal.isModalOn
    },
    key(){
      return this.$store.state.info.username;
    },
    token(){
      return this.$store.state.info.token;
    },
    fileStorage(){
      return this.$store.state.dependency.fileStorage
    }, 
    tabStorage(){
      return this.$store.state.dependency.tabStorage
    } 
  },
  methods: {
    async login() :Promise<void>{
      try{
      const token = await this.fileStorage.login?.(this.username,this.password);
      if(!token) throw new Error('다시 입력해주세요');
      this.setUserInfo(token);
      this.setFileList(token);
      this.setTabList();
      this.modalOff();
      this.removeInput();
      }catch(e){
        console.log(e);
        alert(e.message)
      }
    },
    removeInput(){
      this.username = '';
      this.password = '';
    },
    setUserInfo(token : string){
      this.$store.dispatch('info/updateUsername',this.username);
      this.$store.dispatch('info/updateToken',token);
    },
    async setFileList(token : string){
      const nextList = await this.fileStorage.getPostList(token);
      this.$store.dispatch('file/updatePostList',nextList);
    },
    async setTabList(){
      const nextList = await this.tabStorage.getPostList(this.username);
      this.$store.dispatch('tab/updatePostList',nextList);
    },
    modalOff(){
      this.$store.dispatch('modal/modalOff');
    }
  },
});
</script>

<style>
.modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.5;
}
.input {
  width: 50%;
  height: 60px;
  border: 1px solid royalblue;
  color: black;
  border-radius: 16px;
}
.close-button{
  position: absolute;
  top : 0;
  width : 50px;
  height: 50px;
  align-self: flex-end;
}
.login {
  position: relative;
  border-radius: 16px;
  width: 50%;
  height: 50%;
  background-color: white;
  display: flex;
  color: black;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
</style>
