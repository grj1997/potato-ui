import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import PotatoUi from 'potato-ui/'
Vue.use(PotatoUi)

new Vue({
  render: h => h(App),
}).$mount('#app')
