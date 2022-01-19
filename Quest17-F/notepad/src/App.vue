<template>
  <aside class="left-sidebar">
    <MenuList/>
    <Files/>
  </aside>
    <main class="editor-container">
      <nav class="tab-container">
        <Tabs/>
      </nav> 
      <Editor/>
    </main>
    <LoginModal/> 
</template>

<script>
import {Editor, Files, MenuList, Tabs, LoginModal} from '@/containers'
export default {
  components: {
    Editor,
    Files,
    MenuList,
    Tabs,
    LoginModal
  },
  mounted(){
    this.$store.dispatch('user/init');
  }
};
</script>

<style>
html,
body{
  height: 100%;
}
#app {
  display: flex;
  height: 100%;
}

* {
  box-sizing: border-box;
}
ul,
li {
  padding-left: 0;
  margin: 0;
  list-style: none;
}
.left-sidebar {
  border: 1px solid;
  width: 300px;
}
.editor-container {
  border: 1px solid;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.tab-container {
  height: 40px;
  display: flex;
  border-bottom: 1px solid;
}
</style>
