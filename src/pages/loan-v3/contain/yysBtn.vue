<template>
	<div>
		<span
			v-if="isSms"
			:class="{ 'disabled': sendTiming1 }"
			@click="sendVcode1">{{ sendTxt1 }}
		</span>
		<div v-else class="pos-r" @click="renewPic">
			<img :src="validPic" v-if="validPic" class="d-b" style="height: 100%;">
			<div class="pos-center" v-if="picLoading" style="background: rgba(255, 255, 255, .5)">
				<!-- <inline-loading></inline-loading> -->
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	props: {
		isSms: Boolean,
		token: String,
		imgData: String,
	},
	computed: {
		...mapState({
			form: s => s.loanForm,
		})
	},
	data() {
		return {
			sendTiming1: null,
			vcode1Sended: false,
			sendTxt1: '发送验证码',
			validPic: '',
			picLoading: false,
		}
	},
	methods: {
		async renewPic() {
			if(this.picLoading) return
			this.picLoading = true
			const res = await this.$http.get('v6/verify/phone/getPic?token=' + this.token)
			this.picLoading = false
			const { err, image } = res.body
			if(err) return this.$vux.confirm.show({
				content: err,
				onConfirm: () => {
					this.renewPic()
				},
				onCancel: () => {
					this.$emit('fail')
				}
			})
			this.validPic = 'data:image/png;base64,' + image
		},
		async sendVcode1() {
			this.$load.show('发送中')
			const res = await this.$http.get('v6/verify/phone/sendSms', {
				params: {
          phone: this.form.mobile,
          // phone: '15960018047',
					token: this.token,
				}
			})
			this.$load.hide()
			const { err } = res.body
			if(err) return this.$alert(err)
			this.vcode1Sended = true
			this.sendSec1 = 60
			this.sendTxt1 = '已发送'
			this.$emit('send')
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
	},
	mounted() {
		if(this.imgData) this.validPic = 'data:image/png;base64,' + this.imgData
		else if(!this.isSms) this.renewPic()
	},
}
</script>

