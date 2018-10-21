<template>
<div>
  <page>
    <div>
      <div class="top_page bg1">
        <p class="title">hei</p>
        <v-step :len='5' :active='2'></v-step>
      </div>
      <div class="card_wrap">
        <card title='运营商' v-model='card'>
          <operation slot='contain'></operation>
        </card>
        <button class="btn bg1" @click='$router.push("/photo")'>下一步</button>
      </div>
    </div>
  </page>
  <model-pane v-model='showPane'>
    <div class="yys_contain">
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
import operation from '../../contain/operator.vue'

export default {
  components: {
    alertContain,
    operation
  },
  data: ()=> ({
    showPane: false,
    card: true
  }),
  mounted() {
    setTimeout(()=> {
      this.card = true
    }, 500)
  }
}
</script>

<style lang='less'>
.yys_contain {
  width: 70%;
  min-height: 100px;
}
</style>
