import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: null,
  },
  mutations: {
    init(state, info) {
      state.userinfo = info;
      window.localStorage.setItem('token', info.token);
    },
  },
  actions: {
  },
  modules: {
  }
})
