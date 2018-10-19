<template>
  <div class="c-alertContain">
    <img class="icon_close" v-if='showClose' @click='closeFn' src="./img/close.png" alt="">
    <slot></slot>
    <div class='btn__group' v-if='btn.length>0'>
      <p v-for='(item, index) in btn' :class='{ lastBtn: showBtnLine(index), cancle_btn: item.type=="cancle"}' @click='actionFn(item.type)' :key='item.type'>{{item.text}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'alert-contain',
  props: {
    btn: {
      type: Array,
      default: ()=> [{text:'取消', type: 'cancle'}, {text: '确定', type: 'confirm'}]
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    actionFn(item) {
      if(item && item=='cancle') {
        this.cancleFn()
      }else {
        this.confirmFn()
      }
      navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;
      if (navigator.vibrate) {
        navigator.vibrate(30);
      }
    },
    showBtnLine(index) {
      let l = this.btn.length
      let b = true
      if(index+1>=l) {
        b = false
      }
      return b
    },
    cancleFn() {
      console.log('this is from cancle vue');
      this.$emit('cancle')
    },
    confirmFn() {
      console.log('this is from confirmFn');
      this.$emit('confirm')
    },
    closeFn() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="less">
.c-alertContain {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 40px;
  border-radius: 5px;
  background: #fff;
  .flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .icon_close {
    position: absolute;
    right: 10px;
    top: 10px;
    width: 20px;
    z-index: 111;
  }
  .btn__group {
    display: flex;
    position: relative;
    width: 100%;
    height: 40px;
    font-size: 16px;
    align-items: center;
    &:before {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      height: 1px;
      background: #ddd;
      content: "";
      transform: scaleY(0.5);
      transform-origin: 0 0;
    }
    p {
      display: inline-block;
      flex-grow: 1;
      flex-shrink: 0;
      font-size: 16px;
      text-align: center;
      color: #4a83f2;
      height: 100%;
      .flex;
      position: relative;
    }
    .cancle_btn {
      color: #8c8c8c;
    }
    .lastBtn {
      position: relative;
      &::after {
        position: absolute;
        top: 0;
        right: 0;
        width: 1px;
        height: 100%;
        background: #ddd;
        transform: scaleX(0.5);
        transform-origin: 0 0;
        content: ""
      }
    }
  }
}
</style>
