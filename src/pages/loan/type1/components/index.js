
import ModelPane from '@/components/modelPane/index.js'
import Card from '@/components/foldPane/index.vue'
import VStep from '@/components/step/v-step.vue'
import Load from '@/components/load/index.js'
import PageWrap from '@/components/pageWrap/page.vue'
import Toast from '@/components/Toast/index.js'
import VReg from '@/components/VReg/index.js'

const components = [
  ModelPane,
  PageWrap,
  Card,
  VStep
]

/**
 *全局注册组件
 *用于引进
 * @param {*} Vue
 */
const install = function (Vue) {
  if (install.installed) return
  // 组件
  components.map(component => Vue.component(component.name, component))
  // 插件
  Vue.use(Load)
  Vue.use(Toast)
  // 指令
  VReg(Vue)
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  Card,
  ModelPane,
  Load,
  PageWrap,
  VStep,
  VReg
  // WaveNumber
}
