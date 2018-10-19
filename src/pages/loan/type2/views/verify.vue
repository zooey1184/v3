<template>
  <page>
    <div>
      <h-step>
        <card v-model='card' slot='content_0'  title='基本信息' ref='card'>
          <div slot='contain' class="basic_wrap">
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
        <card slot='content_1' title='紧急联系人'>
          <div slot='contain'> 
            heloo
          </div>
        </card>
        <card slot='content_2' title='芝麻信用授权'>
          <div slot='contain'> 
            heloo
          </div>
        </card>
        <card slot='content_3' title='运营商'>
          <div slot='contain'> 
            heloo
          </div>
        </card>
        <card slot='content_4' title='身份证拍照'>
          <div slot='contain'> 
            heloo
          </div>
        </card>
      </h-step>
    </div>
  </page>
</template>


<script>
import formList from '@/components/formList/formList.vue'
import ceil from '@/components/formList/ceil.vue'

export default {
  components: {
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

.basic_wrap {
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
  
}
</style>
