/* eslint-disable */
import Vue from 'vue'

export default {
	namespaced: true,
	state: {
		loginSta: -1, // 0未登录 1已登录
		info: {},
		loginForm: {
			mobile: '',
			vcode: '',
		},
	},

	mutations: {
		setInfo(sta, data) {
			sta.myFollowUids = data.myFollowUids || []
			data.myFollowUids = undefined
			sta.info = data
			sta.loginForm.mobile = data.mobile
			sta.totalCoin = data.totalCoin || 0
		},
		setLoginSta(sta, val) {
			sta.loginSta = val
		},
	},
	actions: {
		async getInfo({ commit }) {
			try {
				const res = await Vue.http.get('user/info')
				commit('setInfo', res.body)
				commit('setLoginSta', 1)
			}
			catch(e) {
				if(e.status == 404) localStorage[window.passkey] = ''
				commit('setLoginSta', 0)
			}
		},
		async logout({ commit, state }) {
			await Vue.http.get('user/logout')
			localStorage[window.passkey] = ''
			commit('setInfo', {
				mobile: state.info.mobile,
			})
			commit('setLoginSta', 0)
		},
	}
}