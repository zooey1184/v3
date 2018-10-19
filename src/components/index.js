
import ModelPane from '@/components/modelPane/index.js'
import Card from '@/components/foldPane/index.vue'
import VStep from '@/components/step/v-step.vue'
import HStep from '@/components/step/h-step.vue'
import Load from '@/components/load/index.js'
import PageWrap from '@/components/pageWrap/page.vue'
import Toast from '@/components/Toast/index.js'
import VReg from '@/components/VReg/index.js'
import formList from '@/components/formList/formList.vue'
import ceil from '@/components/formList/ceil.vue'
import actionSheet from '@/components/ActionSheet'

const components = [
  ModelPane,
  PageWrap,
  Card,
  VStep,
  formList,
  ceil,
  HStep
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
  Vue.use(actionSheet)
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
  VReg,
  formList,
  ceil,
  HStep
  // WaveNumber
}
