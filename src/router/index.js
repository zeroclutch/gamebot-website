import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Commands from '../views/Commands.vue'
import Shop from '../views/Shop.vue'
import Authenticate from '../views/Authenticate.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/commands',
    name: 'Commands',
    component: Commands
  },
  {
    path: '/shop',
    name: 'Shop',
    component: Shop
  },
  {
    path: '/authenticate',
    name: 'Authenticate',
    component: Authenticate
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
