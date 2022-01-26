<template>
  <div>time : {{hashTime}}</div>
  <div>{{hashText}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import init,{hash} from '@/pkg/hash.js'
export default defineComponent({
  data(){
    return {
      hashText : "",
      hashTime : ""
    }
  },
computed:{
  text(){
    return this.$store.state.editor.text;
  },
  hashTime(){

  }
},
  methods: {
    async hashRust(){
      await init();
      const t0 = performance.now();
      this.hashText = hash(this.text);
      const t1 = performance.now();
      this.hashTime = t1-t0;
    }
  },
  watch:{
    text(){
      this.hashRust();
    }
  }
})
</script>

<style>

</style>