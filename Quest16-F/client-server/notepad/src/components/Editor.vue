<template>
    <textarea
      :value="modelValue"
      @input="updateText"
      class="text-editor"
    />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {postType} from '../../types'
export default defineComponent({
  computed : {
    modelValue(){
      return this.$store.state.editor.text;
    },
    tabList(){
       return this.$store.state.tab.postList.map((post:postType)=>({...post, isSelected : post.id === this.postId }));
    },
    tabStorage(){
      return this.$store.state.dependency.tabStorage;
    },
    key(){
      return this.$store.state.info.username;
    },
    post(){
      return this.$store.state.info.post;
    }
  },
  methods: {
    async updateText(e : {
      target : {
        value :string
      }
    }){
      const {value} = e.target;
      await this.tabStorage.updatePost(this.key, {...this.post, text : value});
      const nextList = await this.tabStorage.getPostList(this.key);
      this.$store.dispatch('tab/updatePostList',nextList);
      this.$store.dispatch('editor/updateText',value);
      this.$store.dispatch('info/updatePost',{...this.post, text : value});
      this.editPost(this.post.id);
    },
    editPost(id : string){
      const nextList = this.tabList.map((post : postType)=>{
        return {...post, isEdited : post.id === id};
      })
      this.$store.dispatch('tab/updatePostList',nextList);
    }
  },
})
</script>
<style>
.text-editor {
  flex-grow: 1;
  padding: 16px;
}
</style>