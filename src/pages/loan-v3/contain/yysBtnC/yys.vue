<template>
  <model-pane v-model='showToast' name='fade'>
    <div class="yys_content">
      <alert-content @confirm='confirmFn' @cancle='cancleFn' :showClose='false'>
        <div>
          <h4 style="text-align: center; padding: 10px 0;">{{title}}</h4>
          <div class="input_content">
            <input type="text" placeholder="请输入验证码" v-model='vcode2' ref='vcode2' />
            <div>
              <yys-btn 
                v-if='action'
                :img-data="imgData"
                @fail="cancleFn"
                :token="token"
                :is-sms="false">
              </yys-btn>
            </div>
          </div>
        </div>
      </alert-content>
    </div>
  </model-pane>
</template>

<script>
import yysBtn from '../yysBtn.vue'
import alertContent from '@/components/alertContain/alertContain.vue'

export default {
  name: 'yys-mark',
  components: {
    yysBtn,
    alertContent
  },
  data: ()=> ({
    // btn: [{text:'取消a', type: 'cancle'}, {text: '确定', type: 'confirm'}],
    showToast: false,
    title: '',
    imgData: '',
    token: '',
    action: false,
    vcode2: ''
  }),
  methods: {
    confirmFn() {
      this.showToast = false
      this.confirmBtn(this.vcode2)
    },
    confirmBtn() {

    },
    cancleFn() {
      this.showToast = false
    }
  }
}
</script>

<style lang="less">
.yys_content {
  width: 80%;
  // height: 200px;
  position: relative;
  .input_content {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 20px;
    input {
      width: 100%;
      height: 40px;
      border-radius: 3px;
      border: 1px solid #eee;
      outline: none;
      padding: 0 10px;
    }
  }
}
</style>
