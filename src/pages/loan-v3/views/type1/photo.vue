<template>
  <page>
    <div>
      <div class="top_page bg1">
        <p class="title">贷贷贷</p>
        <v-step :len='5' :active='4'></v-step>
      </div>
      <div class="card_wrap">
        <card title='身份证拍照' v-model='card'>
          <img style='width: 30px;' src="../../assets/b5.png" alt="">
          <photo slot='contain' ref='photo'></photo>
        </card>
        <button class="btn bg1" @click='submitFn'>下一步</button>
      </div>
    </div>
  </page>
</template>

<script>
import photo from '../../contain/photo.vue'
import warning from '../../assets/warning.png'
import { mapState } from 'vuex'
import api from '../../api'

export default {
  components: {
    photo,
  },
  data: ()=> ({
    card: false
  }),
  computed: {
		...mapState({
			form: s => s.loanForm,
			h5Config: s => s.h5Config,
			yysLoading: s => s.yysLoading,
		})
	},
  methods: {
    async getCustomers() {
      if(this.h5Config.cid) return
      this.$load.show()
			try {
        const res = await this.$http.get('v6/credit/apply/auth/loan-choices', {
          params: {
            zhimaScore: this.form.zhimaScore,
            idcard: this.form.idcard,
          }
        })
        this.$load.hide()
        this.$store.commit('setData', {
          customers: res.body.map(it => {
            it.check = true
            return it
          }),
        })
        this.$router.replace('/result')
      } catch (error) {
        api.postOrder({
          id: this.form.id,
          note: null
        }).then(res=> {
          this.$store.dispatch('showSuc')
        }, e=> {
          console.log(e)
          this.$toast.show(e.body.msg)
        })
      }
		},
    submitFn() {
      let photo = this.$refs.photo
      
      let callback = ()=> {
        // this.$router.push("/zhima")
        this.$mark.show({
					title: '请确认您的身份信息',
					btn: [{text: '确定', type: 'confirm'}],
					msg: `
            <div class='mark_content_confirm'>
              <p style='color: #238FE4'>一经提交无法修改，请仔细核对</p>
              <ul>
                <li>
                  本人姓名：${this.form.realName}
                </li>
                <li>
                  身份证号：${this.form.idcard}
                </li>
                <li>
                  紧急联系人1：${this.form.contact1}
                </li>
                <li>
                  希望额度：${this.form.loanYuan}
                </li>
              </ul>
						</div>
					`,
					closeFn: ()=> {
						this.$mark.hide()
          },
          confirmFn: ()=> {
            this.$mark.hide()
            this.getCustomers()
          }
				})
      }
      photo.onSubmit(callback)
    }
  },
  mounted() {
    setTimeout(()=> {
      this.card = true
    }, 500)
    // this.$store.dispatch('showSuc')
  }
}
</script>

<style lang="less">
.mark_content_confirm {
  text-align: left;
  padding: 0 6px;
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

