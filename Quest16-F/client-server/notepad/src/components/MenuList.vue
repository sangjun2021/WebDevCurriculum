<template>
  <ul class="button-container">
  <li v-for="menu in menuList" :key="menu">
    <Menu :name="menu" :clickEvent="clickEvent"/>
  </li>
  </ul>
</template>

<script lang="ts">
  import Menu from "./Menu.vue"
export default {
  components: {
    Menu,
  },
  data(){
    return {
      menuList : ['new','save','saveAs','login','logout'],
      fileStorage : this.$store.state.dependency.fileStorage,
      tabStorage : this.$store.state.dependency.tabStorage,
    }
  },
  methods: {
   clickEvent(name :string){
     this[name]();
   },
   async new(){
     console.log('new');
   },
   async save(){
     console.log('save');
   },
   async saveAs(){
     console.log('saveAs')
   },
   async login(){
     console.log('login')
   },
   async logout(){
     console.log("logout")
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
