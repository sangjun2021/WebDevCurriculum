<template>
  <div v-show="isModalOn" class="modal">
    <button @click="modalOff">x</button>
    <label for="js-username-input" />
    <input id="js-username-input" type="text" v-model="username">
    <label for="js-password-input" />
    <input id="js-password-input" type="password" v-model="password">
    <button @click="login(username,password)">로그인</button>
  </div>
</template>

<script lang="ts">
import { loginFormType } from '../../types/loginFormType';

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
</style>
