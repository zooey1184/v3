<template>
<div>
  <page>
    <div>
      <div class="top_page bg1">
        <p class="title">贷贷贷</p>
        <v-step :len='5' :active='3'></v-step>
      </div>
      <div class="card_wrap">
        <card title='运营商' v-model='card' ref='card'>
          <img style='width: 18px;' src="../../assets/a4.png" alt="">
          <operation slot='contain' @reGetRect='reGetRect' ref='operator'></operation>
        </card>
        <button class="btn bg1" @click='submitFn'>下一步</button>
      </div>
    </div>
  </page>
</div>
</template>

<script>
import alertContain from '@/components/alertContain/alertContain.vue'
import operation from '../../contain/operator.vue'

export default {
  components: {
    alertContain,
    operation
  },
  data: ()=> ({
    showPane: false,
    card: false
  }),
  methods: {
    reGetRect() {
      let card = this.$refs.card
      // card.getRect()
      this.card = true
    },
    submitFn() {
      let operation = this.$refs.operator
      let callback = ()=> {
        this.$router.push("/photo")
      }
      operation.onSubmit(callback)
    }
  },
  mounted() {
    // setTimeout(()=> {
    //   this.card = true
    // }, 500)
  }
}
</script>

<style lang='less'>
.yys_contain {
  width: 70%;
  min-height: 100px;
}
</style>
