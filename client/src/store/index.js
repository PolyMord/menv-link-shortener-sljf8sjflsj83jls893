import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userData = JSON.parse(localStorage.getItem('userData'))

export default new Vuex.Store({
  state: {
    loading: false,
    error: null,
    token: userData?.token || '',
    userId: null
  },
  mutations: {
    login(state, { token, userId }) {
      state.token = token
      state.userId = userId

      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: state.userId,
          token: state.token
        })
      )
    },

    logout(state) {
      state.token = null
      state.userId = null
      localStorage.removeItem('userData')
    }
  },
  actions: {
    request: async ({ state }, { url, method, body, headers = {} }) => {
      state.loading = true
      try {
        if (body) {
          body = JSON.stringify(body)
          headers['Content-Type'] = 'application/json'
        }

        const response = await fetch(url, { method, body, headers })
        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong')
        }
        state.loading = false

        return data
      } catch (e) {
        state.loading = false
        state.error = e.message
        throw e
      }
    }
  },
  modules: {}
})
