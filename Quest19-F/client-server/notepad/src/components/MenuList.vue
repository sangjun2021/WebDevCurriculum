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
    },
    isOnline(){
      return this.$store.state.info.isOnline;
    },
    fileList(){
      return this.$store.state.file.postList;
    },
    syncStorage(){
      return this.$store.state.dependency.syncStorage;
    },
   },
  methods: {
   clickEvent(name :string){
     this[name]();
   },
   async new(){
     if(this.isOnline){
     const nextPost = await this.fileStorage.createPost(this.token,{title : 'untitled', text : ''});
     await this.tabStorage.insertFile(this.key,nextPost);
     this.updateList();
     const nextList = [...this.fileList, nextPost];
    this.$store.dispatch('file/updatePostList',nextList)
     }else{
      const nextPost = {id : Date.now().toString(36)+Math.random(), title : 'untitled', text : ""}
      this.syncStorage.updatePost(this.token,nextPost);
      await this.tabStorage.insertFile(this.key,nextPost);
      this.updateList();
      const nextList = [...this.fileList, nextPost];
      this.$store.dispatch('file/updatePostList',nextList)
     }
   },
   async updateList(){
     const nextTabList = await this.tabStorage.getPostList(this.key);
     this.$store.dispatch('tab/updatePostList',nextTabList);
   },
   async save(){
     if(this.post.title === 'untitled'){
       this.saveAs();
       return;
     }
     await this.tabStorage.updatePost(this.key, {...this.post, isEdited : false});
     if(this.isOnline) this.fileStorage.updatePost(this.token, this.post);
     else this.syncStorage.update(this.token,this.post);
     this.updateList();
     const nextList = this.fileList.map(post=> {
       if(post.id !== this.post) return post;
       return this.post;
     })
     this.$store.dispatch('file/updatePostList',nextList)
   },
   async saveAs(){
     try{
      const title = prompt('이름을 입력해주세요');
    if (!title) return;
    const checking = this.fileList.filter(post=> post.title === title);
    if (checking.length) throw new Error('중복된 제목입니다.');
       
     if(this.isOnline)this.fileStorage.updatePost(this.token,{...this.post, title});
     else this.syncStorage.updatePost(this.token,{...this.post,title});
     await this.tabStorage.updatePost(this.key,{...this.post,title, isEdited : false});
    this.updateList();
       const nextList = this.fileList.map(post=> {
       if(post.id !== this.post.id) return post;
       return {...this.post, title};
     })
     this.$store.dispatch('file/updatePostList',nextList)
     }catch(e : any){
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
