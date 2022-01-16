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
    postList(){
      return this.$store.state.file.fileList;
    }
  },
  methods: {
    clickPost(id : string) {
      this.$store.dispatch('file/clickFile',id);
    },
    removePost(id : string) {
      this.$store.dispatch('file/deleteFile',id);
    },
  },
};
</script>

<style>
</style>
