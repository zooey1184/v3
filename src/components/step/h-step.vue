<template>
  <div class="c-Hstep_wrap" ref='step'>
    <div class="step_item" v-for='(item, index) in len' :key='index'>
      <div class="left">
        <div class="line_t line" :style='{borderLeft: index>0 ? (active>=index? "1px solid #4da9ec" : "1px dashed #eee" ) : "rgba(0,0,0,0)"}'></div>
        <div class="circle" :style="{background: (active==index)? '#4da9ec' : '#fff', color: (active==index)? '#fff' : '#999'}">
          <p v-if='active<=index'>{{index+1}}</p>
          <img v-else src="./img/checked.png" alt="">
        </div>
        <div class="line_b line" :style='{borderLeft: (index<len-1)?  (active>index? "1px solid #4da9ec" : "1px dashed #eee" ):"rgba(0,0,0,0)"}'></div>
      </div>
      <div class="right" ref='content'>
        <slot :name='`content_${index}`'></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    len: {
      type: Number,
      default: 4
    },
    active: {
      type: Number,
      default: 0
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
      width: 20px;
      height: 20px;
      border-radius: 20px;
      background: #fff;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      font-size: 16px;
      img {
        width: 100%;
      }
    }
    .line {
      position: relative;
      flex-grow: 1;
      height: 100%;
      border-left: 1px dashed #999;
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
