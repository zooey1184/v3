<template>
	<span
		@click="sendVcode"
		:class="{ 'no-click': !canSend || isSending }">
		{{ sendTxt }}
	</span>
</template>

<script>
import { ruleMap } from '@/assets/rule'
import { mapState } from 'vuex'

export default {
	computed: {
		...mapState({
			h5Config: s => s.h5Config,
			form: s => s.user.loginForm,
			// setPswMap: s => s.user.setPswMap,
		}),
		canSend() {
			return ruleMap.mobile.test(this.form.mobile);
		},
	},
	data() {
		return {
			sendTxt: '获取验证码',
			isSending: false,
		}
	},
	methods: {
		sendVcode() {
			if(!this.canSend) return this.$toast.show('手机号错误')
			this.isSending = true;
			this.sendTxt = '正在发送...';
			const mobile = this.form.mobile;
			const params = {
				channel: Param.refer,
				cid: this.h5Config.cid,
			}
			this.$http.get('v6/user/send_vcode/' + mobile, { params }).then(res => {
				const body = res.body
				this.$emit('sended');
				this.sendTxt = '已发送';
				this.form.vcode = '';
				const timing = setInterval(_ => {
					body.second--;
					if(body.second <= 0) {
						this.sendTxt = '重发验证码';
						this.isSending = false;
						clearInterval(timing);
					} else {
						this.sendTxt = body.second + 's后重发';
					}
				}, 1e3)
			}, res => {
				this.isSending = false;
				this.sendTxt = '获取验证码';
			})
		},
	}
}
</script>
