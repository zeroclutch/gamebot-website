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

// WebUI pages
const WebUI = () =>  import('../views/WebUI.vue')

// Redirect pages
const Authenticate  = () =>  import('../views/Authenticate.vue')
const Login         = () =>  import('../views/Login.vue')
const Invite        = () =>  import('../views/Invite.vue')
const Discord       = () =>  import('../views/Discord.vue')
const PageNotFound  = () =>  import('../views/404.vue')
const Success       = () =>  import('../views/Success.vue')

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    component: BlogPost,
    meta: {
      hideGradient: true,
      darkNav: true,
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/authenticate',
    name: 'Authenticate',
    component: Authenticate,
    meta: {
      blank: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      blank: true
    }
  },
  {
    path: '/terms',
    name: 'Terms',
    component: Terms,
    
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: Privacy
  },
  {
    path: '/invite',
    name: 'invite',
    component: Invite,
    meta: {
      blank: true
    }
  },
  {
    path: '/discord',
    name: 'discord',
    component: Discord,
    meta: {
      blank: true
    }
  },
  {
    path: '/success',
    name: 'success',
    component: Success,
    meta: {
      blank: true
    }
  },
  {
    path: '*',
    name: '404',
    component: PageNotFound,
    meta: {
      hideGradient: true,
      darkNav: true
    }
  },
  {
    path: '/ui/:id',
    name: 'WebUI',
    component: WebUI,
    meta: {
      blank: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.VUE_APP_BASE_URL,
  routes
})

export default router
