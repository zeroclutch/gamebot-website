import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'


import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import VueAnimateOnScroll from 'vue-animate-onscroll'

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
})
Vue.use(VueAnimateOnScroll)

library.add(fab, fas)
Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  debug: true,
  render: function (h) { return h(App) }
}).$mount('#app')
