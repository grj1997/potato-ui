import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import potatoUl from "../packages/index";
Vue.use(potatoUl)

new Vue({
  render: h => h(App),
}).$mount('#app')
