import Vue from 'vue'  //cdn模式
// import Vuex from 'vuex' // cdn模式
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
import state from './state'
import moduleA from './module/module'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        moduleA,
      },
    state,
    mutations,
    actions,
    getters
})