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
    },
    fileList(){
      return this.$store.state.file.postList;
    },
    syncStorage(){
      return this.$store.state.dependency.syncStorage;
    }
  },
  methods: {
    async select() {
      const nextPost = await this.tabStorage.getPost(this.key,this.post.id);
     this.$store.dispatch('info/updatePost',this.post);
     this.$store.dispatch('editor/updateText',nextPost?.text || this.post.text);
     this.insertTab();
    },
    async insertTab(){
      await this.tabStorage.insertFile(this.key,this.post);
      await this.updateList();
    },
    async remove() {
      this.syncStorage.deletePost(this.token,this.post.id);
      const nextList = this.fileList.filter((post)=> post.id !== this.post.id);
      this.$store.dispatch('file/updatePostList',nextList);
      await this.tabStorage.deletePost(this.key,this.post.id);
      await this.updateList();
    },
    async updateList(){
      const nextTabList = await this.tabStorage.getPostList(this.key);
      this.$store.dispatch('tab/updatePostList',nextTabList);
    }
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
