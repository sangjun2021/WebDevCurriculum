<template>
  <div
    class="post"
    :class="{selected : post?.isSelected }"
    @click.stop="select"
  >
    <span :class="{edited : post?.isEdited}" class="title">{{ post?.title }}</span>
    <button @click.stop="remove">
      X
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { postType } from '../../types';
export default defineComponent({
  props: {
    post: Object
  },
  computed:{
    fileStorage(){
       return this.$store.state.dependency.fileStorage
     },
    tabStorage(){
       return this.$store.state.dependency.tabStorage
     },
    token(){
      return this.$store.state.info.token;
    },
    key(){
      return this.$store.state.info.username;
      
    }
  },
  methods: {
    async select() {
     const nextFileList = this.$store.state.file.postList.map((post : postType)=>{
       return {
         ...post,
         isSelected : post.id ===this.post.id
       }
     });
    await this.tabStorage.insertFile(this.key,this.post);
    const nextList = await this.tabStorage.getPostList(this.key);
    this.$store.dispatch('tab/updatePostList',nextList);
     const nextTabList = this.$store.state.tab.postList.map((post : postType)=>{
       return {
         ...post,
         isSelected :post.id ===this.post.id
       }
     })
     this.$store.dispatch('info/updatePostId',this.post.id)
     this.$store.dispatch('info/updatePost',this.post);
     this.$store.dispatch('editor/updateText',this.post.text);
     this.$store.dispatch('file/updatePostList',nextFileList);
     this.$store.dispatch('tab/updatePostList',nextTabList);
    },
    async remove() {
    await this.fileStorage.deletePost(this.token,this.post.id);
    await this.tabStorage.deletePost(this.key,this.post.id);
    const nextFileList = await this.fileStorage.getPostList(this.token);
    const nextTabList = await this.tabStorage.getPostList(this.key);
    this.$store.dispatch('editor/updateText',"");
    this.$store.dispatch('info/updatePostId',"");
    this.$store.dispatch('file/updatePostList',nextFileList);
    this.$store.dispatch('tab/updatePostList',nextTabList);
    },
  },
});
</script>

<style>
.selected {
  background: rgb(217, 216, 213);
}
.edited::after {
  margin-left: 4px;
  content: " ";
  display: block;
  border-radius: 50%;
  background-color: red;
  width: 12px;
  height: 12px;
}
.title {
  display: flex;
  align-items: center;
}
.post {
  height: 100%;
  padding: 0 4px;
  flex-grow: 1;
  flex-shrink: 1;
  border: 1px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
