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
            id: 'gold_0001',
            title: 'STARTER',
            quantity: 1,
            tier: 1,
          },{
            value: '5',
            unit: 'GOLD',
            price: '$4.49',
            id: 'gold_0001',
            title: 'SAVE 10%',
            quantity: 5,
            tier: 2,
          },{
            value: '20',
            unit: 'GOLD',
            price: '$14.99',
            id: 'gold_0001',
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
    },
    guilds: {
      list: [],
      lastUpdated: null,
    },
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
    getItems: state => state.purchase[state.purchase.modalItems].items,
    getGuilds: state => state.guilds,

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
    },
    setGuilds(state, guilds) {
      state.guilds.lastUpdated = Date.now()
      state.guilds.list = guilds
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
    async fetchUserInfo(context, force) {
      let userData;
      if(!force) {
        // Retrieve user data from local storage
        userData = JSON.parse(localStorage.getItem('user'))
        if(userData && userData.date < Date.now() - 1000 * 60 * 60 * 24) {
          // If user data is more than than 24 hours old, fetch new data
          userData = undefined
        }
      }

      // If we don't have user data, or we're forcing a refresh, fetch it from the API
      if(this.getters.getToken && !userData) {
          let res = await fetch('https://discord.com/api/users/@me', {
              headers: {
                  authorization: `Bearer ${this.getters.getToken}`
              }
          }).catch(console.error)
          userData = await res.json()
          userData.date = Date.now()

          // Save the user data to localStorage
          localStorage.setItem('user', JSON.stringify(userData))
      }
      // Update user
      context.commit('setUser', userData)
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
        context.commit('setDBInfo', response)
      }
    },
    async fetchAllUserInfo({ dispatch }) {
      await dispatch('fetchUserInfo', false)
      await dispatch('fetchDBInfo')
    },
  },
  modules: {
    checkout
  }
})
