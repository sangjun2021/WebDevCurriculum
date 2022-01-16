<template>
  <ul>
  <li v-for="post in postList" :key="post.id">
    <Post :post="post" :selectFn="clickPost" :deleteFn="removePost"/>
  </li>
  </ul>
</template>

<script lang="ts">
import {Storage} from '../utils'
import {Post} from '../components';

export default {
  components: {
    Post,
  },
  data(){
    return{
      storage : new Storage(window.localStorage),
    }
  },
  computed :{
    postList(){
      return this.$store.state.tab.TabList;
    },
  },
  methods: {
    clickPost(id : string) {
      this.$store.dispatch('tab/clickTab',id);
    },
    removePost(id : string) {
      this.$store.dispatch('tab/deleteTab',id);
    },
  },
};
</script>

<style>
</style>
