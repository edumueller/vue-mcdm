import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import InputTag from 'vue-input-tag'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    form: {}
  }
})

Vue.component('input-tag', InputTag)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
