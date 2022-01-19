<template>
  <ul class="file-container">
  <li v-for="post in postList" :key="post.id">
    <Post :post="post" :selectFn="clickPost" :deleteFn="removePost"/>
  </li>
  </ul>
</template>

<script lang="ts">
import {Post} from '@/components';
import {postType} from '@/types';
export default {
  components: {
    Post,
  },
  computed :{
    isLoading() : boolean{
      return this.$store.state.loading.isLoading;
    },
    postList() :Array<postType>{
      return this.$store.state.file.fileList;
    },
    post(){
      return this.$store.state.editor.post;
    }
  },
  methods: {
    async clickPost(id : string) {
      if(this.isLoading) return;
      await this.$store.dispatch('file/selectPost',id);
      await this.$store.dispatch('tab/insertPost',this.post);
      await this.$store.dispatch('tab/selectPost',id);
    },
    async removePost(id : string) {
      if(this.isLoading) return;
      await this.$store.dispatch('file/deletePost',id);
    },
  },
};
</script>

<style>
.file-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
</style>
