<template>
	<div>
		<div class="d-flex space-btw">
			<div style="width: 50%;" class="ta-c">
				<img :src="imgSrc" class="max-w100" style="max-height: 80px;">
			</div>
			<div @click="pickImg" class="pos-r" style="width: 40%;">
				<img src="https://xinkouzi.oss-cn-shanghai.aliyuncs.com/c37a5a40-84db-11e8-a65b-d3fc43d7a229.png?303_216"
					class="w100 d-b"/>
				<input v-if="showInput && !showClipper" type="file" accept="image/*"
					class="pos-mask" style="opacity: 0;" @change="onInput">
			</div>
		</div>

		<canvas ref="canvas" style="display: none;"></canvas>
		<!-- https://github.com/vivialex/vue-imageClipper -->
		<!-- <image-clipper ref="crop"
			v-show="showClipper"
			v-if="!!chooseImgUrl"
			class="pos-mask"
			:img="chooseImgUrl"
			:clipper-img-width="width"
			:clipper-img-height="height"
			@cancel="showClipper = false"
			@beforeOk="beforeOk"
			@ok="onOk">
		</image-clipper> -->
		<div class="pos-mask" v-show="showClipper" v-transfer-dom>
			<div class="pos-center w100" style="height: 100%;">
				<vue-cropper ref="cropper"
					:output-size="0.8"
					:autoCrop="true"
					:autoCropWidth="width/2"
					:autoCropHeight="height/2"
					:img="chooseImgUrl">
				</vue-cropper>
				<div class="ta-c x-center white w100" style="bottom: 20px; ">
					<span class="iconfont icon-rot_b90 fz-30 btn-touch" @click="setCropper('rotateLeft')"></span>
					<span class="iconfont icon-rot_f90 fz-30 btn-touch ml-15" @click="setCropper('rotateRight')"></span>
					<x-button :mini="true" style="vertical-align: super; margin-left: 30px;" @click.native="getCropData">完成</x-button>
					<span class="d-ib va-s fz-14 ml-15 pd-5" @click="showClipper = false">取消</span>
				</div>
			</div>
		</div>

		<!-- <actionsheet v-transfer-dom v-model="showChoose" :menus="menus" show-cancel @on-click-menu="onChoose"></actionsheet> -->
	</div>
</template>

<script>
import imageClipper from './image-clipper'
import { uploadImg } from '@/api'
import vueCropper from 'vue-cropper'

export default {
	components: {
		imageClipper,
		vueCropper,
	},
	data() {
		return {
			chooseImgUrl: '',
			showInput: true,
			showClipper: false,
			fileType: '',
			fileName: '',
			showChoose: false,
			menus: {
				camera: '拍照',
				photo: '从相册选取',
			}
		}
	},
	mounted() {
		// if(Param.bv > 3) this.showInput = false
		// console.log(this.width, this.height)
	},
	computed: {
		placeImgWidth() {
			return this.placeImgHeight * this.width / this.height
		},
		imgSrc() {
			return this.value || this.src
		},
	},
	props: {
		value: String,
		isCrop: {
			type: Boolean,
			default: true,
		},
		src: {
			type: String,
			default: 'https://xinkouzi.oss-cn-shanghai.aliyuncs.com/7a383b90-84db-11e8-a65b-d3fc43d7a229.png?381_216',
		},
		placeImgHeight: {
			type: Number,
			default: 50,
		},
		width: {
			type: Number,
			default: 381*2,
		},
		height: {
			type: Number,
			default: 216*2,
		},
	},
	methods: {
		getCropData() {
			this.$refs.cropper.getCropData((data) => {
				this.showClipper = false
				this.onOk(data)
			})
		},
		setCropper(act) {
			const fn = this.$refs.cropper[act]
			if(fn) fn()
		},
		onChoose(key) {
			if(key == 'cancel') return
			this.$execNative('pickImage', data => {
				if(Param.bv > 3) {
					console.log(data)
					if(data === true) this.$loading()
					else {
						this.$loading.close()
						if(typeof data == 'object' && data.url) data = data.url
						if(/^http/.test(data)) {
							this.$emit('input', data)
						} else {
							//this.$alert('上传失败')
						}
					}
				} else {
					this.fileName = Date.now() + '.png'
					this.iosAppImg(data.body)
				}
			}, {
				isCrop: Param.plat == 2 ? (this.isCrop ? 1 : 0) : this.isCrop,
				width: this.width,
				height: this.height,
				camera: 0,
			})
		},
		pickImg() {
			if(this.showInput) return
			this.onChoose('photo')
      this.$sheet.show({
        list: [{text: '拍照', value: 'camera'}, {text: '从相册选取', value: 'photo'}],
        selectFn: (item, index)=> {
          this.$sheet.hide()
          console.log(item);
          this.onChoose('photo')
        },
      })
			// this.showChoose = true
		},
		onInput(e) {
			if(!e.target.files.length) return
			const file = e.target.files[0]
			this.fileType = file.type
			this.fileName = file.name
			const reader = new FileReader()
			reader.onload = ev => {
				const data = ev.target.result
				if(!this.isCrop) return this.onOk(data)
				this.chooseImgUrl = data
				this.$nextTick(() => {
					// document.body.appendChild(this.$refs.crop.$el)
					this.showClipper = true
				})

			}
			reader.readAsDataURL(file)
		},
		beforeOk() {
			this.$loading()
		},
		onOk(data) {
			// console.log(data.length)
			// this.$alert(`<img src="${data}" class="w100"/>`)
			const base64 = data.replace(/^.*base64\,/, '')
			this.$loading()
			uploadImg(base64, this.fileType, this.fileName).then(res => {
				this.$loading.close()
				this.showClipper = false
				this.$emit('input', res)
				this.$emit('change', res)
			})

		},
		// 图片canvas压缩
		iosAppImg(src) {
			const canvas = this.$refs.canvas
			const image = new Image()
			image.onload = () => {
				if(image.height > this.height) {
					image.width *= this.height / image.height
            		image.height = this.height
				}
				const ctx = canvas.getContext("2d")
				ctx.clearRect(0, 0, canvas.width, canvas.height)
				canvas.width = image.width
				canvas.height = image.height
				ctx.drawImage(image, 0, 0, image.width, image.height)
				this.imgsrc = canvas.toDataURL()
				console.log(this.imgsrc.length/1024+'k')
				this.onOk(this.imgsrc)
			}
			image.src = 'data:image/png;base64,' + src
		},
	}
}
</script>
