<template>
  <div class="c-step_wrap" ref='step'>
    <div 
      v-for='(item, index) in cal_c' 
      :class="{circle: index%2==0, line: index%2==1, have_active: active*2>index, circle_active: active*2==index, line_active: (active*2>index && index%2==1)}" 
      :key='index'>
      <img v-if='(active*2>index && index%2==0)' src="./img/check.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  data: ()=> ({
    len: 5,
    active: 3,
  }),
  computed: {
    cal_w: function () {
      let l = this.len
      let w = 100/l
      return w
    },
    cal_c: function() {
      return this.len*2-1
    }
  },
}
</script>

<style lang='less'>
.c-step_wrap {
  position: relative;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .circle {
    width: 15px;
    height: 15px;
    border-radius: 10px;
    background: rgba(255, 255, 255, .7);
    position: relative;
    img {
      width: 20px;
      position: absolute;
      height: 20px;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%)
    }
  }
  .circle_active {
    background: rgba(255, 255, 255, 1);
  }
  .have_active {
    background: rgba(255, 255, 255, 0);
  }
  .line {
    flex-grow: 1;
    border-top: 1px dashed #ddd;
    margin: 0 10px;
  }
  .line_active {
    border-top: 1px solid #ddd;
  }
}

</style>

