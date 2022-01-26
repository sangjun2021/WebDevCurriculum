<template>
  <div>time : {{hashTime}}</div>
  <div>{{hashText}}</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

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
     async hash(){
      const t0 = performance.now();
      this.hashText = await this.digest(this.text);
      const t1 = performance.now();
      this.hashTime = t1-t0;
    },
    async digest(message){
        const msgUint8 = new TextEncoder().encode(message);                           // encode as (utf-8) Uint8Array
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
        const hashArray = Array.from(new Uint8Array(hashBuffer));                     // convert buffer to byte array
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); // convert bytes to hex string
        return hashHex;
    }
  },
  watch:{
    text(){
      this.hash();
    }
  }
})
</script>

<style>

</style>