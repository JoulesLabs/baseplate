import createPersistedState from "vuex-persistedstate"

import Vue from 'vue'
import Vuex from 'vuex'

import USER  from '../modules/user/store/index'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,
  modules: {
    user: USER
  },
  plugins: [createPersistedState()],
})

export default store
