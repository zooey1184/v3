<template>
<div>
  <transition name="fade">
    <div class="model--full" v-if="checked" :style="{background: bg}"></div>
  </transition>
  <transition :name="name">
    <div class="contain--full" v-if="checked">
      <slot></slot>
    </div>
  </transition>
  <input type="checkbox" class="hide" v-bind:checked="checked" v-on:change="$emit('change', $event.target.checked)">
</div>
</template>

<script>
export default {
  name: 'model-pane',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean,
    name: {
      type: String,
      default: 'bounce'
    },
    bg: {
      type: String,
      default: "rgba(0, 0, 0, 0.5)"
    }
  }
}
</script>

<style lang="less">
@import '../../../common/css/transition.less';
@color-t: transparent;
@color-b: #3f76f8;
@color-g: rgb(12, 176, 4);
@color-o: rgb(245, 165, 29);
@color-r: rgb(232, 47, 22);
@color-w: #fff;
@color-b: #333;
* {
  margin: 0;
  padding: 0;
}
.full {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.flex {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
          justify-content: center;
}
.hide {
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
  z-index: -1;
}
.model--full {
  .full;
  background: @color-t;
  z-index: 98
}
.contain--full {
  .flex;
  .full;
  // color: @color-w;
  overflow: hidden;
  z-index: 999;
}
</style>
