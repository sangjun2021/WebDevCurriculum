<template>
  <Editor/>
  <Files/>
  <MenuList/>
  <button @click="erase">지우기</button>
  <button @click="initPostList">문서초기화</button>
</template>

<script>
import {Graphql} from './utils'
import {Editor, Files, MenuList} from './containers'
export default {
  components: {
    Editor,
    Files,
    MenuList
  },
  data(){
    return{
      graphql : new Graphql(),
      postList : [{id :'1', title : "제목", text : "내용"},{id :'2', title : "제목", text : "내용"},{id :'3', title : "제목", text : "내용"},{id :'4', title : "제목", text : "내용"},{id :'5', title : "제목", text : "내용"}]
    }
  },
  methods: {
    async getTo(){
      const token = await this.graphql.login('user2','1234');
      console.log(token);
      const username = await this.graphql.auth(token);
      console.log(username);
      const posts = await this.graphql.getPostList(token);
      console.log(posts)
    },
    erase(){
      this.$store.dispatch("editor/updatePost",{});
    },
    initPostList(){
      this.$store.dispatch('file/updateFileList',this.postList)
    }
  },
};
</script>
