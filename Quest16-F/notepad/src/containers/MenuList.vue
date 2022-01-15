<template>
  <ul>
  <li v-for="menu in menuList" :key="menu">
    <Menu :name="menu" :clickEvent="events[menu]"/>
  </li>
  </ul>
</template>

<script lang="ts">
  import {Menu} from '../components/'

export default {
  components: {
    Menu,
  },
  data(){
    return{
      menuList : ['new','save','saveAs','login','logout'],
      events : {
        new : this.clickNew,
        save : this.clickSave,
        saveAs : this.clickSaveAs,
        login : this.clickLogin,
        logout : this.clickLogout
      }
    }
  },
  methods: {
    clickNew(){
      console.log('새문서 생성');
    },
    clickSave(){
      console.log('저장');
    },
    clickSaveAs(){
      console.log('다른이름으로 저장');
    },
    clickLogin(){
      console.log('로그인');
    },
    clickLogout(){
      console.log('로그아웃');
    }
  },
};
</script>

<style>
</style>
