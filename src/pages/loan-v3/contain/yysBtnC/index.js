/**
 * @author: zooey
 * changer: zooey
 * Date: 18/07/09
 * desc: 插件-弹窗
 * use: this.$mark.show({obj}) || this.$mark.show('string') && this.$mark.hide()
 */
import MarkYYS from './yys.vue'
var markyys = {}
markyys.install = function (Vue, options) {
  if (document.getElementsByClassName('model--full').length) {
    return
  }
  let MarkYYsTpl = Vue.extend(MarkYYS)
  let $vmarkyys = new MarkYYsTpl()
  window.vmarkyys = $vmarkyys
  let tpl = $vmarkyys.$mount().$el
  document.body.appendChild(tpl)
  Vue.prototype.$markyys = {
    show: (options) => {
      try {
        if (document.getElementsByClassName('model--full').length) {
          return
        }
        Object.assign($vmarkyys, options)
        // if (!options.title) {
        //   $vmark.title = '提示'
        // }
        if (!options.btn) {
          $vmarkyys.btn = ['取消', '确定']
        }
        if (!options.confirmBtn) {
          $vmarkyys.confirmBtn = options.confirmBtn
        }
        $vmarkyys.showToast = true
      } catch (e) {
        console.log(e)
      }
    },
    hide: () => {
      $vmarkyys.showToast = false
    }
  }
}
export default markyys
