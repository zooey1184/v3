<template>
  <form-list :width='80'>
    <ceil title='手机号'>
      <input type="text" v-model='form.mobile' readonly placeholder="请输入您的手机号">
    </ceil>
    <ceil title='芝麻分' v-if='form.zhimaScore'>
      <input type="text" v-model='form.zhimaScore' readonly>
    </ceil>
    <ceil title='验证码' :r_width='80' v-else>
      <input type="text" placeholder="请输入验证码" v-model='vcode1'>
      <div slot='right'>
        <count-down @change='sendVcode1'>{{sendTxt1}}</count-down>
      </div>
    </ceil>
    <slot></slot>
  </form-list>
</template>

<script>
import countDown from '@/components/countdown'
import { mapState } from 'vuex'
import api from '../api'
import warning from '@/pages/loan/assets/warning.png'

export default {
  components: {
    countDown
  },
  data: ()=> ({
    token: '',
    vcode1: '',
    sendTiming: '',
    vcode1Sended: '',
    checkBody: '',
    btnTip: '',
    sendTxt1: '发送验证码',
    code: ''
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
			this.$load.hide()
			if(err) return this.$alert(err)
			if(login || action == 'OK') {
				return this.getScore()
			}
			if(action == 'REFRESH_SMS_SUCCESS') {
				this.onSended()
				return
			}
			if(action == 'FAILED') {
				return this.$toast.show(extra.remark)
			}

			if(!extra || !extra.title) {
				if(extra.remark) {
					if(extra.remark > 200)
					return this.$toast.show(extra.remark)
				}
				this.$load.show('等待中')
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
				content = `
          <div class='alert_content'>
            <img src="data:image/png;base64,${extra.remark}" class="alert_content_img_code" style="font-size: 90px;"/>
            <input class='alert_content_inp' placeholder='请输入验证码' type='text' value='' id='code'/>
          </div>
        `
			}
      if(/短信/.test(extra.title)) {
        content = `
          <div class='alert_content'>
            <input class='alert_content_inp' placeholder='请输入验证码' type='text' value='' id='code'/>
          </div>
        `
      }
			this.$alert.show({
				title: `请输入${extra.title}`,
				msg: content,
        cancleFn: ()=> {
          this.$alert.hide()
        },
        confirmFn: async ()=> {
          let code = document.getElementById('code').value
          if(code.length < 4) {
						extra.vcode = code
						this.promptVcode2(extra)
						this.$toast.show('请输入正确的验证码')
						return
					}
					this.$load.show('更新中')
					const res = await this.$http.post('v6/verify/zms/smsCode', {
						token: this.token,
						code,
					})
					this.$load.hide()
					const body = res.body
					if(body.err) {
            this.$toast.show(body.err)
          } else {
            this.checkState()
            this.$alert.hide()
          }
        }
			})
		},
		async checkState() {
			this.$load.show('验证中...')
			const res = await this.$http.get('v6/verify/zms/checkState?token=' + this.token)
			this.checkBody = res.body
		},
		async submitVcode() {
			if(this.vcode1.length < 4) return this.$toast('请输入正确的验证码')
			this.$load.show('验证中')
			const res = await this.$http.post('v6/verify/zms/submitSms', {
				phone: this.form.mobile,
        // phone: '15960018047',
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
			this.$load.show('发送中')
			const res = await this.$http.get('v6/verify/zms/sendSms', {
				params: {
					phone: this.form.mobile,
          // phone: '15960018047',
					token: this.token,
				}
			})
			this.$load.hide()
			const { err, extra } = res.body
			if(err) return this.$toast.show(err)
			if(extra) return this.checkBody = res.body
			this.onSended()
		},
		async getScore(init) {
      const self = this
			this.$load.show('获取芝麻分')
			const { sysId, cid } = this.h5Config
			const params = init ? {
				sysId,
				cid,
				name: this.form.realName,
				phone: this.form.mobile,
				idcard: this.form.idcard,

        // name: '张应颖',
        // phone: '15960018047',
				// idcard: '350921199101200012',
			} : {
				token: this.token,
			}
			const res = await this.$http.get('v6/verify/zms/auth/getScore', {
				params,
			})
			this.$load.hide()
			const { score, token, err, forms } = res.body
			if(err) {
				this.$toast.show(err)
			} else if(score) {
				this.$set(this.form, 'zhimaScore', score)
			} else {
				if(!token) {
          this.$alert.show({
  					title: '请确认您的身份信息',
  					msg: `
              <div class='alert_content_confirm_info'>
                <p>
                  姓名：${self.form.realName}
                </p>
                <p>
                  身份证号：${self.form.idcard}
                </p>
              </div>
            `,
            btn: ['返回修改', '确认无误'],
  					cancleFn: () => {
  						this.$emit('backChange')
              this.$alert.hide()
              return
  					},
            confirmFn: ()=> {
              this.$alert.hide()
              // this.getScore(true)
            }
  				})
        }
				this.token = token
				if(forms && init) {
          this.$toast.show({
            msg: forms[0].loginTips,
            position: 'bottom'
          })
        }
				// this.checkState()
			}
		},
		onSubmit(callback=function(){}) {

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
				// return this.$toast.show('很抱歉，因条件不符合，初审被拒。')
				this.$mark.show({
					title: '',
					btn: [],
					msg: `
						<div class='c-mark-content'>
							<img class='title_img' src=${warning} alt='warning'/>
							<p class='desc_tip'>
								很抱歉，因条件不符合，初审被拒
							</p>
							
						</div>
					`,
					closeFn: ()=> {
						this.$mark.hide()
					}
				})
				return 
			}
			// if(!(score > 350 && score < 950)) return this.$toast('请输入正确的芝麻分')
			api.postOrder({
				zhimaScore: score,
				id: this.form.id,
				note: '完成2(芝麻分认证)',
			})
      if(callback) {
        callback()
      }
			return true
		},


	}
}
</script>

<style lang='less'>
.alert_content {
  .alert_content_inp {
    position: relative;
    width: 70%;
    height: 35px;
    outline: none;
    border: 1px solid #ddd;
    background: #fff;
    padding: 0 5px;
    display: block;
    left: 15%;
  }
  .alert_content_img_code {
    width: 40%;
    display: block;
    margin: 5px auto;
    height: 40px;
  }
}
.alert_content_confirm_info {
  padding: 10px 30px;
  p {
    text-align: left;
    margin: 5px;
  }
}
</style>
