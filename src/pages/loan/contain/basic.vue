<template>
  <div class="basic_content">
    <form-list :width='80'>
      <ceil title='真实姓名'>
        <input type="text" placeholder='请输入本人姓名' v-model='form.realName'>
      </ceil>
      <ceil title='身份证号'>
        <input type="text" placeholder='请输入本人身份证号' v-model='form.idcard'>
      </ceil>
      <ceil title='欲借金额'>
        <input type="text" placeholder='请输入欲借金额' v-model='form.loanYuan'>
      </ceil>
      <p class="sub_title">选填信息</p>
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
      <ceil title='公司地址'>
        <input type="text" placeholder='请输入公司地址' v-model='pageData.company_address'>
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
			}

			if(msg && !Param.test) return this.$toast.show(msg)



			const sexMat = /(\d)\S$/.exec(this.form.idcard)

      this.form.sex = sexMat[1]%2 == 0 ? 0 : 1
      if(this.pick=='1') {
        this.form.hasJob = `${this.pageData.company_name}(${this.pageData.company_address})`
      }else {
        this.form.hasJob = '无'
      }
      // this.form.hasJob = this.pick || 0
      console.log(this.form)
      if(this.form.idcard) {
        api.postOrder(this.form).then(res => {
					console.log(res.body)
					this.form.id = res.body.id
				})
      } 
      if(callback) {
        callback()
      }
		},
  },
  mounted() {
    this.form.mobile = localStorage.mobile
		if(Param.must) {
			this.form.realName = '黄谦肆'
			this.form.idcard = '352225199011192011'
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
