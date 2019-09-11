import Vue from 'vue'
import App from './App.vue'
import InputTag from 'vue-input-tag'

Vue.config.productionTip = false

Vue.component('input-tag', InputTag)

new Vue({
  render: h => h(App),
}).$mount('#app')
