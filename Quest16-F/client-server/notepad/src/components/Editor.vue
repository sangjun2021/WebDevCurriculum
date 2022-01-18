<template>
    <div
      :value="text"
      contenteditable="true"
      @input="updateText"
      class="text-editor"
    />
</template>

<script lang="ts">
import {postType} from '../../types'
export default {
  computed : {
    text(){
      return this.$store.state.editor.text;
    },
    postId(){
      return this.$store.state.info.postId;
    },
    tabList(){
      return this.$store.state.tab.postList;
    }
  },
  methods: {
    updateText(e : {
      target : {
        value : string
      }
    }){
      this.$store.dispatch('editor/updateText',e.target.value);
    },
    editPost(id : string){
      const nextList = this.tabList.map((post : postType)=>{
        return {...post, isEdited : post.id === id};
      })
      this.$store.dispatch('tab/updatePostList',nextList);
    }
  },
}
</script>
<style>
.text-editor {
  flex-grow: 1;
  padding: 16px;
}
</style>