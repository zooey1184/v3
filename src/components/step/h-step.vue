<template>
  <div class="c-Hstep_wrap" ref='step'>
    <div class="step_item" v-for='(item, index) in len' :key='index'>
      <div class="left">
        <div class="line_t line" :style='{borderLeftColor: index>0? "#eee":"rgba(0,0,0,0)"}'></div>
        <div class="circle"></div>
        <div class="line_b line" :style='{borderLeftColor: (index<len-1)? "#eee":"rgba(0,0,0,0)"}'></div>
      </div>
      <div class="right" ref='content'>
        <slot :name='`content_${index}`'></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: ()=> ({
    len: 5,
    active: 3,
  }),
  computed: {
    cal_w: function () {
      let l = this.len
      let w = 100/l
      return w
    },
    cal_c: function() {
      return this.len*2-1
    }
  }
}
</script>

<style lang='less'>
.c-Hstep_wrap {
  position: relative;
  width: 100%;
  padding: 10px;
  .step_item {
    display: flex;
    align-items: center;
    position: relative;
  }
  .left {
    width: 10%;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    height: 100%;
    .circle {
      width: 15px;
      height: 15px;
      border-radius: 20px;
      background: #ddd;
      flex-shrink: 0;
    }
    .line {
      position: relative;
      flex-grow: 1;
      height: 100%;
      border-left: 1px dashed #eee;
    }
    .line_b {
      margin-top: 5px;
    }
    .line_t {
      margin-bottom: 5px;
    }
  }
  .right {
    width: 90%;
    min-height: 45px;
    position: relative;
    left: 10%;
    padding: 5px 0;
  }
}
</style>
