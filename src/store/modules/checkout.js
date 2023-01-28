/* eslint-disable no-undef, no-unused-vars */
import { SnackbarProgrammatic as Snackbar } from 'buefy'

export default {
    namespaced: true,
    state: () => ({
        chargebee: null,
        activeCheckout: false
    }),
    getters: {},
    mutations: {
        // init(context, chargebee) { this.state.chargebee = chargebee }
    },
    actions: {
        init() {
          // Load chargebee 
        },
        createNew: {
            handler({ rootGetters, commit }, plan = { id: 'credit_1', quantity: 1000 }) {
                if (!rootGetters.getUser || !rootGetters.getToken) return false
                return Chargebee.getInstance().openCheckout({                        
                    hostedPage: function() {
                        let promise = fetch('/api/checkout/generateHostedPage', {
                            method: 'POST', 
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${rootGetters.getToken}`
                            },
                            body: JSON.stringify({
                                customerID: rootGetters.getUser.id,
                                plan,
                            })
                        })
                        .then(res => res.json())
                        .then(json => json.hosted_page)
                        .catch(res => {
                          Snackbar.open({
                            message: res.error,
                            type: 'is-danger'
                          })
                          if(res.redirect) { window.location = res.redirect }
                        })

                        return promise
                    },

                    // success callback
                    success: async function(hostedPageID) {
                        console.log('Confirming payment...')
                        // ping api with token and id, and hostedpage id
                        let promise = await fetch('/api/checkout/confirmHostedPage', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${rootGetters.getToken}`
                            },
                            body: JSON.stringify({
                                hostedPageID,
                                customerID: rootGetters.getUser.id,
                            })
                        })
                        .then(res => res.json())
                        .then(json => {
                            commit('setDBInfo', json, { root: true })
                        })
                        .catch(error => {
                          console.error(error)
                          Snackbar.open({
                            message: 'There was an error processing your payment. Contact the support server if you had an issue.',
                            type: 'is-danger'
                          })
                        })
                        // api checks if chargebee purchase is valid
                    },
                    loaded: function() {
                        // Optional
                        // will be called once checkout page is loaded
                    },
                    error: function(error) {
                        // Optional
                        // will be called if the promise passed causes an error
                        console.error(error)
                    },
                    step: function(step) {
                        // Optional
                        // will be called for each step involved in the checkout process
                    },
                    close: function() {
                        // Optional
                        // will be called when the user closes the checkout modal box
                    }
                })
            }
        },
        // This is a portal for updating payment details
        openPortal() {
            return chargebeePortalInstance.open({
                loaded: function() {
                  // Optional
                  // called when chargebee portal is loaded
                },
                close: function() {
                  // Optional
                  // called when chargebee portal is closed
                },
                visit: function(sectionName) {
                  // Optional
                  // called whenever the customer navigates across different sections in portal
                },
                paymentSourceAdd: function() {
                  // Optional
                  // called whenever a new payment source is added in portal
                },
                paymentSourceUpdate: function() {
                  // Optional
                  // called whenever a payment source is updated in portal
                },
                paymentSourceRemove: function() {
                  // Optional
                  // called whenever a payment source is removed in portal.
                },
                subscriptionChanged: function(data) {
                  // Optional
                  // called whenever a subscription is changed
                  // data.subscription.id will give you the subscription id
                  // Make sure you whitelist your domain in the checkout settings page
                },
                subscriptionCustomFieldsChanged: function(data) {
                  // Optional
                  // called whenever a subscription custom fields are changed
                  // data.subscription.id will give you the subscription id
                  // Make sure you whitelist your domain in the checkout settings page
                },
                subscriptionCancelled: function(data) {
                  // Optional
                  // called when a subscription is cancelled
                  // data.subscription.id will give you the subscription id
                  // Make sure you whitelist your domain in the checkout settings page
                },
                subscriptionPaused: function(data) {
                  // Optional
                  // called when a subscription is Paused.
                  // data.subscription.id will give you the subscription id
                  // Make sure you whitelist your domain in the checkout settings page
                },
                subscriptionResumed: function(data) {
                  // Optional
                  // called when a paused subscription is resumed.
                  // data.subscription.id will give you the subscription id
                  // Make sure you whitelist your domain in the checkout settings page
                },
                scheduledPauseRemoved: function(data) {
                  // Optional
                  // called when the schedule to pause a subscription is removed for that subscription.
                  // data.subscription.id will give you the subscription id
                  // Make sure you whitelist your domain in the checkout settings page
                },
                subscriptionReactivated: function(data) {
                  // Optional
                  // called when a cancelled subscription is reactivated.
                  // data.subscription.id will give you the subscription id
                  // Make sure you whitelist your domain in the checkout settings page
                }
            })              
        }
    }
}