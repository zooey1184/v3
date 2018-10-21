<template>
  <form-list :width='80'>
    <ceil title='手机号'>
      <input type="text" placeholder="请输入您的手机号">
    </ceil>
    <ceil title='验证码' :r_width='80'>
      <input type="text" placeholder="请输入验证码">
      <div slot='right'>
        <count-down></count-down>
      </div>
    </ceil>
    <ceil title='芝麻分'>
      <input type="text" :value='80'>
    </ceil>
    <slot></slot>
  </form-list>
</template>

<script>
import countDown from '@/components/countdown'
import { mapState } from 'vuex'
import api from '../api'

export default {
  components: {
    countDown
  },
  data: ()=> ({
    token: '',
    vcode: '',
    sendTiming: '',
    vcode1Sended: '',
    checkBody: '',
    btnTip: ''
  }),
  props: {
    bg: {
      type: String,
      default: 'bg1'
    }
  },
  computed: {
		...mapState({
			form: s => s.loanForm,
			h5Config: s => s.h5Config,
		})
	},
	mounted() {
		if(Param.zmf) this.form.zhimaScore = Param.zmf
		else this.getScore(true)
	},
	watch: {
		'form.mobile'() {
			this.getScore(true)
		},
		checkBody() {
			const { err, login, extra, action } = this.checkBody
			this.$loading.close()
			if(err) return this.$alert(err)
			if(login || action == 'OK') {
				return this.getScore()
			}
			if(action == 'REFRESH_SMS_SUCCESS') {
				this.onSended()
				return
			}
			if(action == 'FAILED') {
				return this.$alert(extra.remark)
			}
			
			if(!extra || !extra.title) {
				if(extra.remark) {
					if(extra.remark > 200) 
					return this.$alert(extra.remark)
				}
				this.$loading('等待中')
				console.log(extra)
				setTimeout(() => {
					this.checkState()
				}, 2000)
			} else {
				this.promptVcode2(extra)
			}
		}
	},
	methods: {
		promptVcode2(extra) {
			let content = ''
			if(/图片/.test(extra.title)) {
				content = `<img src="data:image/png;base64,${extra.remark}" class="max-img" style="font-size: 90px;" />`
			}
			/*
			vux/confirm:15
				<div class="weui-dialog__bd">
				<slot><div v-html="content"></div></slot>
				</div>
				<div v-if="showInput" class="vux-prompt">
			*/
			this.$vux.confirm.prompt('请输入验证码', {
				title: extra.tips.replace('中对应的', ''),
				content,
				inputAttrs: {
					autofocus: 'autofocus',
				},
				onShow: () => {
					if(extra.vcode) this.$vux.confirm.setInputValue(extra.vcode)
				},
				onConfirm: async code => {
					if(code.length < 4) {
						extra.vcode = code
						this.promptVcode2(extra)
						this.$toast('请输入正确的验证码')
						return
					}
					this.$loading('更新中')
					const res = await this.$http.post('v6/verify/zms/smsCode', {
						token: this.token,
						code,
					})
					this.$loading.close()
					const body = res.body
					if(body.err) this.$alert(body.err)
					else this.checkState()
				},
			})
		},
		async checkState() {
			this.$loading('验证中...')
			const res = await this.$http.get('v6/verify/zms/checkState?token=' + this.token)
			this.checkBody = res.body
		},
		async submitVcode() {
			if(this.vcode1.length < 4) return this.$toast('请输入正确的验证码')
			this.$loading('验证中')
			const res = await this.$http.post('v6/verify/zms/submitSms', {
				phone: this.form.mobile,
				token: this.token,
				code: this.vcode1,
			})
			this.checkBody = res.body
		},
		onSended() {
			this.vcode1Sended = true
			this.sendSec1 = 60
			this.sendTxt1 = '已发送'
			this.vcode1 = ''
			this.sendTiming1 = setInterval(() => {
				this.sendSec1--
				if(this.sendSec1 > 0) {
					this.sendTxt1 = this.sendSec1 + 's后重发'
				} else {
					this.sendTxt1 = '重新发送'
					clearInterval(this.sendTiming1)
					this.sendTiming1 = null
				}
			}, 1e3)
		},
		async sendVcode1() {
			this.$loading('发送中')
			const res = await this.$http.get('v6/verify/zms/sendSms', {
				params: {
					phone: this.form.mobile,
					token: this.token,
				}
			})
			this.$loading.close()
			const { err, extra } = res.body
			if(err) return this.$alert(err)
			if(extra) return this.checkBody = res.body
			this.onSended()
		},
		async getScore(init) {
			this.$loading('获取芝麻分')
			const { sysId, cid } = this.h5Config
			const params = init ? {
				sysId,
				cid,
				name: this.form.realName,
				phone: this.form.mobile,
				idcard: this.form.idcard,
			} : {
				token: this.token,
			}
			const res = await this.$http.get('v6/verify/zms/auth/getScore', {
				params,
			})
			this.$loading.close()
			const { score, token, err, forms } = res.body
			if(err) {
				this.$alert(err)
			} else if(score) {
				this.$set(this.form, 'zhimaScore', score)
			} else {
				if(!token) this.$vux.confirm.show({
					title: '请确认您的身份信息',
					content: `姓名：${this.form.realName} <br>身份证号：${this.form.idcard}`,
					confirmText: '确认无误',
					cancelText: '返回修改',
					onCancel: () => {
						this.$emit('back')
					},
				})
				this.token = token
				if(forms && init) this.btmTip = forms[0].loginTips
				// this.checkState()
			}
		},
		onSubmit() {
			
			const score = this.form.zhimaScore
			if(!score) {
				if(!this.token) this.getScore(true)
				else this.submitVcode()
				// return this.$toast('请输入芝麻分')
				return
			}
			if(score < 580 && !this.h5Config.cid) {
				api.postOrder({
					zhimaScore: score,
					id: this.form.id,
					note: '完成2(芝麻分不足)',
					state: -3,
				})
				return this.$alert('很抱歉，因条件不符合，初审被拒。')
			}
			// if(!(score > 350 && score < 950)) return this.$toast('请输入正确的芝麻分')
			api.postOrder({
				zhimaScore: score,
				id: this.form.id,
				note: '完成2(芝麻分认证)',
			})
			return true
		},

		
	}
}
</script>
