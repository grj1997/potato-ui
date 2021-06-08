import CardInput from "./card-input";
import Calendar from "./calendar";
import PriceCalendar from './priceCalendar'
import SoftKeyboard from './soft-keyboard'
import config from '../package.json'
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
  install,
  version: config.version,
  ...components
}
