import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
// articel
import articles from './modules/articles'
import projects from './modules/project'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    progress: 0,
    currunPage: 0
  },
  getters,
  actions,
  mutations: {
    progress(state, payload) {
      state.progress = payload
    },
    setPage(state, page) {
      state.currunPage = page
    }
  },
  modules: {
    articles,
    projects
  }
})
