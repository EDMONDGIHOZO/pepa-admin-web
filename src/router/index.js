import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/Login'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dasboard',
    name: 'dashboard-home',
    component: () =>
      import(/* webpackChunkName: "dashboard" */ '../views/dashboard/Home.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
