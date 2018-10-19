<template>
  <form-list :width='80'>
    <ceil title='手机号'>
      <input type="text" placeholder="请填写联系人1姓名">
    </ceil>
    <ceil title='服务密码'>
      <input type="text" placeholder="请填写联系人1电话">
    </ceil>
    <ceil title='图片验证码' :r_width='80' :r_height='20'>
      <input type="text" placeholder="请填写联系人1电话">
      <div slot='right' style="background: #d43f33">

      </div>
    </ceil>
    <p class="forget_pwd">忘记密码？</p>
    <div class="tip">
      <p class="tip_title">温馨提示：</p>
      <p>1、请填写本人实名手机号</p>
      <p>2、预授权成功后会受到运营商的短信通知，这是正常现象无需担心</p>
    </div>
    <slot></slot>
  </form-list>
</template>

<script>
export default {
  data: ()=> ({
    pageData: {

    }
  }),
  props: {
    bg: {
      type: String,
      default: 'bg1'
    },
    border: {
      type: String,
      default: 'border1'
    }
  },
  methods: {

  },
}
</script>

<style lang='less'>
.forget_pwd {
  text-align: right;
  color: #1c97f1;
  font-size: 14px;
  margin: 5px 0 10px 0;
}
.tip {
  color: #b5b5b5;
  font-size: 12px;
  line-height: 16px;
  .tip_title {
    font-size: 14px;
    margin-bottom: 5px;
  }
}
</style>
