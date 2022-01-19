<template>
  <button @click="clickEvent(name)">
    {{ name }}
  </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    name: String,
    clickEvent: Function,
  },
});
</script>