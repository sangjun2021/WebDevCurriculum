<template>
  <LoginModal :login="login" :isModalOn="isModalOn" :modalOff="modalOff"/>
</template>

<script>
import {LoginModal} from '../components'
export default {
  components : {
    LoginModal
  },
  computed:{
    isModalOn(){
      return this.$store.state.modal.isModalOn;
    }
  },
  methods:{
    login(username,password){
      this.$store.dispatch('modal/login',{username,password});
    },
    modalOff(){
      this.$store.dispatch('modal/modalOff');
    }
  }
}
</script>

<style>

</style>