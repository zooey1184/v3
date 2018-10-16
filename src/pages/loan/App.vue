<template>
  <div>
    <div class="step_wrap">
      <v-step>
        <div slot='content_0'>
          <card v-model='showPane0'>
            <div slot='contain'>

            </div>
          </card>
        </div>
        <div slot='content_1'  @click='showPane1=!showPane1'>
          <card v-model='showPane1'>
            <div slot='contain'>
              <form-list :width='120'>
                <form-item title='hello'>
                  <input type="text" name="" value="">
                </form-item>
              </form-list>
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
import vStep from '@/components/step/h-step.vue'
import formList from '@/components/formList/formList.vue'
import formItem from '@/components/formList/formItem.vue'

export default {
  components: {
    card,
    vStep,
    formList,
    formItem
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
