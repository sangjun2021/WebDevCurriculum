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
    updateText(nextText : string){
      const nextState = {...this.post, text : nextText};
      this.$store.dispatch("editor/updatePost",nextState);
    }
  }
}
</script>