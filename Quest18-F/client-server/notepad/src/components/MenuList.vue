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
      return this.$store.state.info.username;
    },
    post(){
      return this.$store.state.info.post;
    }
   },
  methods: {
   clickEvent(name :string){
     this[name]();
   },
   async new(){
     const nextPost = await this.fileStorage.createPost(this.token,{title : 'untitled', text : ''});
     await this.tabStorage.insertFile(this.key,nextPost);
     this.updateList();
   },
   async updateList(){
     const nextFileList = await this.fileStorage.getPostList(this.token);
     const nextTabList = await this.tabStorage.getPostList(this.key);
     this.$store.dispatch('file/updatePostList',nextFileList);
     this.$store.dispatch('tab/updatePostList',nextTabList);
   },
   async save(){
     console.log(this.post.title)
     if(this.post.title === 'untitled'){
       this.saveAs();
       return;
     }
     await this.fileStorage.updatePost(this.token, this.post);
     await this.tabStorage.updatePost(this.key, {...this.post, isEdited : false});
     this.updateList();
   },
   async saveAs(){
     try{
      const title = prompt('이름을 입력해주세요');
    if (!title) return;
    const checking = await this.fileStorage.checkOverLap(title);
    if (checking) throw new Error('중복된 제목입니다.');
     await this.fileStorage.updatePost(this.token,{...this.post, title});
     await this.tabStorage.updatePost(this.key,{...this.post,title, isEdited : false});
    this.updateList();
     }catch(e : any){
       console.dir(e);
       alert(e.message);
     }
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
