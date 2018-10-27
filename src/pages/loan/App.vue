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
import {mapGetters, mapActions, mapState} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'get_router',

    ]),
    ...mapState({
			form: s => s.loanForm,
			h5Config: s => s.h5Config,
    })
  },
  methods: {

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
    if(Global.getUrlData().pass) {
      this.form.realName = '张应颖',
      this.form.idcard = '350921199101200012',
      this.form.loanYuan = '4000',
      this.form.id = '46362'
      // this.form.contact1 = '1 1'
      // this.form.contact2 = '1 1'
    }
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
  display: block;
  max-width: 700px;
  margin: 0 auto;
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
  .gradient(background, #ffa100, #f0400a);
  color: #fff !important;
  border: 1px solid #ffa100 !important;
}
.bg1_dis {
  .gradient(background, #ffa100, #f0400a);
  color: #fff;
  border: 1px solid #ffa100 !important;
  opacity: 0.7;
}
.border1 {
  border: 1px solid #ffa100;
  color: #ffa100;
}
.bg2 {
  .gradient(background, #55b7ee, #0a66f0);
  color: #fff !important;
  border: 1px solid #55b7ee !important;
}
.bg2_dis {
  .gradient(background, #55b7ee, #0a66f0);
  color: #fff;
  border: 1px solid #55b7ee !important;
  opacity: 0.7;
}
.border2 {
  border: 1px solid #55b7ee;
  color: #55b7ee;
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
.c-mark-content {
  padding: 5px;
  .title_img {
    position: absolute;
    width: 70px;
    height: 70px;
    padding: 5px;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-bottom: 20px;
    background: #fff;
    border-radius: 40px;
  }
  .desc_tip {
    padding-top: 40px;
    padding-bottom: 10px;
  }
  .mark-img-full {
    width: 100%;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}
</style>
