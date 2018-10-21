<template>
  <form-list :width='80'>
    <ceil title='手机号'>
      <input type="text" placeholder="请输入您的手机号">
    </ceil>
    <ceil title='验证码' :r_width='80'>
      <input type="text" placeholder="请输入验证码">
      <div slot='right'>
        <count-down></count-down>
      </div>
    </ceil>
    <ceil title='芝麻分'>
      <input type="text" :value='80'>
    </ceil>
    <slot></slot>
  </form-list>
</template>

<script>
import countDown from '@/components/countdown'
import { mapState } from 'vuex'
import api from '../api'

export default {
  components: {
    countDown
  },
  data: ()=> ({
    token: '',
    vcode: '',
    sendTiming: '',
    vcode1Sended: '',
    checkBody: '',
    btnTip: ''
  }),
  props: {
    bg: {
      type: String,
      default: 'bg1'
    }
  },
  methods: {

  },
}
</script>
