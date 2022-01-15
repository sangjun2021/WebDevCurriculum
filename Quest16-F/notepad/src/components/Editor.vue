<template>
    <textarea
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
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

</style>