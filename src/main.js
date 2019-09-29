import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import InputTag from 'vue-input-tag'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

Vue.config.productionTip = false
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    form: {
      categories: [],
      alternatives: []
    }
  },
  mutations: {
    updateForm (state, payload) {
      for (let k in payload) {
      	state.form[k] = payload[k]
      }
    }
  }
})

Vue.component('input-tag', InputTag)
Vue.component('VueSlider', VueSlider)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
