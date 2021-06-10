import Vue from 'vue';
import Mobile from './mobile.vue';
import router from './router';
// import store from './store';
Vue.config.productionTip = false;
import potatoUl from "@/../packages/index";
Vue.use(potatoUl)
window.dMobile = new Vue({
  router,
  render: h => h(Mobile),
}).$mount('#mobile');
