import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VeeValidate from 'vee-validate'
import vuetify from './plugins/vuetify'
import './assets/styles/main.scss'
import './assets/styles/responsive.scss'
import axios from 'axios'

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:3333/'

axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._query) {
      originalRequest._retry = true
      store.dispatch('logout')
      return router.push('/login')
    }
  }
})

Vue.config.productionTip = false

Vue.use(VeeValidate, { inject: false })

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app')
