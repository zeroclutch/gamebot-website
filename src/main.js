import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'


import { library } from '@fortawesome/fontawesome-svg-core'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { faUsers } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
library.add(faDiscord, faUsers)
Vue.component('vue-fontawesome', FontAwesomeIcon);


Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fab',
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  debug: true,
  render: function (h) { return h(App) }
}).$mount('#app')
