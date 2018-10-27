<template>
  <div class="error_page flex align_items_center">
    <div>
      <img src="../assets/notfound.png" alt="">
      <p>页面找不到了</p>
      <button @click='$router.push("/home")'>返回首页</button>
    </div>
  </div>
</template>

<style lang="less">
.error_page {
  justify-content: center;
  img {
    width: 70%;
    display: block;
    margin: 0 auto;
  }
  p {
    text-align: center;
    font-size: 16px;
    color: #999;
  }
  button {
    background: #fff;
    border: none;
    outline: none;
    color: rgb(59, 143, 238);
    display: block;
    margin: 20px auto;
    &:active {
      color: rgb(241, 120, 20);
    }
  }
}
</style>

