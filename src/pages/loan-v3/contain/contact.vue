<template>
  <form-list :width='100'>
    <p class="sub_title" style='margin-top: 0;'>紧急联系人1</p>
    <ceil title='姓名'>
      <input type="text" v-model='conForm.name1' placeholder="请填写联系人1姓名">
    </ceil>
    <ceil title='联系人电话'>
      <input type="tel" v-model='conForm.phone1' placeholder="请填写联系人1电话">
    </ceil>
    <p class="sub_title">紧急联系人2</p>
    <ceil title='姓名'>
      <input type="text" v-model='conForm.name2' placeholder="请填写联系人2姓名">
    </ceil>
    <ceil title='联系人电话'>
      <input type="tel" v-model='conForm.phone2' placeholder="请填写联系人2电话">
    </ceil>
    <slot></slot>
  </form-list>
</template>

<script>
import { mapState } from 'vuex'
import { ruleMap, checkInput } from '@/assets/rule'
import api from '../api'
import { setTimeout } from 'timers';

export default {
  computed: {
		...mapState({
			form: s => s.loanForm,
			h5Config: s => s.h5Config,
			yysLoading: s => s.yysLoading,
		})
	},
	data() {
		return {
			conForm: {
				name1: '',
				phone1: '',
				name2: '',
				phone2: '',
			},
			rules: {
				name1: {
					label: '联系人1姓名',
				},
				phone1: {
					label: '联系人1电话',
				},
				name2: {
					label: '联系人2姓名',
				},
				phone2: {
					label: '联系人2电话',
				},
			},
		}
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
		async onSubmit(callback=function(){}) {
			const msg = checkInput(this.conForm, this.rules)
			if(msg && !Param.test) {
				this.$toast.show(msg)
				return false
			}
			const { name1, name2, phone1, phone2 } = this.conForm
			this.form.contact1 = [name1, phone1].join(' ')
			this.form.contact2 = [name2, phone2].join(' ')
			console.log(this.form)

			api.postOrder({
				id: this.form.id,
				contact1: this.form.contact1,
				contact2: this.form.contact2,
				note: `2(完成联系人)`,
			})
			callback()
			return true
		},
	},
	mounted() {
		setTimeout(()=> {
			this.$emit('reGetRect')
		}, 50)
	}
}
</script>
