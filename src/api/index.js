
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
		xhr.open('POST', api_pre + api_ver + '/user/upload/img', true)
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
