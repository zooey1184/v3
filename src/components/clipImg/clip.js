/**
 * @author: zooey
 * changer: zooey
 * Date: 18/08/24
 * desc: 插件-选择器
 * use: this.$cropper.show({obj}) || this.$cropper.show('string') && this.$cropper.hide()
 */
/* eslint-disable */
import Clip from './cropper.vue'
var cropper = {}
cropper.install = function (Vue, options) {
  if (document.getElementsByClassName('cropper--full').length) {
    return
  }
  let Cropper = Vue.extend(Clip)
  let $cropper = new Cropper()
  window.vCropper = $cropper
  let tpl = $cropper.$mount().$el
  document.body.appendChild(tpl)
  Vue.prototype.$cropper = {
    show: (options) => {
      try {
        if (document.getElementsByClassName('cropper--full').length) {
          return
				}
				$cropper.img = options.img
        $cropper.done = options.doneFn
        if(options.cancleFn) {
          $cropper.cancleFn = options.cancleFn
        }
        $cropper.width = options.width
        $cropper.height = options.height
        $cropper.showClipper = true
      } catch (e) {
        console.log(e)
      }
    },
    hide: () => {
      $cropper.showClipper = false
    }
  }
}
export default cropper
