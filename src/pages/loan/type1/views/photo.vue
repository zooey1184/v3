<template>
  <page>
    <div>
      <div class="top_page bg1">
        <p class="title">贷贷贷</p>
        <v-step :len='5' :active='4'></v-step>
      </div>
      <div class="card_wrap">
        <card title='身份证拍照' v-model='card'>
          <photo slot='contain' ref='photo'></photo>
        </card>
        <button class="btn bg1" @click='submitFn'>下一步</button>
      </div>
    </div>
  </page>
</template>

<script>
import photo from '../../contain/photo.vue'
import warning from '@/pages/loan/assets/warning.png'

export default {
  components: {
    photo,
  },
  data: ()=> ({
    card: true
  }),
  methods: {
    submitFn() {
      let photo = this.$refs.photo
      // let callback = ()=> {
        // this.$router.push("/zhima")
        this.$mark.show({
					title: '请确认您的身份信息',
					btn: [{text: '确定', type: 'confirm'}],
					msg: `
            <div class='mark_content_confirm'>
              <p>一经提交无法修改，请仔细核对</p>
              <ul>
                <li>
                  本人姓名：贷贷贷
                </li>
                <li>
                  身份证号：33333333
                </li>
                <li>
                  紧急联系人1：是是是 12121212
                </li>
                <li>
                  希望额度：15000
                </li>
              </ul>
						</div>
					`,
					closeFn: ()=> {
						this.$mark.hide()
          },
          confirmFn: ()=> {
            console.log('confirm')
            this.$mark.hide()
            this.$router.push('/result')
          }
				})
      // }
      // photo.onSubmit(callback)
    }
  }
}
</script>

<style lang="less">
.mark_content_confirm {
  text-align: left;
  padding: 0 20px;
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

