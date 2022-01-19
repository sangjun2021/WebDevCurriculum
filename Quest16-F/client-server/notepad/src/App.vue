<template>
  <aside class="left-sidebar">
    <MenuList/>
    <Posts type="file"/>
  </aside>
    <main class="editor-container">
      <nav class="tab-container">
        <Posts type="tab"/>
      </nav> 
      <Editor/>
    </main>
    <LoginModal/> 
</template>

<script>
import { defineComponent } from 'vue'
import {Editor, MenuList, Posts, LoginModal} from './components'
export default defineComponent({
  components: {
    Editor,
    MenuList,
    Posts,
    LoginModal
  },
  data(){
    return {
      fileStorage : this.$store.state.dependency.fileStorage,
      tabStorage : this.$store.state.dependency.tabStorage
    }
  },
  computed :{
    token(){
      return this.$store.state.info.token
    }
  },
  mounted() {
    this.initFileList();
    this.initTabList();
    this.initInfo();
  },
  methods: {
    initFileList(){
      console.log('파일리스트 초기화')
    },
    initTabList(){
      console.log('탭리스트 초기화')
    },
    initInfo(){
      console.log('유저정보,포스트 초기화');
    }
  },
});
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
