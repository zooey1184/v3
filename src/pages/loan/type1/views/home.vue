<template>
<page bgWrap='#fff'>
  <div class="home_page">
    <img class="home_img" src="../../assets/type1_index.jpg" alt="">
    <div class="login_pane">
      <div class="item flex align_items_center">
        <input class='full_item' type="tel" placeholder='请输入手机号'  v-model="form.mobile">
      </div>
      <div class="item flex align_items_center">
        <input type="text" class='part' style='width: 140%' placeholder='请输入短信验证码' v-model="form.vcode" ref="vcode">
        <div class="count bg1 btn">
          <!-- <count-down></count-down> -->
          <code-btn></code-btn>
        </div>
      </div>
      <div class="item flex align_items_center">
        <button class="full_item bg1 border1 btn" @click='login'>立即借钱</button>
      </div>
      <div class="protocol">
        <span>点击即同意</span>
        <span style='color: #1bdaae'>《服务协议》</span>
      </div>
    </div>
  </div>
</page>
</template>

<script>
import countDown from '@/components/countdown'
import codeBtn from '@/components/codeBtn/index.vue'
import api from '@/pages/loan/api'
import { checkInput } from '@/assets/rule'
import { mapState } from 'vuex'

export default {
  name: 'home-page',
  data: ()=> ({
    isHome: true
  }),
  computed: {
		...mapState({
			form: s => s.user.loginForm,
			user: s => s.user.info,
			loanForm: s => s.loanForm,
			h5Config: s => s.h5Config,
			stopInfo: s => s.stopInfo,
		}),
		logoUrl() {
			return this.h5Config.logo || 'https://xinkouzi.oss-cn-shanghai.aliyuncs.com/c67cb910-ba76-11e8-9379-8d709a5b1174.png?783_246'
		},
	},
  components: {
    countDown,
    codeBtn
  },
  methods: {
    async login() {
			// if(!this.isAgree) return this.$toast('请先同意协议')
			// return this.$router.push('/apply')
			const msg = checkInput(this.form)
			if(msg) return this.$toast.show(msg)
			this.$load.show('验证中')
			const params = {
				vcode: this.form.vcode,
				refer: Param.refer,
				cid: this.h5Config.cid,
			}
			const res = await this.$http.get('v6/user/login/'+this.form.mobile, { params })
			this.form.vcode = ''
			localStorage[window.passkey] = res.body.passkey
			// await this.$store.dispatch('user/getInfo')
			localStorage.mobile = this.form.mobile
			this.$load.hide()
			this.$toast.show({
        msg: '验证成功',
        bg: 'rgba(255,255,255,.7)'
      })
			this.onLoginSuc()
    },
    onLoginSuc() {
			this.loanForm.mobile = localStorage.mobile
			if(this.isHome) {
        window.directionPage = 'forward'
        this.$router.replace('/basic')
      } else {
        this.$router.back()
      }
		},
  },
  mounted() {
		if(this.stopInfo) return
		if(Param.refer) localStorage.url_refer = Param.refer
		
		if(this.$route.path == '/login') this.isHome = false
		else if(localStorage[passkey]) {
			this.$load.show()
			this.$http.get('v6/user/info').then(res => {
				localStorage.mobile = res.body.mobile
				this.onLoginSuc()
				this.$load.hide()
			})
		}
	},
}
</script>

<style lang='less'>
.home_img {
  width: 100%;
}
.count {
  padding: 5px 10px;
  flex-grow: 1;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
}
.item {
  width: 80%;
  margin: 15px auto;
  position: relative;
  height: 45px;
  .radius {
    border-radius: 30px;
  }
  .full_item {
    width: 100%;
    height: 100%;
  }
  .part {
    width: 100%;
    height: 100%
  }
  input {
    .radius;
    border: 1px solid #eee;
    outline: none;
    box-shadow: 0 2px 5px #eee;
    padding: 0 10px;
    font-size: 15px;
    background: #fff;
  }
}
.protocol {
  padding-left: 45px;
  font-size: 12px;
}
</style>
