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
	}
})
