<template>
  <div class="photo__wrap flex align-items-center">
    <div class="left">
      <div class="top">
        <clip-img></clip-img>
      </div>
      <div class="bottom">
        <clip-img></clip-img>
      </div>
    </div>
    <div class="right">
      <clip-img></clip-img>
    </div>
  </div>
</template>

<script>
import clipImg from '@/components/clipImg'

export default {
  components: {
    clipImg
  }
}
</script>

<style lang="less">
.photo__wrap {
  position: relative;
  width: 100%;
  .left {
    width: 45%;
    position: relative;
    .top {
      width: 100%;
      height: 100px;
    }
    .bottom {
      width: 100%;
      height: 100px;
    }
  }
  .right {
    width: 45%;
    position: relative;
    height: 200px
  }
}
</style>
