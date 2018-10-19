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
.sub_title {
  color: #ABC5D9;
  margin-top: 10px;
  font-size: 15px;
}
.bg1 {
  .gradient(background, #ffa100, #f0710a);
  color: #fff;
  border-color: #ffa100;
}
.border1 {
  border: 1px solid #ffa100;
}
.bg2 {
  .gradient(background, #55b7ee, #0aabf0);
  color: #fff;
  border-color: #55b7ee;
}
.border2 {
  border: 1px solid #55b7ee;
}
.top_page {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 160px;
  padding: 10px 30px;
  .title {
    margin: 8px 0;
    text-align: center;
    color: #fff;
    font-size: 18px;
  }
}
.card_wrap {
  position: relative;
  display: block;
  width: 90%;
  margin: 20px auto;
  margin-top: 100px;
}
.btn {
    width: 98%;
    display: block;
    margin: 10px auto;
    height: 40px;
    border: none;
    border-radius: 30px;
    color:#fff;
    font-size: 16px;
    outline: none;
    &:active {
      opacity: 0.8
    }
  }
</style>
