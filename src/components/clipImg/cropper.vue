<template lang="">
	<div class='cropper--full' v-if="showClipper">
		<canvas ref="canvas" style="display: none;"></canvas>
		<div class="cropper_wrap" style="height: 100%;">
			<vue-cropper ref="cropper" 
				:output-size="0.8"
				:autoCrop="true"
				:autoCropWidth="width/2"
				:autoCropHeight="height/2"
				:src="img">
			</vue-cropper>
			<div class="options_pane flex align_items_center" style="bottom: 20px; ">
				<span @click="cancleFn">
					<!-- <i class='icon iconfont icon-back1'></i> -->
					取消
				</span>
				<span @click='doneFn'>
					<!-- <i class='icon iconfont icon-done'></i> -->
					确定
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import vueCropper from 'vue-cropperjs'
export default {
	data: ()=> ({
		showClipper: false,
		width: 381*2,
		height: 216*2,
		img: null,
		showLoading: false
	}),
	components: {
		vueCropper,
	},
	methods: {
		doneFn() {
			// if(this.showLoading){
			// 	try {
			// 		this.$load.show()
			// 	} catch (error) {
			// 		console.log(error)
			// 	}
			// }
			this.img = this.$refs.cropper.getCroppedCanvas().toDataURL()
			this.done(this.img)
		},
		done() {},
		cancleFn() {
			showClipper=false
		}
	}
}
</script>

<style lang="less">
.cropper--full {
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;
	z-index: 99;
	background: rgba(255,255,255,.8);
	.options_pane {
		background: rgba(255,255,255,.7);
		position: absolute;
		bottom: 0 !important;
		left: 0;
		width: 100%;
		height: 60px;
		span {
			display: inline-block;
			width: 100px;
			height: 30px;
			// background: #22ee33;
			text-align: center;
			line-height: 30px;
			margin: 0 10px;
			color: #4ba3eb;
			font-size: 16px;
		}
	}
	.cropper_wrap {
		img {
			min-height: 300px;
		}
	}
}
</style>
