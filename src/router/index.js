import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/Login'
import DashboardWrapper from '../views/dashboard/dashboard-wrapper'
import Home from '../views/dashboard/Home'
import IngCategoriesView from '../views/dashboard/ing-categories-view'
import NotFound from '../views/404/not-found'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard/home',
  },
  {
    path: '/dashboard',
    name: 'dashboard-wrapper',
    component: DashboardWrapper,
    children: [
      {
        path: 'home',
        name: 'dashboard-home',
        component: Home,
        meta: {
          title: 'dashboard',
        },
      },
      {
        path: 'ing-categories',
        name: 'ing-categories',
        component: IngCategoriesView,
        meta: {
          title: 'dashboard',
        },
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },

  //   404 page
  {
    path: '*',
    name: '404',
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!localStorage.getItem('userToken')) {
      next({
        name: 'login',
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
