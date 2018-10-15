<template>
  <div>
    <div class="card_wrap">
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
    </div>
  </div>
</template>

<script>
import card from '@/components/foldPane/index.vue'

export default {
  components: {
    card
  },
  data: () => ({
    showPane: true
  }),
  methods: {
    open() {
      console.log(1212);
    }
  },
  mounted() {
    setTimeout(()=> {
      this.showPane = false
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
</style>
