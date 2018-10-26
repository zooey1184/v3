<template>
	<div v-if="customers.length" class="loan_product_wrap">
		<img class="rs_bg" src="../assets/loan_result_bg.png" alt="">
		<div class="rs_content">
			<p class="title_rs">贷贷贷</p>
			<div class="top_title">
				借款成功率：<span style="font-size: 30px;">{{ sucPerc || initPerc }}%</span>
			</div>
			<p class='top_tip'>根据所提供的资料，已匹配以下产品</p>
			<div class="loan_item" v-for="(item, i) in customers" :key="i" @click="checkItem(item)">
				<div class="item_left_img">
					<img :src="item.imgUrl" class="icon" style="margin-right: 10px;">
					<div class="item_middle_text">
						<h4>{{item.title}}</h4>
						<p>{{item.desc}}</p>
					</div>
				</div>
				<div class="item_right_check">
					<img :src="item.check ? 'https://xinkouzi.oss-cn-shanghai.aliyuncs.com/cd720040-8592-11e8-a65b-d3fc43d7a229.png' : 'https://xinkouzi.oss-cn-shanghai.aliyuncs.com/c294c810-8592-11e8-a65b-d3fc43d7a229.png?36_36'" style="width: 20px;">
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import api from '../api'
import warning from '@/pages/loan/assets/warning.png'

export default {
	computed: {
		...mapState({
			form: s => s.loanForm,
			customers: s => s.customers,
			yysLoading: s => s.yysLoading,
		}),
		checkLoans() {
			return this.customers.filter(it => it.check)
		},
	},
	data() {
		return {
			isDone: false,
			initPerc: 20,
			sucPerc: 0,
			card: true,
			list: [{
				title: '51youqian',
				desc: '快速下款',
				imgUrl: '//r.51gjj.com/image/logo/ICBK.png'
			}]
		}
	},
	methods: {
		checkItem(item) {
			this.$set(item, 'check', !item.check)
			const ratio = this.checkLoans.length / this.customers.length
			this.sucPerc = parseInt(this.initPerc + ratio * (92 - this.initPerc))
		},
		onSubmit() {
			if(this.customers.length && !this.checkLoans.length) {
				this.$toast.show('请至少选择一个平台')
				return
			}
			if(this.yysLoading) return this.$toast.show('请等待运营商认证完成')
			this.form.note = null
			this.form.chooseCids = this.checkLoans.map(it => it.id)
			this.form.chooseLoans = this.checkLoans.map(it => it.title)
			
			if(this.form.zhimaScore && this.form.zhimaScore>580) {
				this.$load.show()
				api.postOrder(this.form).then(res => {
					this.$load.hide()
					this.isDone = true
					// this.$mark.show({
					// 	title: '',
					// 	showClose: false,
					// 	btn: [{text: '确定', type: 'confirm'}],
					// 	msg: `
					// 		<div class='mark_content_confirm'>
					// 			<img class='title_img' src='https://xinkouzi.oss-cn-shanghai.aliyuncs.com/65d9dde0-858d-11e8-a65b-d3fc43d7a229.png?240_240' alt=''/>
					// 			<h4 class='title_heder'>您的申请已成功</h4>
					// 			<p>24小时放款，短信通知到账</p>
					// 		</div>
					// 	`,
					// 	closeFn: ()=> {
					// 		this.$mark.hide()
					// 	},
					// 	confirmFn: ()=> {
					// 		console.log('confirm')
					// 		this.$mark.hide()
					// 		this.$router.push('/home')
					// 	}
					// })
					this.$store.dispatch('showSuc')
					this.$emit('done')
				})
			}else {
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
		},
	}
}
</script>

<style lang="less">

.mark_content_confirm {
  text-align: left;
  padding: 0 6px;
  line-height: 24px;
  .title_img {
    position: absolute;
    width: 70px;
    height: 70px;
    padding: 5px;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    margin-bottom: 20px;
    background: #fff;
    border-radius: 40px;
  }
  .title_heder {
    font-size: 18px;
    font-weight: lighter;
    padding-top: 40px;
    text-align: center;
    margin-bottom: 10px;
  }
}
.loan_product_wrap {
	.top_title {
		margin: 20px 0;
		text-align: center;
		color: #fff;
	}
	.rs_bg {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
	}
	.rs_content {
		z-index: 9;
		position: relative;
		top: 30px;
	}
	.title_rs {
		text-align: center;
		color: #fff;
	}
	.top_tip {
		margin-left: 20px;
		font-size: 14px;
		color: #fff;
	}
	.loan_item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 15px;
		margin: 10px 20px;
		box-shadow: 0 0 5px #eee;
		background: #fff;
		border-radius: 5px;
		.item_left_img {
			display: flex;
			align-items: center;
			h4 {
				font-size: 16px;
				color: #333;
				font-weight: lighter
			}
			p {
				font-size: 13px;
				color: #999;
				margin-top: 5px;
			}
			img {
				width: 30px;
				margin-right: 10px;
			}
		}
	}
}
</style>
