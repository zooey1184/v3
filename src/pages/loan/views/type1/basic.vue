<template>
  <page>
    <div>
      <div class="top_page bg1">
        <p class="title">贷贷贷</p>
        <v-step></v-step>
      </div>
      <div class="basic_wrap card_wrap">
        <card v-model='card' title='基本信息' ref='card'>
          <img src="../../assets/a1.png" alt="">
          <basic-content slot='contain' @change='reGetRect' ref='basic'></basic-content>
        </card>
        <button class="basic_btn border1 btn" :class='{bg1: next, bg1_dis: !next}' @click='submitFn'>下一步</button>
      </div>
    </div>
  </page>
</template>

<script>
import basicContent from '../../contain/basic.vue'
import { mapState } from 'vuex'

export default {
  components: {
    basicContent
  },
  data: ()=> ({
    card: false,
  }),
  computed: {
    ...mapState({
			form: s => s.loanForm
    }),
    next() {
      if(this.form.realName && this.form.idcard && this.form.loanYuan) {
        console.log('ok')
        return true
      }else {
        return false
      }
    }
  },
  methods: {
    reGetRect() {
      let card = this.$refs.card
      card.getRect()
    },
    submitFn() {
      let card = this.$refs.basic
      const self = this
      function nextF() {
        self.$router.push('/contact')
      }
      card.onSubmit(nextF)
    }
  },
  mounted() {
    setTimeout(()=> {
      this.card = true
    }, 500)
  }
}
</script>
