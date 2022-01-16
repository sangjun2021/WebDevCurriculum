<template>
  <ul class="tab-list">
  <li v-for="post in postList" :key="post.id" class="tab" >
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
      await this.$store.dispatch('file/selectPost',id);
      await this.$store.dispatch('tab/selectPost',id);
    },
    async removePost(id : string) {
      if(this.isLoading) return;
      await this.$store.dispatch('tab/deletePost',id);
    },
  },
};
</script>

<style>
.tab-list {
  flex-grow: 1;
  display: flex;
  overflow-x: hidden;
}
.tab{
  flex-grow: 1;
  flex-shrink: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
