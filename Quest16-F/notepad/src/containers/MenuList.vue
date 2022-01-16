<template>
  <ul class="button-container">
  <li v-for="menu in menuList" :key="menu" class="">
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
.button-container {
  margin: 0;
  height: 40px;
  border-bottom: 1px solid;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
