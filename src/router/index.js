import Vue from 'vue'
import VueRouter from 'vue-router'

// Nav pages
import Home from '../views/Home.vue'
import Commands from '../views/Commands.vue'
import Shop from '../views/Shop.vue'

// Other pages
import Privacy from '../views/Privacy.vue'
import Terms from '../views/Terms.vue'

// Redirect pagges
import Authenticate from '../views/Authenticate.vue'
import Login from '../views/Login.vue'
import Invite from '../views/Invite.vue'
import Discord from '../views/Discord.vue'
import PageNotFound from '../views/404.vue'
import Success from '../views/Success.vue'

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
  {
    path: '/terms',
    name: 'Terms',
    component: Terms
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: Privacy
  },
  {
    path: '/invite',
    name: 'invite',
    component: Invite
  },
  {
    path: '/discord',
    name: 'discord',
    component: Discord
  },
  {
    path: '/success',
    name: 'success',
    component: Success
  },
  {
    path: '*',
    name: '404',
    component: PageNotFound
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
