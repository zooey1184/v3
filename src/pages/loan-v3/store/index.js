/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import router from '@/store/router'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		stopInfo: '',
		// stopInfo: '系统维护中，预计10月17号01:30前恢复',
		customers: [],
		loanForm: localStorage.loanForm ? JSON.parse(localStorage.loanForm) : {
			realName: '',
			mobile: '',
			idcard: '',
			idcardImg: '',
			loanYuan: '',
			zhimaScore: null,
			hasJob: null,
			// servePsw: '',
		},
		h5Config: {},
		yysLoading: false,
	},
	modules: {
    user,
    router
	},

	mutations: {
		setData(state, data) {
			for(const key in data) {
				if(key in state) state[key] = data[key]
			}
		}
	},
	actions: {
		showSuc() {
			Vue.mark.show({
				title: '',
				showClose: false,
				btn: [],
				msg: `
					<div class='mark_content_confirm'>
						<img class='title_img' src='https://xinkouzi.oss-cn-shanghai.aliyuncs.com/65d9dde0-858d-11e8-a65b-d3fc43d7a229.png?240_240' alt=''/>
						<h4 class='title_heder'>您的申请已成功</h4>
						<img style='width:100%' src='https://xinkouzi.oss-cn-shanghai.aliyuncs.com/d6d892a0-d8c3-11e8-8785-d130100656f0.png?769_287'/>
					</div>
				`,
				// confirmFn: ()=> {
				// 	console.log('confirm')
				// 	Vue.mark.hide()
				// 	// Vue.router.push('/home')
				// }
			})
		}
	}
})
