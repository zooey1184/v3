<template>
<div>
  <page>
    <div>
      <div class="top_page bg1">
        <p class="title">hei</p>
        <v-step :len='5' :active='2'></v-step>
      </div>
      <div class="card_wrap">
        <card title='芝麻信用授权' v-model='card'>
          <form-list slot='contain' :width='80'>
            <ceil title='手机号'>
              <input type="text" placeholder="请输入您的手机号">
            </ceil>
            <ceil title='验证码' :r_width='80'>
              <input type="text" placeholder="请输入验证码">
              <div slot='right'>
                <count-down @change='showPane=true'></count-down>
              </div>
            </ceil>
            <ceil title='芝麻分'>
              <input type="text" :value='80'>
            </ceil>
          </form-list>
        </card>
        <button class="btn bg1">下一步</button>
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
import countDown from '@/components/countdown'
import alertContain from '@/components/alertContain/alertContain.vue'
import formList from '@/components/formList/formList.vue'
import ceil from '@/components/formList/ceil.vue'

export default {
  components: {
    countDown,
    alertContain,
    formList,
    ceil
  },
  data: ()=> ({
    showPane: false,
    card: true
  })
}
</script>

<style lang='less'>
.zhima_contain {
  width: 70%;
  min-height: 100px;
  
}
</style>

