import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import checkout from './modules/checkout.js'

export default new Vuex.Store({
  state: {
    nav: {
      open: false
    },
    purchase: {
      modalOpen: false,
      modalItems: 'credits',
      gold: {
        items: [{
            value: '1',
            unit: 'GOLD',
            price: '$0.99',
            id: 'gold_1',
            title: 'STARTER',
            quantity: 1,
            tier: 1,
          },{
            value: '5',
            unit: 'GOLD',
            price: '$4.49',
            id: 'gold_1',
            title: 'SAVE 10%',
            quantity: 5,
            tier: 2,
          },{
            value: '20',
            unit: 'GOLD',
            price: '$14.99',
            id: 'gold_1',
            title: 'SAVE 20%',
            quantity: 20,
            tier: 3,
        }]
      },
      credits: {
        items: [{
            value: '750',
            unit: 'CREDITS',
            price: '$0.99',
            id: 'credit_0001',
            quantity: 750,
            title: 'STARTER',
            tier: 1,
          },{
            value: '5000',
            unit: 'CREDITS',
            price: '$4.99',
            id: 'credit_0001',
            quantity: 5000,
            title: 'SAVE 33%',
            tier: 2,
          },{
            value: '16500',
            unit: 'CREDITS',
            price: '$14.99',
            id: 'credit_0001',
            quantity: 16500,
            title: 'SAVE 40%',
            tier: 3,
        }]
      }
    },
    user: {
      token: null,
      id: null,
      email: null,
      avatar: null,
      username: null,
      discriminator: null,
    },
    dbInfo: {
      credits: null,
      gold: null,
    }
  },
  getters: {
    getToken: state => {
      let token = state.user.token
      if(!token) {
      let row = document.cookie.split('; ').find(row => row.startsWith('token'))
        if(row) {
          token = row.split('=')[1]
        }
      }
      return token
    },
    getUser: state => state.user,
    getdbInfo: state => state.dbInfo,
    getItems: state => {
      return state.purchase[state.purchase.modalItems].items
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token 
    },
    setUser(state, user) {
      state.user.id = user.id 
      state.user.avatar = `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=64`
      state.user.discriminator = user.discriminator
      state.user.username = user.username
    },
    setDBInfo(state, dbInfo) {
      state.dbInfo.credits = dbInfo.balance || 0
      state.dbInfo.gold = dbInfo.goldBalance || 0
    },
    togglePurchaseModal(state) {
      state.purchase.modalOpen = !state.purchase.modalOpen
    },
    setModalItems(state, modalItems) {
      state.purchase.modalItems = modalItems
    }
  },
  actions: {
    login(context, token) {
      context.commit('setToken', token)
    },
    logout(context) {
      document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      context.commit('setToken', null)
      window.location.reload()
    },
    async fetchUserInfo(context) {
      if(this.getters.getToken) {
          let res = await fetch('https://discord.com/api/users/@me', {
              headers: {
                  authorization: `Bearer ${this.getters.getToken}`
              }
          }).catch(console.error)
          let response = await res.json()
          // Update user
          console.log(response)
          context.commit('setUser', response)
      }
    },
    async fetchDBInfo(context) {
      if(this.getters.getToken && this.getters.getUser) {
        let res = await fetch('/api/userInfo?userID=' + this.getters.getUser.id, {
          method: 'GET',
          headers: {
              authorization: `Bearer ${this.getters.getToken}`
          }
        }).catch(console.error)
        let response = await res.json()
        // Update user
        console.log(response)
        context.commit('setDBInfo', response)
      }
    },
    async fetchAllUserInfo({ dispatch }) {
      await dispatch('fetchUserInfo')
      await dispatch('fetchDBInfo')
    },
  },
  modules: {
    checkout
  }
})
