<template>
	<div>
		<h3>自定义事件</h3>
		<link-component></link-component>
		<div class="borderC" v-mousewheel="mousewheelFn">
			兼容FF滚轮事件
		</div>
		<div class="borderC">
			<span v-move="moveFn" class="moveS" :style="styleObject">拖拽事件</span>
		</div>
		<div v-touch:press="pressFn" v-touch:swiperight="swiperightFn" v-touch:swipeleft="swipeleftFn" v-touch:swipeup="swipeupFn" v-touch:swipedown="swipedownFn" class="borderC">
			<span>press</span>
			<span>swiperight</span>
			<span>swipeleft</span>
			<span>swipeup</span>
			<span>swipedown</span>
		</div>
	</div>
</template>
<script>
	/*common封装的ajax,cookie,本地存储*/
	import $ from 'assets/js/common';
	export default {
		name: 'customEvent',
		components: { //组件
		},
		data() {
			return {
				styleObject: {
					left: null,
					top: null
				},
			}
		},
		computed: { //计算
		},
		props: {},
		methods: { //方法
			pressFn() {
				this.swipe = 'press'
				console.log('press')
			},
			swiperightFn() {
				this.swipe = 'swiperight'
				console.log('swiperight')
			},
			swipeleftFn() {
				this.swipe = 'swipeleft'
				console.log('swipeleft')
			},
			swipeupFn() {
				this.swipe = 'swipeup'
				console.log('swipeup')
			},
			swipedownFn() {
				this.swipe = 'swipedown'
				console.log('swipedown')
			},
			mousewheelFn(e) {
				console.log(e.down)
				//return false;不阻击默认行为
			},
			moveFn(e) {
				this.styleObject.left = $.css(e, 'left') + e.pageXc + 'px';
				this.styleObject.top = $.css(e, 'top') + e.pageYc + 'px';
			},
		},
		mounted: function() { //类似于回调函数(初次实例化完成后调用)

		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	li {
		display: inline-block;
		margin: 0 10px;
	}
	
	a {
		color: #42b983;
	}
	
	.borderC {
		min-height: 60px;
		line-height: 60px;
		border: 1px solid #CCCCCC;
		margin: 10px;
		position: relative;
	}
	
	.moveS {
		position: absolute;
		top: 0;
		left: 50%;
		margin-left: -40px;
		cursor: move;
	}
</style>