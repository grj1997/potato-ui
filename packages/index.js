import CardInput from "./card-input";
import Calendar from "./calendar";
import PriceCalendar from './priceCalendar'
import SoftKeyboard from './soft-keyboard'
// 以数组的结构保存组件
const components = [
  CardInput,
  Calendar,
  PriceCalendar,
  SoftKeyboard
]

// 定义install方法
const install = function (Vue) {
  if (install.installed) return
  install.installed = true
  //遍历并注册全局组件
  components.map(component => {
    Vue.component(component.name, component)
  })
}

if(typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}
export default {
  // 导出的对象必须具备一个install方法
  install,
  // 组件列表
  ...components
}
