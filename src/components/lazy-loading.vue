<template>
	<div>
		<h3>组件懒加载</h3>
		<link-component></link-component>
		<p><button @click="tra=!tra">过渡动画1</button></p>
		<transition name="fade">
			<!--过渡动画1-->
			<div v-if="tra">
				<lazy-loading-i></lazy-loading-i>
			</div>
		</transition>
		<p><router-link to="i" append>过渡动画2(路由切换过渡)(相对路径加append属性)</router-link></p>
		<transition enter-class="left-enter" enter-to-class="left-enter-to" leave-class="right-leave" leave-to-class="right-leave-to">
			<!--过渡动画2-->
			<router-view></router-view>
		</transition>
	</div>
</template>
<script>
	export default {
		name: 'lazy-loading',
		components: { //组件
			'lazy-loading-i': () =>
				import('./lazy-loading/lazy-loading-i') //组件懒加载
		},
		data() {
			return {
				tra: false,
			}
		},
		computed: { //计算
		},
		props: {},
		methods: { //方法
		},
		mounted: function() { //类似于回调函数(初次实例化完成后调用)

		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.fade-enter {
		opacity: 0;
	}
	
	.fade-enter-to {
		opacity: 1;
		transition: opacity 1.5s;
	}
	
	.fade-leave {
		opacity: 1;
	}
	
	.fade-leave-to {
		opacity: 0;
		transition: opacity 1.5s;
	}
	
	.left-enter {
		position: absolute;
		left: -100%;
	}
	
	.left-enter-to {
		position: absolute;
		left: 0;
		transition: left 1.5s;
	}
	
	.right-leave {
		position: absolute;
		right: 0;
	}
	
	.right-leave-to {
		position: absolute;
		right: -100%;
		transition: right 1.5s;
	}
</style>