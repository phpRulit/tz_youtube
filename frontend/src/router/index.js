import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/YouTube.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'YouTube',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "youtube" */ '../views/YouTube.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
