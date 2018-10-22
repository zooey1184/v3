<template>
  <div class="" :style="{background: `${background}`}">
    <div class="img_slot" :style="{paddingTop: `${paddingTop}px`}">
      <slot>
        <img src="//r.51gjj.com/resource/tanyuanbao/waiting.png" alt="">
      </slot>
    </div>
    <div class="desc_pane">
      <p class="title_pane" v-html="title"></p>
    </div>
    <div class='desc_sub'>
      <slot name='desc'>
        <p class="desc_panes" v-html="desc"></p>
      </slot>
    </div>
    <button class="submit_button" v-if='btn' @click="changeFn">{{btn}}</button>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    },
    btn: {
      type: String,
      default: '确定'
    },
    paddingTop: {
      type: Number,
      default: 61
    },
    background: {
      type: String,
      default: '#fff'
    }
  },
  methods: {
    changeFn() {
      this.$emit('change')
    }
  }
}
</script>

<style lang="less">
// @import url('../../common/css/init.less');
.footer_btn {
  margin: 0 auto;
  bottom: 34px;
  font-size: 18px;
  height: 43px;
  color: #fff;
  background: #526ffd;
  outline: none;
  border-radius: 30px;
  border: none;
  box-sizing: border-box;
  background: -webkit-linear-gradient(left, #5e6fe0 , #5694e7);
  background: -o-linear-gradient(right, #5e6fe0 , #5694e7);
  background: -moz-linear-gradient(right, #5e6fe0 , #5694e7);
  background: linear-gradient(to right, #5e6fe0 , #5694e7);
  &:active {
    opacity: 0.8
  }
}
* {
  margin: 0;
  padding: 0;
}
.img_slot {
  display: block;
  position: relative;
  // margin-top: 103px;
  img {
    width: 81px;
    display: block;
    margin: 0 auto;
  }
}
.desc_pane {
  margin-top: 18px;
  height: 58px;
  .title_pane {
    font-size: 15px;
    line-height: 18px;
    color: #2C3946;
    text-align: center;
  }
}
.desc_sub {
  font-size: 13px;
  text-align: center;
  color: #989595;
  height: 61px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.submit_button {
  .footer_btn;
  width: 80%;
  position: relative;
  text-align: center;
  font-size: 16px;
  margin-top: 37px;
  display: block;
  line-height: 42px;
}
</style>
