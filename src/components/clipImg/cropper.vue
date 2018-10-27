<template lang="">
<transition name='fade'>
	<div class='cropper--full' v-if="showContent">
		<canvas ref="canvas" style="display: none;"></canvas>
			<div class="cropper_wrap" style="height: 100%;">
				<vue-cropper ref="cropper" 
					:output-size="0.6"
					:autoCrop="true"
					:containerStyle='{height: `${wraph}px`}'
					:view-mode='2'
					:aspectRatio="width/height"
					:src="img">
				</vue-cropper>
				<div class="options_pane flex align_items_center" style="bottom: 20px; ">
					<span @click='rotate(-90)'>
						<i class='icon iconfont icon-nishizhenxuanzhuan'></i>
					</span>
					<span @click='rotate(90)'>
						<i class='icon iconfont icon-shunshizhenxuanzhuan'></i>
					</span>
					<span @click="cancleFn">
						取消
					</span>
					<span class='confirm_btn' @click='doneFn'>
						确定
					</span>
				</div>
			</div>
	</div>
		</transition>
</template>

<script>
import vueCropper from 'vue-cropperjs'
import {clientRect} from '@/common/js/base'

export default {
	data: ()=> ({
		showClipper: false,
		showContent: false,
		width: 381*2,
		height: 500*2,
		img: null,
		showLoading: false,
		wraph: 500
	}),
	components: {
		vueCropper,
	},
	watch: {
		showClipper: function(n) {
			if(n) {
				setTimeout(()=> {
					this.showContent = true
				}, 150)
			}else {
				this.showContent = false
			}
		}
	},
	methods: {
		doneFn() {
			this.$load.show()
			this.img = this.$refs.cropper.getCroppedCanvas().toDataURL()
			this.done(this.img)
		},
		done() {},
		cancleFn() {
			showClipper=false
		},
		rotate(n) {
			this.$refs.cropper.rotate(n);
		},
	},
	mounted() {
		let r = clientRect()
		this.wraph = r.h
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
		background: rgba(0,0,0,.3);
		position: absolute;
		bottom: 0 !important;
		left: 0;
		width: 100%;
		height: 60px;
		justify-content: center;
		span {
			display: inline-block;
			width: 60px;
			height: 30px;
			// background: #22ee33;
			text-align: center;
			line-height: 30px;
			margin: 0 10px;
			// color: #4ba3eb;
			color: #fff;
			font-size: 16px;
			.icon {
				font-size: 30px;
			}
		}
		.confirm_btn {
			background: #fff;
			color: #333;
			padding: 0 10px;
			border-radius: 5px;
			&:active {
				opacity: .8;
			}
		}
	}
	.cropper_wrap {
		width: 100%;
		height: 100%;
		position: absolute;
		img {
			min-height: 300px;
		}
	}
}
</style>
