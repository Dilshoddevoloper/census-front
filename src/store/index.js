import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './app'
import auth from './auth'
import citizen from './citizen'
import report from './report'
import parties from './parties'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    auth,
    citizen,
    report,
    parties
  },
  getters
})

export default store
