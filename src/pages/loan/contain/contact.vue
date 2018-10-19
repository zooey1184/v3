<template>
  <form-list :width='100'>
    <p class="sub_title" style='margin-top: 0;'>紧急联系人1</p>
    <ceil title='姓名'>
      <input type="text" placeholder="请填写联系人1姓名">
    </ceil>
    <ceil title='联系人电话'>
      <input type="text" placeholder="请填写联系人1电话">
    </ceil>
    <p class="sub_title">紧急联系人2</p>
    <ceil title='姓名'>
      <input type="text" placeholder="请填写联系人2姓名">
    </ceil>
    <ceil title='联系人电话'>
      <input type="text" placeholder="请填写联系人2电话">
    </ceil>
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
