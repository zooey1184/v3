<template>
  <div id="app">
    <transition :name='"page-"+get_router'>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
/* eslint-disable */
import {mapGetters, mapActions} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'get_router'
    ])
  },
  methods: {
    backFn() {
      if(Bridge) {
        const self = this
        // Bridge.onBack(function() {
        //   let isBack = true
        //   let h = window.sessionStorage.getItem('HISTORY')
        //   if(h) {
        //     const arr = JSON.parse(h)
        //     if(arr.length && arr.length>0) {
        //       isBack = true
        //     }else {
        //       isBack = false
        //     }
        //   }else {
        //     isBack = false
        //   }
        //   self.$router.back()
        //   return isBack
				// });
      }
    }
  },
  watch: {
    '$route'(to, from) {
      if(window.directionPage=='backward') {
        if(this.$route.meta.onload) {
          this.$route.meta.onload()
        }
      }
      if(this.$route.meta.change) {
        this.$route.meta.change()
      }
      document.title = this.$route.meta.title
    }
  },
  mounted() {
    // setTimeout(()=> {
    //   this.backFn()
    // }, 100)
  }
}
</script>

<style lang="less">
@import url('../../common/css/transition.less');
@import url('../../common/css/reset.less');
@import url('../../common/css/page.less');
@import url('../../common/css/theme.less');
#app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  &>div {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
.bg1 {
  .gradient(background, #ffa100, #f0710a)
}
.border1 {
  .gradient(border, #ffa100, #f0710a)
}
.bg2 {
  .gradient(background, #55b7ee, #0aabf0)
}
.border2 {
  .gradient(border, #55b7ee, #0aabf0)
}
</style>
