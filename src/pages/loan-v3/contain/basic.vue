<template>
  <div class="basic_content">
    <form-list :width='80'>
      <ceil title='真实姓名'>
        <input type="text" placeholder='请输入本人姓名' v-model='form.realName'>
      </ceil>
      <ceil title='身份证号'>
        <input type="tel" placeholder='任意非数字会转为X' v-model='form.idcard'>
      </ceil>
      <ceil title='欲借金额'>
        <input type="tel" placeholder='请输入欲借金额' v-model='form.loanYuan'>
      </ceil>
      <p class="sub_title">选填信息</p>
      <ceil title='QQ号'>
        <input type="tel" placeholder='' v-model='form.qq'>
      </ceil>
      <ceil title='微信号'>
        <input type="text" placeholder='' v-model='form.weixin'>
      </ceil>
      <ceil title='有无工作'>
        <div class="work">
          <span :class="{[border]: true, [bg]: pick=='1'}">有工作
            <input type="radio" @change='change' :value="1" v-model="pick">
          </span>
          <span :class="{[border]: true, [bg]: pick=='0'}">没工作
            <input type="radio" @change='change' :value="0" v-model="pick">
          </span>
        </div>
      </ceil>
    </form-list>
    <form-list :width='80' v-if='pick==1'>
      <ceil title='公司名称'>
        <input type="text" placeholder='请输入公司名称' v-model='pageData.company_name'>
      </ceil>
      <ceil title='工作职位'>
        <input type="text" placeholder='请输入工作职位' v-model='pageData.company_address'>
      </ceil>
    </form-list>
    <slot></slot>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { ruleMap, checkInput } from '@/assets/rule'
import api from '../api'
import { log } from 'util';
import warning from '../assets/warning.png'

export default {
  data: ()=> ({
    card: false,
    pick: '',
    rules: {
      realName: {
        label: '姓名',
        reg: ruleMap.zwname,
      },
      idcard: {
        label: '身份证号',
        reg: ruleMap.idcard,
      }
    },
    pageData: {
      company_name: '',
      company_address: ''
    }
  }),
  computed: {
		...mapState({
			form: s => s.loanForm,
			h5Config: s => s.h5Config,
    })
  },
  watch: {
    'form.idcard'(val) {
			if(/\D$/.test(val)) this.form.idcard = val.replace(/\D$/, 'X')
		},
  },
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
    },
    onSubmit(callback=()=> {}) {
			this.form.refer = Param.refer

			let msg = checkInput(this.form, this.rules)

			if(Param.test) {
				this.progress = 1
				if(!this.form.realName || !this.form.idcard) {
					this.$toast.show('请输入姓名和身份证号')
					return false
				}
			}
			const ageMat = /^\d{6}(\d{4})/.exec(this.form.idcard)
			if(ageMat) this.form.age = new Date().getFullYear() - ageMat[1]

			if(!msg) {
				if(this.form.age < 0 || this.form.age > 70) msg = '身份证号有误或年龄不符合要求'
				else if(!this.form.loanYuan) msg = '请输入借款金额'
				else if(!/00$/.test(this.form.loanYuan)) msg = '请输入金额为100的倍数'
				else if(this.form.loanYuan < 1e3 || this.form.loanYuan > 5e4) {
					msg = '请输入正确金额（1千-5万）'
        }
        else if(!this.form.qq && !this.form.weixin) msg = 'QQ号和微信号需至少填写一项'
				else if(this.form.qq && !ruleMap.qq.test(this.form.qq)) msg = '请输入正确的QQ号'
				else if(this.form.weixin && this.form.weixin.length < 3) msg = '请输入正确的微信号'
			}

			if(msg && !Param.test) return this.$toast.show(msg)

      const sexMat = /(\d)\S$/.exec(this.form.idcard)
      this.form.sex = sexMat[1]%2 == 0 ? 0 : 1
      
      const ageOut = (this.form.age > 45 || this.form.age < 19) && !this.h5Config.cid
      this.form.note = `1(基础信息)`
      if(ageOut) {
        this.form.note = '1(年龄不符)'
        this.form.state = -3
      }
      if(this.pick=='1') {
        const { company_name, company_address } = this.pageData
        if(!company_name) this.form.hasJob = '有'
        else this.form.hasJob = `${company_name}(${company_address})`
      }else {
        this.form.hasJob = '无'
      }
      // this.form.hasJob = this.pick || 0
      if(!this.form.id) api.postOrder(this.form).then(res => {
        this.form.id = res.body.id
      })
      if(ageOut) {
        this.$mark.show({
          title: '',
          btn: [],
          msg: `
            <div class='c-mark-content'>
              <img class='title_img' src=${warning} alt='warning'/>
              <p class='desc_tip'>
                很抱歉，初审未通过：年龄不符
              </p>
            </div>
          `,
          closeFn: ()=> {
            this.$mark.hide()
          }
        })
        return 
      }
      if(callback) {
        callback()
      }
		},
  },
  mounted() {
    this.form.mobile = localStorage.mobile
		if(Param.test > 1) {
			this.form.realName = '黄谦肆'
      this.form.idcard = '352225199011192011'
      this.form.loanYuan = 1000
		}
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
      // border: 1px solid;
      border-radius: 20px;
      padding: 2px 10px;
      position: relative;
      font-size: 14px;
    }
  }
}
</style>
