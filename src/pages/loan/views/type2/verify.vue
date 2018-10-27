<template>
  <page>
    <div>
      <div class="type2_nav_pane bg2 flex align_items_center">贷贷贷</div>
      <h-step :len='5' :active='active'>
        <card v-model='showModel_0' slot='content_0' :state='0<=active?"active":"after"' @click.native.stop='foldFn(active, 0)'  title='基本信息' ref='card_basic'>
          <div class="pane_img flex align_items_center">
            <img src="../../assets/a1.png" alt="">
          </div>
          <basic-content ref='basic' slot='contain' bg='bg2' border='border2' @change='reGetRect("card_basic")'>
            <div class="btn_type2_pane flex">
              <button class="bg2" @click='submitFn("basic")'>下一步</button>
            </div>
          </basic-content>
        </card>
        <card slot='content_1' v-model='showModel_1' :state='1<=active?"active":"after"' @click.native.stop='foldFn(active, 1)' title='紧急联系人'>
          <div class="pane_img flex align_items_center">
            <img v-if='1<=active' src="../../assets/a2.png" alt="">
            <img v-else src="../../assets/a2-0.png" alt="">
          </div>
          <contact ref='contact' slot='contain'>
            <div class="btn_type2_pane flex">
              <button class="bg2" @click='submitFn("contact")'>下一步</button>
            </div>
          </contact>
        </card>
        <card slot='content_2' v-model='showModel_2' :state='2<=active?"active":"after"' @click.native='foldFn(active, 2)' title='芝麻信用授权'>
          <div class="pane_img flex align_items_center">
            <img v-if='2<=active' src="../../assets/a3.png" alt="">
            <img v-else src="../../assets/a3-0.png" alt="">
          </div>
          <zhima slot='contain' ref='zhima' v-if='showModel_2'>
            <div class="btn_type2_pane flex">
              <button class="bg2" @click='submitFn("zhima")'>下一步</button>
            </div>
          </zhima>
        </card>
        <card slot='content_3' v-model='showModel_3' :state='3<=active?"active":"after"' @click.native='foldFn(active, 3)' title='运营商' ref='card_operator'>
          <div class="pane_img flex align_items_center">
            <img v-if='3<=active' style="width: 18px" src="../../assets/a4.png" alt="">
            <img v-else style="width: 18px" src="../../assets/a4-0.png" alt="">
          </div>
          <operation slot='contain' ref='operator' @reGetRect='reGetRect("card_operator")' v-if='showModel_3'>
            <div class="btn_type2_pane flex">
              <button class="bg2" @click='submitFn("operator")'>下一步</button>
            </div>
          </operation>
        </card>
        <card slot='content_4' v-model='showModel_4' :state='4<=active?"active":"after"' @click.native='foldFn(active, 4)' title='身份证拍照' ref='card_photo'>
          <div class="pane_img flex align_items_center">
            <img v-if='4<=active' style="width: 22px" src="../../assets/a5.png" alt="">
            <img v-else style="width: 22px" src="../../assets/a5-0.png" alt="">
          </div>
          <photo slot='contain' ref='photo' v-if='showModel_4'  @reGetRect='reGetRect("card_photo")'>
            <div class="btn_type2_pane flex">
              <button class="bg2" @click='submitFn("photo")'>完成认证</button>
            </div>
          </photo>
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
import { setTimeout } from 'timers';

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
      let card = this.$refs.card_basic
      card.getRect()
    }
  },
  methods: {
    reGetRect(ref) {
      let card = this.$refs[ref]
      card.getRect()
    },
    nextFn(index) {
      let a = 5
      setTimeout(()=> {
        this.active = index
      }, 20)
      for(let i=0; i<a; i++) {
        if(i==index) {
          setTimeout(()=> {
            this[`showModel_${i}`] = true
          }, 100)
        }else {
          this[`showModel_${i}`] = false
        }
      }
    },
    foldFn(act, index) {
      console.log(act, index)
      if(index<act) {
        this.nextFn(index)
      }
    },
    backChange() {
      // zhima $emit 返回修改时间
      this.nextFn(0)
    },
    submitFn(val) {
      let pane = this.$refs[val]
      let obj = {
        'basic': {nextStep: 1},
        'contact': {nextStep: 2},
        'zhima': {nextStep: 3},
        'operator': {nextStep: 4},
        'photo': {nextStep: 'result'}
      }
      
      let callback = ()=> {
        if( typeof(obj[val].nextStep) !== 'string' ) {
          this.nextFn(obj[val].nextStep)
        }else {
          this.$router.push(`/${obj[val].nextStep}`)
        }
      }
      if(val=='photo') {
        this.photoSubmitFn()
      }else {
        pane.onSubmit(callback)
      }
    },
    // photo
    async getCustomers() {
      if(this.h5Config.cid) return
      this.$load.show()
			try {
        const res = await this.$http.get('v6/credit/apply/auth/loan-choices', {
          params: {
            zhimaScore: this.form.zhimaScore,
            idcard: this.form.idcard,
          }
        })
        this.$load.hide()
        this.$store.commit('setData', {
          customers: res.body.map(it => {
            it.check = true
            return it
          }),
        })
        this.$router.replace('/result')
      } catch (error) {
        api.postOrder({
          id: this.form.id,
          note: null
        }).then(res=> {
          this.$store.dispatch('showSuc')
        }, e=> {
          console.log(e)
          this.$toast.show(e.body.msg)
        })
      }
		},
    photoSubmitFn() {
      let photo = this.$refs.photo
      
      let callback = ()=> {
        this.$mark.show({
					title: '请确认您的身份信息',
					btn: [{text: '确定', type: 'confirm'}],
					msg: `
            <div class='mark_content_confirm'>
              <p style='color: #238FE4'>一经提交无法修改，请仔细核对</p>
              <ul>
                <li>
                  本人姓名：${this.form.realName}
                </li>
                <li>
                  身份证号：${this.form.idcard}
                </li>
                <li>
                  紧急联系人1：${this.form.contact1}
                </li>
                <li>
                  希望额度：${this.form.loanYuan}
                </li>
              </ul>
						</div>
					`,
					closeFn: ()=> {
						this.$mark.hide()
          },
          confirmFn: ()=> {
            this.$mark.hide()
            this.getCustomers()
          }
				})
      }
      photo.onSubmit(callback)
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
.pane_img {
  width: 24px;
  margin-right: 20px;
  justify-content: center;
  padding-left: 15px;
  img {
    width: 20px;
  }
}
</style>
