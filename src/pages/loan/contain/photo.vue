<template>
  <div>
    <div class="photo__wrap flex align-items-center">
      <div class="photo_left">
        <div class="top">
          <clip-img @change='change1'></clip-img>
        </div>
        <div class="bottom">
          <clip-img @change='change2'></clip-img>
        </div>
      </div>
      <div class="photo_right">
        <clip-img @change='change3'></clip-img>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import clipImg from '@/components/clipImg'
import warning from '@/pages/loan/assets/warning.png'

export default {
  data: ()=> ({
    idcardImgUrl_1: null,
    idcardImgUrl_2: null,
    idcardImgUrl_3: null
  }),
  components: {
    clipImg
  },
  methods: {
    change1(e) {
      this.idcardImgUrl_1 = e
    },
    change2(e) {
      this.idcardImgUrl_2 = e
    },
    change3(e) {
      this.idcardImgUrl_3 = e
    },
    onSubmit(callback=function(){}) {
      // if(this.progress == 1) {
        let msg = null
				if(!this.idcardImgUrl_1) msg = '请上传身份证正面照'
				else if(!this.idcardImgUrl_2) msg = '请上传身份证背面照'
				else if(!this.idcardImgUrl_3) msg = '请上传手持身份证照'
				if(msg && !Param.test) return this.$toast.show(msg)
				this.form.idcardImg = [this.idcardImgUrl_1, this.idcardImgUrl_2, this.idcardImgUrl_3].join(' ')

				const ageOut = (this.form.age > 45 || this.form.age < 19) && !this.h5Config.cid
				this.form.note = `完成1(基础信息)`
				if(ageOut) {
					this.form.note = '完成1(年龄不符)'
					this.form.state = -3
				}
				if(!this.form.id) api.postOrder(this.form).then(res => {
					console.log(res.body)
					this.form.id = res.body.id
				})
				if(ageOut) {
          // return this.$toast.show('初审未通过：年龄不符')
          this.$mark.show({
            title: '',
            btn: [],
            msg: `
              <div class='c-mark-content'>
                <img class='title_img' src=${warning} alt='warning'/>
                <p class='desc_tip'>
                  初审未通过：年龄不符
                </p>
                
              </div>
            `,
            closeFn: ()=> {
              this.$mark.hide()
            }
          })
          return 
				}
				localStorage.loanForm = JSON.stringify(this.form)
        if(callback) {
          callback()
        }
				return true
			// }

			// this.progress = 1
			if(this.form.idcard == this.myIdcard) {
				const arr = this.form.idcardImg.split(/\s/)
				this.idcardImgUrl_1 = arr[0]
				this.idcardImgUrl_2 = arr[1]
				this.idcardImgUrl_3 = arr[2]
			}
    }
  }
}
</script>

<style lang="less">
.photo__wrap {
  position: relative;
  width: 100%;
  justify-content: flex-start;
  box-sizing: border-box;
  .photo_left {
    width: 47%;
    position: relative;
    margin-right: 3%;
    .top {
      width: 100%;
      height: 80px;
      position: relative;
      margin-bottom: 10px;
    }
    .bottom {
      width: 100%;
      height: 80px;
      position: relative;
    }
  }
  .photo_right {
    width: 47%;
    position: relative;
    height: 170px;
    margin-left: 0;
  }
}
</style>
