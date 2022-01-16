<template>
<LoginModal/>
  <div>
    메뉴리스트
    <MenuList/>
    파일
    <Files/>
  </div>
  <div>
    탭
    <Tabs/>
    에디터
    <Editor/>
  </div>
</template>

<script>
import {Editor, Files, MenuList, Tabs, LoginModal} from './containers'
export default {
  components: {
    Editor,
    Files,
    MenuList,
    Tabs,
    LoginModal
  },
};
</script>
