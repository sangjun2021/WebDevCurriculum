<template>
  <ul :class="`${type}-list`">
  <li v-for="post in postList" :key="post.id" :class="type" >
    <component :post="post" :is="type"></component>
  </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import File from "./File.vue"
import Tab from "./Tab.vue"
import {postType} from '@/types'
export default defineComponent({
  props : {
    type : String
  },
  components: {
   Tab, File
  },
  computed :{
    postId(){
      return this.$store.state.info.post.id;
    },
    postList(){
      return this.$store.state[this.type].postList.map((post:postType)=>({...post, isSelected : post.id === this.postId }));
    },
  },
});
</script>

<style>
.file-list {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

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
