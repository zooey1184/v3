<!-- 折叠面板 -->
<template>
  <div class="c-fold_wrap">
    <div class="slideItem--head">
      <slot>
        <img src="//r.51gjj.com/resource/common/icon/ali_pay.png" alt="">
      </slot>
      <p :style='{color: (state=="active"|| state=="before") ? "#333" : "#ABC5D9"}'>{{title}}</p>
    </div>
    <div class="slideItem--content" :style="{height: showPane? `${containH}px`:'0'}">
      <div class="contain_loan" ref="contain">
        <slot name='contain'></slot>
      </div>
    </div>
    <input type="checkbox" class="hide" v-bind:checked="checked" v-on:change="$emit('change', $event.target.checked)">
  </div>
</template>

<script>
export default {
  name: 'card',
  data: ()=> ({
    showPane: false,
    containH: 40
  }),
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean,
    title: {
      type: String,
      default: 'hello'
    },
    state: {
      type: String,
      default: 'active', // before   after
    }
  },
  watch: {
    checked: function(n, o) {
      if(n) {
        this.showPane = true
        this.getRect()
      }else {
        this.showPane = false
        this.getRect()
      }
    }
  },
  methods: {
    getRect() {
      setTimeout(()=> {
        let f = this.$refs.contain
        let r = f.getBoundingClientRect()
        this.containH = r.height+10
      }, 50)
    }
  },
  mounted() {
    if(this.checked) {
      this.showPane = true
      this.getRect()
    }
  }
}
</script>

<style lang="less">
.c-fold_wrap {
  position: relative;
  width: 100%;
  height: 100%;
  box-shadow: 0 0 5px #eee;
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
  .hide {
    position: absolute;
    width: 0;
    left: 0;
    bottom: 0;
    z-index: -1;
    opacity: 0
  }
  .slideItem--head {
    height: 45px;
    font-size: 16px;
    padding: 14px 0;
    color: #333;
    font-weight: 600;
    box-sizing: border-box;
    position: relative;
    display: flex;
    align-items: center;
    img {
      width: 20px;
      margin: 0 10px;
    }
  }
  .slideItem--content {
    position: relative;
    overflow: hidden;
    transition: all 0.4s ease-out;
    box-sizing: border-box;
    background: #fff;
    width: 100%;
    .contain_loan {
      box-sizing: border-box;
      padding: 0 15px;
      color: #333;
      position: relative;
      width: 100%;
      &>div {
        position: relative;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
