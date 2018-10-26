<template>
  <page bgWrap='rgb(240, 240, 240)'>
    <div>
      <result ref='result'></result>
      <button class="btn_bottom bg1" @click='submitFn'>继续借钱</button>
    </div>
  </page>
</template>

<script>
import result from '../../contain/result.vue'

export default {
  name: 'result-page',
  data: ()=> ({
    state: 'fail'
  }),
  components: {
    result
  },
  methods: {
    submitFn() {
      let result = this.$refs.result
      result.onSubmit()
    }
  },
  mounted() {
    const self = this
    window.vRouterReplace = ()=> {
      self.$router.replace('/fail')
    }
  }
}
</script>

<style lang="less">
.btn_bottom {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 45px;
  font-size: 16px;
}
</style>

