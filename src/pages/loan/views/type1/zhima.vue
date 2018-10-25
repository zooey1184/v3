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
          <img style='width: 24px;' src="../../assets/a3.png" alt="">
          <zhima slot='contain' ref='zhima'></zhima>
        </card>
        <button class="btn bg1" @click='submitFn'>下一步</button>
      </div>
    </div>
  </page>
</div>
</template>

<script>
import zhima from '../../contain/zhima.vue'

export default {
  components: {
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
    },
    backChange() {
      this.$router.go(-2)
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
