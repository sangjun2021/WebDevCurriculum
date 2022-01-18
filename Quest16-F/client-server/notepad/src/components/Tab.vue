<template>
  <div
    class="post"
    :class="{selected : post?.isSelected }"
    @click.stop="select"
  >
    <span :class="{edited : post?.isEdited}" class="title">{{ post?.title }}</span>
    <button @click.stop="remove">
      X
    </button>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    post: Object
  },
  methods: {
    select() {
    console.log('탭 선택');
    },
    remove() {
     console.log('탭 삭제')
    },
  },
};
</script>

<style>
.selected {
  background: rgb(217, 216, 213);
}
.edited::after {
  margin-left: 4px;
  content: " ";
  display: block;
  border-radius: 50%;
  background-color: red;
  width: 12px;
  height: 12px;
}
.title {
  display: flex;
  align-items: center;
}
.post {
  height: 100%;
  padding: 0 4px;
  flex-grow: 1;
  flex-shrink: 1;
  border: 1px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
