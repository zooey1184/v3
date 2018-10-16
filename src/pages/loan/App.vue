<template>
  <div>
    <div class="step_wrap">
      <v-step>
        <div slot='content_0'>
          <card v-model='showPane0'>
            <div slot='contain'>
              <ul>
                <li v-for='(item, index) in 10' :key='index'>{{item}}</li>
              </ul>
            </div>
          </card>
        </div>
        <div slot='content_1' @click='showPane1=!showPane1'>
          <card v-model='showPane1'>
            <div slot='contain'>
              <ul>
                <li v-for='(item, index) in 10' :key='index'>{{item}}</li>
              </ul>
            </div>
          </card>
        </div>
        <div slot='content_2' @click='showPane2=!showPane2'>
          <card v-model='showPane2'>
            <div slot='contain'>
              <ul>
                <li v-for='(item, index) in 10' :key='index'>{{item}}</li>
              </ul>
            </div>
          </card>
        </div>
      </v-step>
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
</template>

<script>
import card from '@/components/foldPane/index.vue'
import step from '@/components/step/index.vue'
import vStep from '@/components/step/h-step.vue'

export default {
  components: {
    card,
    step,
    vStep
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
@import '../../common/css/reset.less';
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
