<template>
<div>
  <page>
    <div>
      <div class="top_page bg1">
        <p class="title">贷贷贷</p>
        <v-step :len='5' :active='2'></v-step>
      </div>
      <div class="card_wrap">
        <card title='芝麻信用授权' v-model='card'>
          <zhima slot='contain' ref='zhima'></zhima>
        </card>
        <button class="btn bg1" @click='submitFn'>下一步</button>
      </div>
    </div>
  </page>
  <model-pane v-model='showPane'>
    <div class="zhima_contain">
      <alert-contain :showClose='false' @cancle='showPane=false'>
        <div>
          <p>ssss</p>
          <p>ssss</p>
          <p>ssss</p>
        </div>
      </alert-contain>
    </div>
  </model-pane>
</div>
</template>

<script>
import alertContain from '@/components/alertContain/alertContain.vue'
import zhima from '../../contain/zhima.vue'

export default {
  components: {
    alertContain,
    zhima
  },
  data: ()=> ({
    showPane: false,
    card: true
  }),
  methods: {
    submitFn() {
      let zhima = this.$refs.zhima
      let callback = ()=> {
        this.$router.push('/operator')
      }
      zhima.onSubmit(callback)
    }
  },
  mounted() {
    setTimeout(()=> {
      this.card = true
    }, 500)
  }
}
</script>

<style lang='less'>
.zhima_contain {
  width: 70%;
  min-height: 100px;

}
</style>
