<template>
	<div class="bd-round">
		<div v-if="isDone" class="ta-c" style="padding: 30px 0;">
			<img src="https://xinkouzi.oss-cn-shanghai.aliyuncs.com/65d9dde0-858d-11e8-a65b-d3fc43d7a229.png?240_240"
				style="width: 80px;">
			<div class="fz-30 mt-10">资料提交成功！</div>
			<div class="mt-20 fz-13">
				您的资料已经提交至
				<span class="link">{{ checkLoans.map(it =>it.title).join('、') }}</span> ，
				<p>请耐心等待审核通知，</p>
				<p>借款服务将由商家提供。</p>
			</div>
		</div>

		<div v-else-if="customers.length">
			<div class="ta-c">
				借款成功率：<span style="font-size: 30px;">{{ sucPerc || initPerc }}%</span>
			</div>
			<!-- <group title="请选择申请平台(多选)" label-width="90px">
				<cell v-for="(item, i) in customers" :key="i" @click.native="checkItem(item)" style="padding-right: 0;">
					<img :src="item.imgUrl.toWidth(150)" class="max-img d-b" slot="icon" style="margin-right: 10px;">
					<div slot="title">{{ item.title }}</div>
					<img :src="item.check ? 'https://xinkouzi.oss-cn-shanghai.aliyuncs.com/cd720040-8592-11e8-a65b-d3fc43d7a229.png' : 'https://xinkouzi.oss-cn-shanghai.aliyuncs.com/c294c810-8592-11e8-a65b-d3fc43d7a229.png?36_36'" style="width: 20px;">
				</cell>
			</group> -->
		</div>
		<div v-else>
      <model-pane v-model='card'>
        <alert-contain>
          <form-list :width='90'>
            <ceil title='借款人'>
              <input type="text" readonly :value="form.realName">
            </ceil>
            <ceil title='欲借额度'>
              <input type="text" readonly :value="form.loanYuan + '元'">
            </ceil>
            <ceil title='芝麻分'>
              <input type="text" readonly :value="form.zhimaScore">
            </ceil>
          </form-list>
        </alert-contain>
      </model-pane>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import alertContain from '@/components/alertContain/alertContain.vue'
import api from '@/api'

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
  watch: {
    isDone: function(n) {
      if(!n && !this.customers.length) {
        this.card = true
      }else {
        this.card = false
      }
    },
    'customers.length'(n) {
      if(!n && !this.isDone) {
        this.card = true
      }else {
        this.card = false
      }
    }
  },
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
				this.$emit('done')
			})
		},
	}
}
</script>
