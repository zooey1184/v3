import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/store/router'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    router
  }
})
