<template>
  <ul>
  <li v-for="post in postList" :key="post.id">
    <Post :post="post" :selectFn="clickPost" :deleteFn="removePost"/>
  </li>
  </ul>
</template>

<script lang="ts">
import {Post} from '../components/index';
import { postType } from '../../types/postType';

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
      const nextState = this.postList.map((post : postType) => {
        if (post.id === id) post.isSelected = true;
        else post.isSelected = false;
        return post;
      });
      this.$store.dispatch('file/updateFileList',nextState);
    },
    removePost(id : string) {
      const nextSTate = this.postList.filter((post : postType) => post.id !== id);
      this.$store.dispatch('file/updateFileList',nextSTate);
    },
  },
};
</script>

<style>
</style>
