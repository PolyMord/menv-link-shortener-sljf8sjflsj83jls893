import Vue from 'vue'
import VueRouter from 'vue-router'
import Auth from '../views/AuthPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Auth',
    meta: {
      layout: 'empty',
      guest: true
    },
    component: Auth
  },
  {
    path: '/create',
    name: 'Create',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/CreatePage.vue')
  },
  {
    path: '/links',
    name: 'Links',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/LinksPage.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    meta: {
      layout: 'main',
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/DetailPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem('userData')) {
      next({ name: 'Auth' })
    } else {
      const user = JSON.parse(localStorage.getItem('userData'))
      if (user.token) {
        next()
      }
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (!localStorage.getItem('userData')) {
      next()
    } else {
      next({ name: 'Create' })
    }
  } else {
    next()
  }
})

export default router
