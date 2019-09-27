import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import PardInput from "../packages/index";
Vue.use(PardInput)

new Vue({
  render: h => h(App),
}).$mount('#app')
