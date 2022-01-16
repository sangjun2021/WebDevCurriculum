<template>
  <ul>
  <li v-for="post in postList" :key="post.id">
    <Post :post="post" :selectFn="clickPost" :deleteFn="removePost"/>
  </li>
  </ul>
</template>

<script lang="ts">
import {Post} from '../components';

export default {
  components: {
    Post,
  },
  computed :{
    isLoading(){
      return this.$store.state.loading.isLoading;
    },
    postList(){
      return this.$store.state.tab.tabList;
    },
  },
  methods: {
    async clickPost(id : string) {
      if(this.isLoading) return;
      await this.$store.dispatch('tab/selectPost',id);
      await this.$store.dispatch('file/selectPost',id);
    },
    async removePost(id : string) {
      if(this.isLoading) return;
      await this.$store.dispatch('tab/deletePost',id);
    },
  },
};
</script>

<style>
</style>
