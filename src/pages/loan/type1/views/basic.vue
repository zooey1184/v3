<template>
  <page>
    <div>
      <div class="top_page bg1">
        <p class="title">hei</p>
        <v-step></v-step>
      </div>
      <div class="card_wrap">
        <card v-model='card' title='基本信息' ref='card'>
          <div slot='contain'>
            <form-list :width='80' slot='contain'>
              <ceil title='真实姓名'>
                <input type="text" placeholder='请输入本人姓名' v-model='pageData.name'>
              </ceil>
              <ceil title='身份证号'>
                <input type="text" placeholder='请输入本人身份证号' v-model='pageData.name'>
              </ceil>
              <ceil title='欲借金额'>
                <input type="text" placeholder='请输入欲借金额' v-model='pageData.name'>
              </ceil>
              <p>选填信息</p>
              <ceil title='有无工作'>
                <div class="work">
                  <span>有工作
                    <input type="radio" name="" value="1" v-model="pick">
                  </span>
                  <span>没工作
                    <input type="radio" name="" value="0" v-model="pick">
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
          </div>
        </card>
        <button class="basic_btn bg1 border1">下一步</button>
      </div>
    </div>
  </page>
</template>

<script>
import vStep from '@/components/step/v-step.vue'
import formList from '@/components/formList/formList.vue'
import ceil from '@/components/formList/ceil.vue'

export default {
  components: {
    vStep,
    formList,
    ceil
  },
  data: ()=> ({
    card: false,
    pageData: {
      name: '',
      work: 0
    },
    pick: ''
  }),
  watch: {
    pick: function(n) {
      console.log(n);
      let card = this.$refs.card
      card.getRect()
    }
  },
  mounted() {
    setTimeout(()=> {
      this.card = true
    }, 500)
    setTimeout(()=> {
      this.pageData.work = 1

    }, 3000)
  }
}
</script>

<style lang="less">
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
      border: 1px solid #ddd;
      border-radius: 20px;
      padding: 2px 10px;
      position: relative;
    }
  }
  .basic_btn {
    width: 98%;
    display: block;
    margin: 20px auto;
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
}
</style>
