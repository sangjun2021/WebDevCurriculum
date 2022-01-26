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
    key(){
      return this.$store.state.info.username;
    },
    tabStorage(){
      return this.$store.state.dependency.tabStorage
    }
  },
  methods: {
    async select() {
     this.$store.dispatch('info/updatePost',this.post);
     this.$store.dispatch('editor/updateText',this.post.text);
    },
    async remove() {
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
