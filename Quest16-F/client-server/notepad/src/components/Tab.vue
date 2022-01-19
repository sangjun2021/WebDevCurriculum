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
import { postType } from '../../types';
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    post: Object
  },
  computed:{
    key(){
      return this.$store.state.info.username;
    },
    fileStorage(){
      return this.$store.state.dependency.fileStorage;
    },
    tabStorage(){
      return this.$store.state.dependency.tabStorage
    }
  },
  methods: {
    async select() {
     const nextFileList = this.$store.state.file.postList.map((post : postType)=>{
       return {
         ...post,
         isSelected :post.id ===this.post.id
       }
     });
     const nextTabList = this.$store.state.tab.postList.map((post : postType)=>{
       return {
         ...post,
         isSelected :post.id ===this.post.id
       }
     })
     const nextPost = await this.tabStorage.getPost(this.token, this.post.id);
     this.$store.dispatch('info/updatePostId',this.post.id)
     this.$store.dispatch('editor/updateText',nextPost.text);
     this.$store.dispatch('info/updatePost',nextPost);
     this.$store.dispatch('file/updatePostList',nextFileList);
     this.$store.dispatch('tab/updatePostList',nextTabList);
    },
    async remove() {
    await this.tabStorage.deletePost(this.key,this.post.id);
    const nextTabList = await this.tabStorage.getPostList(this.key);
    this.$store.dispatch('editor/updateText',"");
    this.$store.dispatch('info/updatePostId',"");
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
