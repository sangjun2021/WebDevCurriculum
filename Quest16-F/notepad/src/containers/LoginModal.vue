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
    isLoading(){
      return this.$store.state.loading.isLoading;
    },
    isModalOn(){
      return this.$store.state.modal.isModalOn;
    }
  },
  methods:{
    async login(username,password){
      if(this.isLoading) return;
      await this.$store.dispatch('modal/login',{username,password});
    },
    modalOff(){
      this.$store.dispatch('modal/modalOff');
    }
  }
}
</script>

<style>

</style>