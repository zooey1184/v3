<template>
  <page>
    <div>
      <div class="type2_nav_pane bg2 flex align_items_center">贷贷贷</div>
      <h-step :len='5' :active='active'>
        <card v-model='showModel_0' slot='content_0'  title='基本信息' ref='card'>
          <basic-content slot='contain' bg='bg2' @change='reGetRect'>
            <div class="btn_type2_pane flex">
              <button class="bg2" @click='nextFn(1)'>xiayibu</button>
            </div>
          </basic-content>
        </card>
        <card slot='content_1' v-model='showModel_1' title='紧急联系人'>
          <contact slot='contain'>
            <div class="btn_type2_pane flex">
              <button class="bg2" @click='nextFn(2)'>xiayibu</button>
            </div>
          </contact>
        </card>
        <card slot='content_2' v-model='showModel_2' title='芝麻信用授权'>
          <zhima slot='contain'>
            <div class="btn_type2_pane flex">
              <button class="bg2" @click='nextFn(3)'>xiayibu</button>
            </div>
          </zhima>
        </card>
        <card slot='content_3' v-model='showModel_3' title='运营商'>
          <operation slot='contain'>
            <div class="btn_type2_pane flex">
              <button class="bg2" @click='nextFn(4)'>xiayibu</button>
            </div>
          </operation>
        </card>
        <card slot='content_4' v-model='showModel_4' title='身份证拍照'>
          <photo slot='contain'></photo>
        </card>
      </h-step>
    </div>
  </page>
</template>


<script>
import basicContent from '../../contain/basic.vue'
import contact from '../../contain/contact.vue'
import zhima from '../../contain/zhima.vue'
import operation from '../../contain/operator.vue'
import photo from '../../contain/photo.vue'

export default {
  components: {
    basicContent,
    contact,
    zhima,
    operation,
    photo
  },
  data: ()=> ({
    showModel_0: false,
    showModel_1: false,
    showModel_2: false,
    showModel_3: false,
    showModel_4: false,
    pageData: {
      name: '',
      work: 0
    },
    active: 0,
    pick: ''
  }),
  watch: {
    pick: function(n) {
      console.log(n);
      let card = this.$refs.card
      card.getRect()
    }
  },
  methods: {
    reGetRect() {
      let card = this.$refs.card
      card.getRect()
    },
    nextFn(index) {
      let a = 5
      this.active = index
      for(let i=0; i<a; i++) {
        if(i==index) {
          this[`showModel_${i}`] = true
        }else {
          this[`showModel_${i}`] = false
        }
      }
    }
  },
  mounted() {
    let p = Global.getUrlData()
    if(p && p.step) {
      let n = Number.parseInt(p.step)
      setTimeout(()=> {
        this.nextFn(n)
      }, 500)
    }else {
      setTimeout(()=> {
        this.showModel_0 = true
      }, 500)
    }
  }
}
</script>

<style lang="less">
.type2_nav_pane {
  padding: 12px 0;
}

.btn_type2_pane {
  padding: 20px 0;
  justify-content: flex-end;
  button {
    border-radius: 30px;
    padding: 6px 15px;
    outline: none;
    &:active {
      opacity: .7;
    }
  }
}
</style>
