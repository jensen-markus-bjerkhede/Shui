import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: () => import('../views/Landing.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/stream',
    name: 'stream',
    component: () => import('../views/Stream.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  },
  {
    path: '/removed',
    name: 'Removed',
    component: () => import('../views/Removed.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/newMessage',
    name: 'newMessage',
    component: () => import('../views/NewMessage.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
