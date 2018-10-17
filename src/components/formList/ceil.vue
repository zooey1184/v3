<template>
  <div class="c-form_ceil" ref='ceil' :style='{height: `${c_height}px`}'>
    <div class="left" :style='{width: `${width}px`}'>{{title}}</div>
    <div class="middle" :style='{left: `${width}px`, width: `${middle_width}px`}'>
      <slot></slot>
    </div>
    <div class="right" :style='{width: `${r_width}px`}'>
      <slot name='right'></slot>
    </div>
  </div>
</template>

<script>
import mixins from '@/common/mixins/list_tpl.js'
export default {
  data: ()=> ({
    state: false,
    left_width: 60,
    middle_width: 200,
    c_height: 48
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
    title: {
      type: String,
      default: 'title',
    },
    height: {
      type: Number,
      default: 48,
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
.middle_align {
  display: inline-block;
  vertical-align: bottom;
}
.c-form_ceil {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  .left {
    .middle_align;
    width: 20%;
    height: 16px;
  }
  .middle {
    .middle_align;
    width: 100%;
    height: 100%;
    position: relative;
    input {
      width: 100%;
      height: 100%;
      position: relative;
    }
  }
}
</style>
