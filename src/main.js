import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Buefy from 'buefy'
import VueGtag from "vue-gtag";


import { library } from '@fortawesome/fontawesome-svg-core'
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import {
  faHashtag, faArrowUp, faArrowDown, faCheck, faUsers, faUser, faSignOutAlt, faTimes, faSortAlphaDown, faMoneyBillWave, faEye, faEyeSlash, faAward, faChartLine, faAngleRight, faStore, faTags, faCaretDown
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VueAnimateOnScroll from 'vue-animate-onscroll'

Vue.use(Buefy, {
  defaultIconComponent: 'vue-fontawesome',
  defaultIconPack: 'fas',
})

Vue.use(VueGtag, {
  config: { id: process.env.VUE_APP_GA_ID }
}, router);

Vue.use(VueAnimateOnScroll)

library.add(faDiscord, faHashtag, faArrowUp, faArrowDown, faCaretDown, faCheck, faUsers, faUser, faSignOutAlt, faTimes, faSortAlphaDown, faMoneyBillWave, faEye, faEyeSlash, faAward, faChartLine, faAngleRight, faStore, faTags)
Vue.component('vue-fontawesome', FontAwesomeIcon);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  debug: true,
  render: function (h) { return h(App) }
}).$mount('#app')
