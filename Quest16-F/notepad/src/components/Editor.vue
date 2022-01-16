<template>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="text-editor"
    />
</template>

<script lang="ts">
export default {
  props : {
    modelValue : String
  }
}
</script>
<style>
.text-editor {
  flex-grow: 1;
  padding: 16px;
}
</style>