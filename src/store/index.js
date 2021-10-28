import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info: []
  },
  mutations: {
    show(state, res) {
      let rankInfo = {
        platform: res.platform,
        session: res.session,
        name: res.name,
        rank: res.rank
      }
      state.info.push(rankInfo)
    },
    clear(state) {
      state.info = []
    }
  },
  getters: {
    getRankInfo: function(state) {
      return state.info
    }
  },
  actions: {
  },
  modules: {
  }
})
