<template>
  <ul :class="`${type}-list`">
  <li v-for="post in postList" :key="post.id" :class="type" >
    <component :post="post" :is="type"></component>
  </li>
  </ul>
</template>

<script lang="ts">
import File from "./File.vue"
import Tab from "./Tab.vue"

export default {
  props : {
    type : String
  },
  components: {
   Tab, File
  },
  computed :{
    postList(){
      return this.$store.state[this.type].postList;
    },
  },
};
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
