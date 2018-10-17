<template>
  <div class="form_list_wrap">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "form-list",
}
</script>

<style scoped lang="less">
.form_list_wrap {
  position: relative;
  width: 100%;
}
</style>

