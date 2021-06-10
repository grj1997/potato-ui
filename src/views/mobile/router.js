import Vue from 'vue';
import Router from 'vue-router';
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/soft-keyboard",
      name: "数字键盘",
      component: () => import("@/views/mobile/exhibition/soft-keyboard.vue"),
    }
  ],
});