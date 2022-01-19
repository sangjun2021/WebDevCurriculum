<template>
  <ul class="button-container">
  <li v-for="menu in menuList" :key="menu">
    <Menu :name="menu" :clickEvent="clickEvent"/>
  </li>
  </ul>
</template>

<script lang="ts">
  import Menu from "./Menu.vue"
  import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    Menu,
  },
  data(){
    return {
      menuList : ['new','save','saveAs','login','logout']
    }
  },
     computed:{
     fileStorage(){
       return this.$store.state.dependency.fileStorage
     },
     tabStorage(){
       return this.$store.state.dependency.tabStorage
     },
    token(){
       return this.$store.state.info.token
    },
    key(){
      return this.$sotre.state.info.username;
    }
   },
  methods: {
   clickEvent(name :string){
     this[name]();
   },
   async new(){
    //  console.log(this.$store.state.info.token)
    //  console.log("new",this.token, this.key);
     const nextPost = await this.fileStorage.createPost(this.token,{title : 'untitled', text : ''});
     await this.tabStorage.insertFile(this.key,nextPost);
     const nextFileList = await this.fileStorage.getPostList(this.token);
     const nextTabList = await this.tabStorage.getPostList(this.key);
     this.$store.dispatch('file/updatePostList',nextFileList);
     this.$store.dispatch('tab/updatePostList',nextTabList);
   },
   async save(){
     console.log('save');

   },
   async saveAs(){
     console.log('saveAs')
   },
   async login(){
     this.$store.dispatch('modal/modalOn')
   },
   logout(){
     this.$store.dispatch('file/logout');
     this.$store.dispatch('tab/logout');
     this.$store.dispatch('editor/logout');
     this.$store.dispatch('info/logout');
   }
  }
})
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
