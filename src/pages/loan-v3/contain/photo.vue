<template>
  <div>
    <div class="photo__wrap flex align-items-center">
      <div class="photo_left">
        <div class="top">
          <clip-img v-model="idcardImgUrl_1" :width='600*2' :height='351*2'>
            <div>
              <img class="photo_idcard" src="../assets/idc-1.png" />
              <p class="idcard_text">上传身份证人像面</p>
            </div>
          </clip-img>
        </div>
        <div class="bottom">
          <clip-img v-model='idcardImgUrl_2' :width='600*2' :height='361*2'>
            <div>
              <img class="photo_idcard" src="../assets/idc-2.png" />
              <p class="idcard_text">上传身份证国徽面</p>
            </div>
          </clip-img>
        </div>
      </div>
      <div class="photo_right">
        <clip-img v-model="idcardImgUrl_3" :width='289*2' :height='381*2'>
          <div class="photo_wrap_content">
            <img class="photo_header" src="../assets/idc-3.png" />
            <p class="idcard_handle_text">上传手持身份证照</p>
          </div>
        </clip-img>
      </div>
    </div>
    <img class="photo_full" :style='{marginTop: "10px"}' src="../assets/idc-tip.png" alt="">
    <slot></slot>
  </div>
</template>

<script>
import clipImg from '@/components/clipImg'

import { mapState } from 'vuex'
import api from '../api'

export default {
  data: ()=> ({
    idcardImgUrl_1: null,
    idcardImgUrl_2: null,
    idcardImgUrl_3: null
  }),
  components: {
    clipImg
  },
  computed: {
		...mapState({
			form: s => s.loanForm,
			h5Config: s => s.h5Config,
			yysLoading: s => s.yysLoading,
		})
  },
  methods: {
    onSubmit(callback=function(){}) {
      // if(this.progress == 1) {
        let msg = null
				if(!Global.getUrlData().pass) {
          if(!this.idcardImgUrl_1) msg = '请上传身份证正面照'
          else if(!this.idcardImgUrl_2) msg = '请上传身份证背面照'
          else if(!this.idcardImgUrl_3) msg = '请上传手持身份证照'
          
        }
        if(msg && !Param.test) return this.$toast.show(msg)
        this.form.idcardImg = [this.idcardImgUrl_1, this.idcardImgUrl_2, this.idcardImgUrl_3].join(' ')

				api.postOrder({
          id: this.form.id,
          idcardImg: this.form.idcardImg,
          note: '5(完成证件照)'
        })
				
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
  },
  mounted() {
    setTimeout(()=> {
      this.$emit('reGetRectP')
    }, 250)
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
      height: 85px;
      position: relative;
      margin-bottom: 10px;
    }
    .bottom {
      width: 100%;
      height: 85px;
      position: relative;
    }
  }
  .photo_right {
    width: 47%;
    position: relative;
    height: 180px;
    margin-left: 0;
  }
}
.photo_header {
  width: 60%;
  display: block;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.photo_wrap_content {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
.photo_idcard {
  width: 48%;
  display: block;
  margin: 10px auto;
}
.idcard_text {
  position: absolute;
  bottom: 8px;
  font-size: 13px;
  width: 100%;
  text-align: center;
  color: #999;
}
.idcard_handle_text {
  position: absolute;
  bottom: 18px;
  font-size: 13px;
  width: 100%;
  text-align: center;
  color: #999;
}
.idcard_handle {
  position: absolute;
  bottom: 8px;
  font-size: 13px;
  width: 100%;
  text-align: center;
  color: #999;
}
.photo_full {
  width: 100%;
}
</style>
