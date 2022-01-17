<template>
  <button @click="clickEvent(name)">
    {{ name }}
  </button>
</template>

<script lang="ts">
export default {
  props: {
    name: String,
    clickEvent: Function,
  },
};
</script>

<style>

</style>
