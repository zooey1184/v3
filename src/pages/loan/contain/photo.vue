<template>
  <div class="photo__wrap flex align-items-center">
    <div class="photo_left">
      <div class="top">
        <clip-img></clip-img>
      </div>
      <div class="bottom">
        <clip-img></clip-img>
      </div>
    </div>
    <div class="photo_right">
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
  justify-content: flex-start;
  box-sizing: border-box;
  .photo_left {
    width: 47%;
    position: relative;
    margin-right: 3%;
    .top {
      width: 100%;
      height: 80px;
      position: relative;
      margin-bottom: 10px;
    }
    .bottom {
      width: 100%;
      height: 80px;
      position: relative;
    }
  }
  .photo_right {
    width: 47%;
    position: relative;
    height: 170px;
    margin-left: 0;
  }
}
</style>
