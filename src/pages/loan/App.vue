<template>
  <div id="app">
    <transition>
      <!-- <keep-alive> -->
        <router-view ref="view"></router-view>
      <!-- </keep-alive> -->
    </transition>
  </div>
</template>

<style lang="less">
#app {
  position: absolute;
  width: 100%;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
}
</style>

