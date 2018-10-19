<template>
  <div class="basic_content">
    <form-list :width='80'>
      <ceil title='真实姓名'>
        <input type="text" placeholder='请输入本人姓名' v-model='pageData.name'>
      </ceil>
      <ceil title='身份证号'>
        <input type="text" placeholder='请输入本人身份证号' v-model='pageData.id'>
      </ceil>
      <ceil title='欲借金额'>
        <input type="text" placeholder='请输入欲借金额' v-model='pageData.loan'>
      </ceil>
      <p class="sub_title">选填信息</p>
      <ceil title='有无工作'>
        <div class="work">
          <span :class="{[bg]: pick==1}">有工作
            <input type="radio" @change='change' value="1" v-model="pick">
          </span>
          <span :class="{[bg]: pick=='0'}">没工作
            <input type="radio" @change='change' value="0" v-model="pick">
          </span>
        </div>
      </ceil>
    </form-list>
    <form-list :width='80' v-if='pick==1'>
      <ceil title='身份证号'>
        <input type="text" placeholder='请输入本人身份证号' v-model='pageData.name'>
      </ceil>
      <ceil title='欲借金额'>
        <input type="text" placeholder='请输入欲借金额' v-model='pageData.name'>
      </ceil>
    </form-list>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data: ()=> ({
    card: false,
    pageData: {
      name: '',
      work: 0,
      id: '',
      loan: ''
    },
    pick: ''
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
    change() {
      this.$emit('change', this.pick)
    }
  },
  mounted() {
    setTimeout(()=> {
      this.card = true
    }, 500)
  }
}
</script>

<style lang='less'>
.basic_content {
  .sub_title {
    color: #999;
    margin-top: 15px;
  }
  .work {
    height: 100%;
    display: flex;
    align-items: flex-end;
    padding-bottom: 6px;
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
    }
    span {
      margin-right: 10px;
      border: 1px solid;
      border-radius: 20px;
      padding: 2px 10px;
      position: relative;
      font-size: 14px;
    }
  }
}
</style>
