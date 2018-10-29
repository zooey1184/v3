<template>
  <form-list :width='100'>
    <div class="operator_done_pane" v-if="authAt || yysLoading" title="验证状态">
			<img src="https://xinkouzi.oss-cn-shanghai.aliyuncs.com/65d9dde0-858d-11e8-a65b-d3fc43d7a229.png?240_240" alt="">
			<p style="padding-bottom: 10px">{{ authAt ? '已完成' : '认证中，可进入下一步' }}</p>
    </div>
    <template v-else>
      <ceil :title="item.fieldName" 
				:r_width='item.fieldExtraConfig ? 90 : 0'
        :r_height='(item.fieldExtraConfig && item.fieldExtraConfig.fieldExtraType !="SMS")?40:16'
        v-for="(item, i) in fields" :key="i">
        <input type="text" :disabled="item.field == 'username'" v-model="loginForm[item.field]" :placeholder="item.fieldExtraConfig ? '' : ('请输入' + item.fieldName)">
        <span class="link fz-12" @click="clickReset" slot="right" v-if="item.field == 'password'">重置密码</span>
        <gxb-yys-vcode v-if="item.fieldExtraConfig" slot="right"
          @send="loginForm.randomPassword = ''"
          :token="token"
          :is-sms="item.fieldExtraConfig.fieldExtraType == 'SMS'">
        </gxb-yys-vcode>
      </ceil>
    </template>


    <!-- <ceil :title="lastAction == 'NEED_IMAGE' ? '图片验证码' : '短信验证码'" :r_width='90' :r_height='20'>
      <input type="text" placeholder="请输入验证码">
      <gxb-yys-vcode v-if="lastAction == 'NEED_IMAGE'" slot="right"
        :img-data="imgData"
        @fail="closePop"
        :token="token" ref="vcode2"
        :is-sms="false">
      </gxb-yys-vcode>
    </ceil> -->
		<div v-if='!authAt'>
			<p class="forget_pwd" @click='forget_pwdFn'>忘记密码？</p>
			<div class="tip">
				<p class="tip_title">温馨提示：</p>
				<p>1、请填写本人实名手机号</p>
				<p>2、预授权成功后会受到运营商的短信通知，这是正常现象无需担心</p>
			</div>
		</div>
    <slot></slot>
  </form-list>
</template>

<script>
import { mapState } from 'vuex'
import api from '../api'
import gxbYysVcode from './yysBtn'
import { setTimeout } from 'timers';

export default {
  data: ()=> ({
    authAt: 0,
    token: '',
    fields: [],
    loginForm: {},
    fieldExtraType: '',
    resetConfig: '',
    btmTip: '',
    lastAction: '',
    showPop: false,
    vcode2: '',
    imgData: '',
  }),
  components: {
    gxbYysVcode
  },
  computed: {
		...mapState({
			form: s => s.loanForm,
			h5Config: s => s.h5Config,
			yysLoading: s => s.yysLoading,
		})
  },
  mounted() {
		if(Param.test > 2) this.authAt = 1
		else this.initData()
		this.$route.meta.onchange = ()=> {
			if(Param.test > 2) this.authAt = 1
			else this.initData()
		}
	},
	watch: {
		authAt() {
			const self = this
			if(this.authAt && this.token) {
				this.$toast.show('运营商认证')
				api.postOrder({
					id:  self.form.id,
					note: '4(完成运营商)',
					vTags: 'zmf,yys',
				})
			}
		},
	},
  props: {
    bg: {
      type: String,
      default: 'bg1'
    }
  },
  methods: {
    closePop() {
			this.showPop = false
			this.$store.commit('setData', {
				yysLoading: false,
			})
			this.$emit('yys-fail')
		},
		clickReset() {
			this.$toast.show(this.resetConfig.resetTips)
		},
		forget_pwdFn() {
			const self = this
			this.$toast.show({
				msg: self.resetConfig.resetTips || '联系运营商找回密码',
				position: 'middle'
			})
			
		},
		async submitMore() {
			if(this.vcode2.length < 4) return this.$toast.show('请输入正确的验证码')
			this.showPop = false
			this.$load.show('验证中')
			const res = await this.$http.post('v6/verify/phone/second_auth', {
				token: this.token,
				code: this.vcode2,
			})
			setTimeout(() => {
				this.checkState()
			}, 1e3);
		},
		async checkState() {
			const self = this
			if(!this.yysLoading) this.$load.show('加载中.')
			const res = await this.$http.get('v6/verify/phone/checkState?token=' + this.token)
			const { action, extra } = res.body
			this.$load.hide()
			this.lastAction = action
			if(/FAIL/.test(action)) {
				const emitFail = this.yysLoading
				this.$store.commit('setData', {
					yysLoading: false,
				})
				if(emitFail) this.$emit('yys-fail')
				return this.$toast.show(extra ? extra.remark : '运营商查询失败')
			}
			if(action == 'OK') {
				this.$store.commit('setData', {
					yysLoading: false,
				})
				return this.authAt = Date.now()
			}
			if(/NEED/.test(action)) {
				this.vcode2 = ''
				this.showPop = true
        this.$emit('reGetRect')
				if(action == 'NEED_IMAGE') this.imgData = extra.remark
				this.$markyys.show({
					title: self.lastAction == 'NEED_IMAGE' ? '图片验证码' : '短信验证码',
					action: self.lastAction == 'NEED_IMAGE' ? true : false,
					imgData: self.imgData,
					token: self.token,
					btn: [{text: 'ddd', type: 'confirm'}],
					confirmBtn: (e)=> { 
						self.vcode2 = e
						setTimeout(()=> {
							self.submitMore()
						}, 100)
					}
				})
				return
			}
			if(action == 'LOADING') {
				// this.$store.commit('setData', {
				// 	yysLoading: true,
				// })
			}
			if(!this.yysLoading) this.$load.show('等待中')
			setTimeout(() => {
				this.checkState()
			}, 4e3);
		},
		async submitLogin() {
			for(const item of this.fields) {
				const val = this.loginForm[item.field]
				if(!val) return this.$toast.show('请输入' + item.fieldName)
				const reg = new RegExp(item.checkRegex)
				if(!reg.test(val)) return this.$toast.show(item.fieldTips)
			}
			this.$load.show()
			const res = await this.$http.post('v6/verify/phone/login', {
				...this.loginForm,
				token: this.token,
			})
			if(res.body.err) return this.$toast.show(res.body.err)
			this.checkState()
		},

		async initData() {
			this.$load.show()
			const { sysId, cid } = this.h5Config
			const res = await this.$http.get('v6/verify/phone/auth/init', {
				params: {
					sysId,
					cid,
					name: this.form.realName,
					phone: this.form.mobile,
          idcard: this.form.idcard,
				}
			})
			this.$load.hide()
			try {
				const body = res.body
				if(body.err) return this.$toast.show(body.err)
				if(body.authAt) this.authAt = body.authAt
				const formInfo = body.forms ? body.forms[0] : null
				let hasImg = false
				console.log('helo')
				this.$emit('reGetRect')
				if(formInfo) {
					this.token = body.token
					this.btmTip = formInfo.loginTips
					this.$toast.show({
						msg: this.btmTip,
						position: 'middle',
						duration: 5000
					})
					this.resetConfig = formInfo.pwdResetConfig
					for(const item of formInfo.fields) {
						const loginForm = {}
						loginForm[item.field] = ''
						loginForm.username = this.form.mobile
						this.loginForm = loginForm
						if(item.fieldExtraConfig && item.fieldExtraConfig.fieldExtraType == 'PIC') {
							hasImg = true
						}
					}
					
					this.fields = formInfo.fields
					this.$emit('reGetRect')
					
				}
			} catch (error) {
				this.$emit('reGetRect')
				console.log(error)
			}
		},
		onSubmit(callback=function(){}) {
			const body = {
				id: this.form.id,
				note: this.authAt ? '4(已完成运营商)' : '4(运营商认证中)',
			}
			if(this.authAt) body.vTags = 'zmf,yys'
			api.postOrder(body)
			if(!this.authAt) {
				this.submitLogin()
				return
			}
			if(callback){
				callback()
			}
			return true
		},
  }
}
</script>

<style lang='less'>
.operator_done_pane {
	img {
		width: 100px;
		display: block;
		margin: 10px auto;
	}
	p {
		text-align: center;

	}
}
.forget_pwd {
  text-align: right;
  color: #1c97f1;
  font-size: 14px;
  margin: 5px 0 10px 0;
}
.tip {
  color: #b5b5b5;
  font-size: 12px;
  line-height: 16px;
  .tip_title {
    font-size: 14px;
    margin-bottom: 5px;
  }
}
</style>
