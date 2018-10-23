<template>
	<div class="bd-round">
		<!-- <div v-if="isDone" class="ta-c" style="padding: 30px 0;">
			<img src="https://xinkouzi.oss-cn-shanghai.aliyuncs.com/65d9dde0-858d-11e8-a65b-d3fc43d7a229.png?240_240"
				style="width: 80px;">
			<div class="fz-30 mt-10">资料提交成功！</div>
			<div class="mt-20 fz-13">
				您的资料已经提交至
				<span class="link">{{ checkLoans.map(it =>it.title).join('、') }}</span> ，
				<p>请耐心等待审核通知，</p>
				<p>借款服务将由商家提供。</p>
			</div>
		</div> -->

		<div v-if="customers.length">
			<div class="ta-c">
				借款成功率：<span style="font-size: 30px;">{{ sucPerc || initPerc }}%</span>
			</div>
			<p>根据所提供的资料，已匹配以下产品</p>
			<div class="loan_item" v-for="(item, i) in customers" :key="i" @click.native="checkItem(item)" style="padding-right: 0;">
				<div class="item_left_img">
					<img :src="item.imgUrl.toWidth(150)" class="max-img d-b" slot="icon" style="margin-right: 10px;">
				</div>
				<div class="item_middle_text">
					{{item.title}}
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
      card: true
		}
	},
  // watch: {
  //   isDone: function(n) {
  //     if(!n && !this.customers.length) {
  //       this.card = true
  //     }else {
  //       this.card = false
  //     }
  //   },
  //   'customers.length'(n) {
  //     if(!n && !this.isDone) {
  //       this.card = true
  //     }else {
  //       this.card = false
  //     }
  //   }
  // },
  components: {
    alertContain
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
			this.$load.show()
			api.postOrder(this.form).then(res => {
				this.$load.hide()
				this.isDone = true
				this.$mark.show({
					title: '',
					btn: [{text: '确定', type: 'confirm'}],
					msg: `
						<div class='mark_content_confirm'>
							<img class='title_img' src='https://xinkouzi.oss-cn-shanghai.aliyuncs.com/65d9dde0-858d-11e8-a65b-d3fc43d7a229.png?240_240' alt=''/>
							<h4 class='title_heder'>您的申请已成功</h4>
              <p>24小时放款，短信通知到账</p>
						</div>
					`,
					closeFn: ()=> {
						this.$mark.hide()
          },
          confirmFn: ()=> {
            console.log('confirm')
            this.$mark.hide()
            this.$router.push('/result')
          }
				})
				this.$emit('done')
			})
		},
	}
}
</script>

<style lang="less">
.mark_content_confirm {
  text-align: left;
  padding: 0 20px;
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
</style>
