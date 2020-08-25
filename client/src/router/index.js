import Vue from "vue"
import VueRouter from "vue-router"
import Auth from "../views/AuthPage.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Auth",
    component: Auth
  },
  {
    path: "/create",
    name: "Create",
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CreatePage.vue")
  },
  {
    path: "/links",
    name: "Links",
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LinksPage.vue")
  },
  {
    path: "/links/:id",
    name: "Detail",
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DetailPage.vue")
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") === null) {
      next({ name: "Auth" })
    }
  } else {
    next()
  }
})

export default router
