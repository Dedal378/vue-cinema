import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Home from '@/components/Home.vue'
import Task from '@/components/Task.vue'
import Login from '@/components/auth/Login.vue'
import Registration from '@/components/auth/Registration.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter (to, from, next) {
      store.getters.checkUser ? next() : next('/login')
    }
  },
  {
    path: '/task',
    name: 'task',
    component: Task,
    beforeEnter (to, from, next) {
      store.getters.checkUser ? next() : next('/login')
    }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/registration',
    name: 'registration',
    component: Registration
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
