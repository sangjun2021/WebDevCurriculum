<template>
  <ul>
  <li v-for="menu in menuList" :key="menu">
    <Menu :name="menu" :clickEvent="clickEvent"/>
  </li>
  </ul>
</template>

<script lang="ts">
  import {Menu} from '../components/'
export default {
  components: {
    Menu,
  },
  computed:{
    isLoading(){
      return this.$store.state.loading.isLoading;
    },
    menuList(){
      return this.$store.state.menu.menuList;
    }
  },
  methods: {
   async clickEvent(menu :string){
     if(this.isLoading) return;
     await this.$store.dispatch(`menu/${menu}`);
   }
  }
}
</script>

<style>
</style>
