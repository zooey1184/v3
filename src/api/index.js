/* eslint-disable */
import Vue from 'vue'
import VueResource from 'vue-resource'
// import { md5 } from 'vux'
import router from '../router'

Vue.use(VueResource)

const http = Vue.http

let api_pre =  location.origin + '/api/'
if (!location.origin.match(/^http/)) api_pre = 'https://h5.xinkouzi365.com/api/'
window.api_ver = 'v6/'
window.passkey = 'passkey' + location.pathname.replace(/\W/g, '_')

http.interceptors.push((req, next) => {
	if (!/http/.test(req.url)) {
		req.url = api_pre + (/^v[1-9]/.test(req.url) ? '' : api_ver) + req.url
	}
	req.params._t = Date.now()
	req.headers.set('X-Manage', '2')
	req.headers.set('X-Auth', localStorage[window.passkey])
	req.headers.set('X-Device-Id-v2', localStorage.deviceId || '101')

	next (res => {
		var body = res.body
		if (!res.ok) {
			Vue.$load.hide()
			console.log(body)
			if (res.status == 401) {
				router.push('/')
			} else if (body.msg && res.status != 404) {
				if(body.msg.length > 10) {
					// Vue.$vux.alert.show({
					// 	content: body.msg,
					// })
				} else {
					Vue.$toast.show(body.msg)
				}
			}
		}
	})
})

export default {
	postOrder(form) {
		return http.post('v6/credit/apply/auth/loan', form)
	},
	logRoute(form) {
		form.channel = Param.channel
		return http.post('app/log/route', form).then(res => res.body)
	},
}

export function uploadImg(base64, type = '', filename = 'xx.png') {
	const boundary = 'ohaiimaboundary'
	const body = [
		'--' + boundary,
		`Content-Disposition: form-data; name="file"; filename="${filename}"`,
		'Content-Type: ' + (type || 'image/png'),
		'',
		atob(base64),
		'--' + boundary + '--'
	].join('\r\n')
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		xhr.open('POST', api_pre + api_ver + 'app/upload/img', true)
		xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary)
		xhr.sendAsBinary(body)
		xhr.onreadystatechange = () => {
			if(xhr.readyState == 4) {
				let data = xhr.responseText
				if(xhr.status == 200) resolve(data)
				else reject(data)
			}
		}
	})
}
