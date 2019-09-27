import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import CardInput from "../packages/index";
Vue.use(CardInput)

new Vue({
  render: h => h(App),
}).$mount('#app')
