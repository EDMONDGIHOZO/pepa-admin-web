import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/user/Login'
import DashboardWrapper from '../views/dashboard/dashboard-wrapper'
import Profile from '../views/user/Profile.vue'
import Home from '../views/dashboard/Home'
import IngCategoriesView from '../views/dashboard/ing-categories-view'
import IngView from '../views/dashboard/ing-view'
import Recipes from '../views/dashboard/recipes'
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
        path: 'profile',
        name: 'profile',
        component: Profile,
        meta: {
          title: 'my profile',
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
      {
        path: 'all-ingrdients',
        name: 'all-ingrdients',
        component: IngView,
        meta: {
          title: 'dashboard',
        },
      },
      {
        path: 'recipes',
        name: 'recipes',
        component: Recipes,
        meta: {
          title: 'recipes',
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
    meta: {
      title: 'Login',
    },
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
  base: process.env.VUE_APP_BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `${process.env.VUE_APP_TITLE} - ${to.meta.title}`
  let user = localStorage.getItem('user')
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!user) {
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
