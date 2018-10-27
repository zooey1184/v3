<template>
  <div class="clip_wrap" :style='{background: bg}'>
    <img class="after_img" @click='showModelFn' v-if='img' :src="img" alt="">
    <template v-else>
      <slot>
        <img class="clip_bg_photo" src="https://xinkouzi.oss-cn-shanghai.aliyuncs.com/c37a5a40-84db-11e8-a65b-d3fc43d7a229.png?303_216"/>
      </slot>
      <!-- <input type="file" ref='upload' @change='getFile'> -->
    </template>
    <!-- <div class="model_wrap flex align_items_center" v-if='showModel'>
      <span class="icon_span" @click='delImgFn'>
        <i class='icon iconfont icon-delete'></i>
      </span>
      <span class="icon_span" @click='cutImgFn'>
        <i class='icon iconfont icon-cut'></i>
      </span>
      <span class="close_icon" @click='showModel=false'>
        <i class='icon iconfont icon-close'></i>
      </span>
    </div> -->
    <input type="file" ref='upload' @change='getFile'>
  </div>
</template>

<script>
import { uploadImg } from '../../pages/loan-v3/api'
export default {
  data: ()=> ({
    img: null,
    showModel: false,
    showClipper: false
  }),
  props: {
    bg: {
      type: String,
      default: '#eef3fa'
    },
    width: {
      type: Number,
      default: 381*2
    },
    height: {
      type: Number,
      default: 900*2
    }
  },
  methods: {
    debounceFn(fn, wait) {
      let t = null
      return function() {
        if(t!==null) {
          clearTimeout(t)
        }
        t = setTimeout(fn, wait)
      }
    },
    getFile(e) {
      if(!e.target.files.length) return
			const file = e.target.files[0]
			this.fileType = file.type
			this.fileName = file.name
      const reader = new FileReader()
			reader.onload = ev => {
        const data = ev.target.result
        this.img = data
        console.log('onload')
        
        this.cutImgFn()
			}
			reader.readAsDataURL(file)
    },
    delImgFn() {
      let upload = this.$refs.upload
      upload.value = null
      this.img = null
      this.$emit('change', this.img)
      this.showModel = false
      
    },
    cutImgFn() {
      const self = this
      this.$cropper.show({
        img: self.img,
        showLoading: true,
        width: self.width,
        height: self.height,
        doneFn: (e)=> {
          this.img = e
          const base64 = e.replace(/^.*base64\,/, '')
          this.$load.show()
          uploadImg(base64, this.fileType, this.fileName).then(res => {
            this.$load.hide()
            this.showClipper = false
            this.$emit('change', this.img)
            this.$cropper.hide()
            this.showModel = false
          })
          
        },
        cancleFn: ()=> {
          this.$cropper.hide()
          this.delImgFn()
        }
      })
    },
    
    showModelFn() {
      this.showModel = true
      let t = null
      clearTimeout(t)
      t = setTimeout(()=> {
        this.showModel = false
      }, 2000)
    }
  },

}
</script>

<style lang="less">
.clip_wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // background: rgb(211, 226, 238);
  background: #eef3fa;
  border-radius: 5px;
  .clip_bg_photo {
    height: 100%;
    width: 100%;
    display: block;
    margin: 0 auto;
  }
  .after_img {
    height: 100%;
    display: block;
    margin: 0 auto;
  }
  input {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
  }
  .model_wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    top: 0;
    left: 0;
    z-index: 10;
    overflow: hidden;
    color: #fff;
    justify-content: center;
    .icon_span {
      margin: 0 20px;
    }
    .close_icon {
      position: absolute;
      top: 0;
      right: 0;
    }
    .icon_font {
      font-size: 20px;
    }
  }
}
.full {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
</style>
