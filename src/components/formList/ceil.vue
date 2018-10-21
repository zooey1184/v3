<template>
  <div class="c-form_ceil" :class='{underlineF: showUnderline}' ref='ceil' :style='{height: `${c_height}px`}'>
    <div>
      <div class="left" :style='{width: `${left_width}px`, height: `${size}px`, fontSize: `${size}px`}'>{{title}}</div>
      <div class="middle"  :style='{ width: `${middle_width}px`, fontSize: `${size}px`}'>
        <slot></slot>
      </div>
      <div class="right_item" v-if='r_width>0' :style='{width: `${r_width}px`, height: r_height? `${r_height}px`: `${size}px`, fontSize: `${size}px`}'>
        <slot name='right'></slot>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from '@/common/mixins/list_tpl.js'

export default {
  name: 'ceil',
  data: ()=> ({
    state: false,
    left_width: 60,
    middle_width: 200,
    c_height: 40
  }),
  mixins: [mixins],
  props: {
    width: {
      type: Number,
      default: 100,
    },
    r_width: {
      type: Number,
      default: 0,
    },
    r_height: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: 'title',
    },
    height: {
      type: Number,
      default: 40,
    },
    size: {
      type: Number,
      default: 15,
    },
    showUnderline: {
      type: Boolean,
      default: true,
    }
  },
  methods: {
    getwidth() {
      let c = this.$refs.ceil
      let r = c.getBoundingClientRect()
      let attr = this.getAttr()
      this.left_width = attr.width || this.width
      this.c_height = attr.height || this.height
      this.middle_width = r.width-this.left_width-this.r_width
    }
  },
  mounted() {
    this.getwidth()
  }
}
</script>

<style lang="less">
.c-form_ceil {
  position: relative;
  .middle_align {
    display: inline-block;
    vertical-align: middle;
    height: 100%;
    position: relative;
  }
  .v-center {
    top: 50%;
    -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
  }
  position: relative;
  width: 100%;
  height: 40px;
  &>div {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    top: 0;
  }
  .left {
    .middle_align;
  }
  .middle {
    .middle_align;
    &>input {
      width: 100%;
      .v-center;
      position: relative;
      height: 100%;
      line-height: 100%;
      padding-top: 5px;
      outline: none;
      font-size: 15px;
      border: none;
    }
  }
  .right_item {
    .middle_align;
  }
}
/* 下划线 */
.underlineF {
  position: relative;
}
.underlineF::after {
  position: absolute;
  content: "";
  bottom: 2px;
  left: 0;
  height: 1px;
  right: 0;
  -webkit-transform: scaleY(0.7);
          transform: scaleY(0.7);
  -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
  background: #ededed;
}
</style>
