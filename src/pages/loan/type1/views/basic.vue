<template>
  <page>
    <div>
      <div class="top_page bg1">
        <p class="title">hei</p>
        <v-step></v-step>
      </div>
      <div class="basic_wrap card_wrap">
        <card v-model='card' title='基本信息' ref='card'>
          <basic-content slot='contain' @change='reGetRect'></basic-content>
        </card>
        <button class="basic_btn bg1 border1 btn" @click='$router.push("/contact")'>下一步</button>
      </div>
    </div>
  </page>
</template>

<script>
import basicContent from '../../contain/basic.vue'

export default {
  components: {
    basicContent
  },
  data: ()=> ({
    card: false,
  }),
  methods: {
    reGetRect() {
      let card = this.$refs.card
      card.getRect()
    }
  },
  mounted() {
    setTimeout(()=> {
      this.card = true
    }, 500)
  }
}
</script>
