<template lang="html">
  <div class="step_bar" ref='bar_wrap'>
    <div class="item" :style="{width: iteminfo.width}" v-for='(item, index) in list' :key='index'>
      <div class="line" v-if='list.length-1>index' :class="{active_line: active>index}"></div>
      <div class="outborder" :class="{active_border: active>=index}">
        <div class="inset_circle" v-if='active>=index'></div>
      </div>
      <p class="text">{{item}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data: ()=> ({
    iteminfo: {
      width: '50%'
    },
    list: ['Informasi pribadi', 'Informasi Tambahan', 'Sertifikasi foto ', 'informasi bank', 'selesai']
  }),
  props: {
    active: {
      type: [Number, String],
      default: 0
    }
  },
  methods: {
    getWF() {
      let l = this.list.length
      this.iteminfo.width = `${Number.parseInt(100/l)}%`
    }
  },
  mounted() {
    this.getWF()
  }
}
</script>

<style lang="less">
.step_bar {
  width: 100%;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  .item {
    display: inline-block;
    vertical-align: top;
    text-align: center;
    position: relative;
    height: 50px;
  }
  .line {
    width: 100%;
    height: 3px;
    background: #ddd;
    position: absolute;
    top: 10px;
    left: 50%;
  }
  .text {
    margin-top: 20px;
    color: #333;
    font-size: 16px;
  }
  .active_border {
    border-color: #517AE1;
  }
  .active_line {
    background: #517AE1;
  }
}
.outborder {
  border: 2px solid #ddd;
  border-radius: 20px;
  background: #fff;
  width: 22px;
  height: 22px;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}
.inset_circle {
  width: 13px;
  background: #517AE1;
  height: 13px;
  border-radius: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
