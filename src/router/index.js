import Vue from 'vue'
import VueRouter from 'vue-router'

// Nav pages
const Home      = () => import('../views/Home.vue')
const Commands  = () => import('../views/Commands.vue')
const Shop      = () => import('../views/Shop.vue')
const Dashboard = () => import('../views/Dashboard.vue')
const Blog      = () => import('../views/Blog.vue')
const BlogPost  = () => import('../views/BlogPost.vue')

// Other pages
const Privacy  = () => import('../views/Privacy.vue')
const Terms    = () =>  import('../views/Terms.vue')

// Redirect pagges
const Authenticate  = () =>  import('../views/Authenticate.vue')
const Login         = () =>  import('../views/Login.vue')
const Invite        = () =>  import('../views/Invite.vue')
const Discord       = () =>  import('../views/Discord.vue')
const PageNotFound  = () =>  import('../views/404.vue')
const Success       = () =>  import('../views/Success.vue')

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
    path: '/blog',
    name: 'Blog',
    component: Blog
  },
  {
    path: '/post/:slug',
    name: 'Post',
    component: BlogPost
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
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
  base: process.env.VUE_APP_BASE_URL,
  routes
})

export default router
