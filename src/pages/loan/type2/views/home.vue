<template>
<div class="">
  <div>
    <div class="step_wrap">
      <v-step>
        <div slot='content_0'>
          <card v-model='showPane0'>
            <div slot='contain'>
              dasas
            </div>
          </card>
        </div>
        <!-- <div >

        </div> -->
        <card v-model='showPane1' slot='content_1'>
          <form-list :height='40' :width='60'  slot='contain'>
            <form-item title='hello' :r_width='50'>
              <input type="text" name="" value="">
              <div slot='right'>
                sasd
              </div>
            </form-item>
          </form-list>
        </card>
        <div slot='content_2' @click='showPane2=!showPane2'>
          <card v-model='showPane2'>
            <div slot='contain'>
              dadasdas
            </div>
          </card>
        </div>
      </v-step>
      <card v-model='showPane1' slot='content_1' @click.native='showPane1=!showPane1'>
        <form-list :height='40' :width='80'  slot='contain'>
          <form-item title='hello'>
            <input type="text" name="" value="">
          </form-item>
        </form-list>
      </card>
    </div>
    <!-- <div class="card_wrap">
      <card v-model='showPane'>
        <div slot='contain'>
          <ul>
            <li v-for='(item, index) in 10' :key='index'>{{item}}</li>
          </ul>
        </div>
      </card>
    </div>
    <div class="card_wrap">
      <card v-model='showPane' title='hefdfsdfsd'>
        <div slot='contain'>
          <ul>
            <li v-for='(item, index) in 10' :key='index'>{{item}}</li>
          </ul>
        </div>
      </card>
    </div> -->
  </div>
  <model-pane v-model='showPane2'>
    <div style="width: 240px;">
      <alert-contain @close='showPane2=false' :btn='[{text: "cancle", type: "cancle"}, {text: "ddd", type: "confirm"}]'>
        <div class="">
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
          <p>hello</p>
        </div>
      </alert-contain>
    </div>
  </model-pane>
</div>
</template>

<script>
import card from '@/components/foldPane/index.vue'
import vStep from '@/components/step/h-step.vue'
import formList from '@/components/formList/formList.vue'
import formItem from '@/components/formList/ceil.vue'
import modelPane from '@/components/modelPane/src/modelPane.vue'
import alertContain from '@/components/alertContain/alertContain.vue'

export default {
  components: {
    card,
    vStep,
    formList,
    formItem,
    modelPane,
    alertContain
  },
  data: () => ({
    showPane0: true,
    showPane1: true,
    showPane2: true,
  }),
  methods: {
    open() {
      console.log(1212);
    }
  },
  mounted() {
    setTimeout(()=> {
      this.showPane0 = false
    }, 3000)
    // this.showPane = true
  }
}
</script>

<style lang="less">
// @import '../../common/css/reset.less';
.card_wrap {
  width: 80%;
  position: relative;
  display: block;
  margin: 10px auto;
}
.step_wrap {
  position: relative;
  width: 100%;
  background: #e64210;
}
</style>
