<template>
<page bgWrap='#fff'>
  <div class="home_page">
    <img class="home_img" src="../../assets/type2_index.jpg" alt="">
    <div class="login_pane">
      <div class="item flex align_items_center">
        <input class='full' type="text" placeholder='请输入手机号' v-model='pageData.phone'>
      </div>
      <div class="item flex align_items_center">
        <input type="text" class='part' placeholder='请输入验证码' v-model='pageData.code'>
        <div class="count bg2 btn">
          <count-down></count-down>
        </div>
      </div>
      <div class="item flex align_items_center">
        <button class="full bg2 border2 btn" @click='$router.push("/verify")'>qianwng</button>
      </div>
    </div>
  </div>
</page>
</template>

<script>
import countDown from '@/components/countdown'

export default {
  name: 'home-page',
  data: ()=> ({
    pageData: {
      phone: '',
      code: ''
    }
  }),
  components: {
    countDown
  }
}
</script>

<style lang='less'>
.home_img {
  width: 100%;
}
.count {
  padding: 5px 10px;
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}
.item {
  width: 80%;
  margin: 15px 0;
  position: relative;
  left: 10%;
  height: 40px;
  .radius {
    border-radius: 30px;
  }
  .full {
    width: 100%;
    height: 100%;
  }
  .part {
    width: 60%;
    height: 100%
  }
  input {
    .radius;
    border: 1px solid #eee;
    outline: none;
    box-shadow: 0 2px 5px #eee;
    padding: 0 10px;
    font-size: 15px;
  }
}
</style>
