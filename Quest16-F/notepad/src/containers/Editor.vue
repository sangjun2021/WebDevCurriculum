<template>
  <Editor  :modelValue="post.text"
  @update:modelValue="updateText" />
</template>

<script lang="ts">
import {Editor} from '../components'
export default{
  components : { Editor },
  computed : {
    post(){
      return this.$store.state.editor.post;
    }
  },
  methods : {
    async updateText(nextText : string){
      if(!this.post.id){
        alert('글이 선택되지 않았습니다.');
        return;
      }
      await this.$store.dispatch("editor/updateText",nextText);
    },
  }
}
</script>