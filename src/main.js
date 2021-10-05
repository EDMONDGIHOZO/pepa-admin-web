import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import './assets/styles/main.scss'
import './assets/styles/responsive.scss'
import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
import { firebaseConfig } from '../src/tools/firebase_config'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),

  created() {
    initializeApp(firebaseConfig)
    getStorage()
  },
}).$mount('#app')
