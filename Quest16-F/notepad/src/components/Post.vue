<template>
  <div
    class="list"
    :class="{selected : post.isSelected }"
    @click.stop="select"
  >
    <span :class="{edited : post.isEdited}">{{ post.title }}</span>
    <button @click.stop="remove">
      X
    </button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    post: Object,
    selectFn: Function,
    deleteFn: Function,
  },
  methods: {
    select() {
      this.selectFn(this.post.id);
    },
    remove() {
      this.deleteFn(this.post.id);
    },
  },
};
</script>

<style>
.selected {
  background: gray;
}
</style>
