/* eslint-disable */
export const ruleMap = {
	imgcode: /^[0-9a-zA-Z]{4,6}$/,
	vcode: /^\d{3,6}$/,
	idcard: /^\d{14,17}\S$/,
	nickname: /^[\w|\d]{4,16}$/,
	psw: /^[\w!@#$%^&*.]{6,16}$/,
	mobile: /^1\d{10}$/,
	zwname: /^[\u4e00-\u9fa5 ]{2,10}$/,
	cardnum: /^\d{10,19}$/,
	mail: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
	qq: /^[1-9]\d{4,14}$/
}

export const defRules = {
	mobile:	{
		label: '手机号',
		reg: ruleMap.mobile,
	},
	vcode: {
		label: '验证码',
		reg: ruleMap.vcode,
}
}

export function checkInput(form, rules = defRules) {
	let msg = ''
	for(const key in form) {
		if(msg) break;
		const val = form[key];
		const rule = rules[key];
		if(!rule) continue;
		if(!val) msg = rule.hint || `请输入${rule.label}`;
		else if(rule.reg && !rule.reg.test(val)) msg = rule.regHint || `请输入正确的${rule.label}`;
		else if(rule.checkFn) msg = rule.checkFn(val)
	}
	return msg;
}
