<template>
  <res-page title='您的申请被拒绝了' :desc='desc' @change='change' btn=''></res-page>
</template>

<script>
import resPage from '@/components/pageWrap/resPage.vue'
import warning from '../../assets/warning.png'
import aa from '../../assets/type1_bg.png'

export default {
  components: {
    resPage
  },
  data: ()=> ({
    desc: '很抱歉，因条件不符合，初审被拒'
  }),
  methods: {
    change() {
      this.$mark.show({
        title: '',
        btn: [],
        msg: `
          <div class='c-mark-content'>
            <img class='title_img' src=${warning} alt='warning'/>
            <p class='desc_tip'>
              拒绝原因：太衰
            </p>
            <img class='mark-img-full' src=${aa} alt='tuijian'/>
          </div>
        `,
        closeFn: ()=> {
          this.$mark.hide()
        }
      })
    }
  }
}
</script>
