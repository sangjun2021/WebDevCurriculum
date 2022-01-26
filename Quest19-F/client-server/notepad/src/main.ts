import { createApp } from 'vue';
import store from '@/store'
import App from '@/App.vue'

window.onload = () => {
  if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./sw.js')
        .then(e=> console.log('registered completed'))
        .catch(error=> console.log('register fail with',error))
  }
}

const app = createApp(App);
app.use(store);
app.mount('#app');
