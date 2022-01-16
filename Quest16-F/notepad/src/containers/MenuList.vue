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
    menuList(){
      return this.$store.state.menu.menuList;
    }
  },
  methods: {
   clickEvent(menu :string){
     this.$store.dispatch(`menu/${menu}`);
   }
  }
}
</script>

<style>
</style>
