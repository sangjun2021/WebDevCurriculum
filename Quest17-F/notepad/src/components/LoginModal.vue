<template>
  <div v-show="isModalOn" class="modal">
    <div class="login">
      <button @click="modalOff" class="close-button">x</button>
      <label for="js-username-input">아이디</label>
      <input id="js-username-input" type="text" v-model="username" class="input">
      <label for="js-password-input">비밀번호</label>
      <input id="js-password-input" type="password" v-model="password" class="input">
      <button @click="login(username,password)" class="input">로그인</button>
    </div>
  </div>
</template>

<script lang="ts">
import { loginFormType } from '../types/loginFormType';

export default {
  props: {
    login: Function,
    isModalOn : Boolean,
    modalOff : Function
  },
  data() : loginFormType {
    return {
      username: '',
      password: '',
    };
  },
};
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
