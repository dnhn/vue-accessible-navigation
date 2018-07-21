import Vue from 'vue'
import App from './App.vue'

import VueShortkey from 'vue-shortkey'

Vue.use(VueShortkey)

new Vue({
  el: '#app',
  render: h => h(App)
})
