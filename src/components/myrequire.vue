<template>
	<div class="myrequire">
		<h3>异步加载</h3>
		<link-component></link-component>
		<p><button @click="async">异步加载iview.css</button>
			<Checkbox v-model="iViewCss">Checkbox</Checkbox>
			<i-switch>switch</i-switch>
		</p>
	</div>
</template>
<script>
	/*
		按需引入iview
		import Checkbox from 'iview/src/components/checkbox';
		*/

	export default {
		name: 'myrequire',
		components: { //组件
			Checkbox: () =>
				import('iview/src/components/checkbox'), //组件懒加载,按需引入iview
			ISwitch: () =>
				import('iview/src/components/switch') //Switch为保留字,需要改为i-switch
		},
		data() {
			return {
				requireB: false,
				iViewCss: false,
			}
		},
		computed: { //计算
		},
		props: {},
		methods: { //方法
			async() {
				if(!this.requireB) {
					var _this = this;
					myrequire(['link!iview'], function() {
						console.log('加载cdn成功');
						/*_this.requireB = true;//myrequire本身就不会重复加载*/
					}, function() { //加载cdn失败后加载本地
						myrequire(['link!iviewL'])
					})
				}
			}
		},
		mounted: function() { //类似于回调函数(初次实例化完成后调用)
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
	.myrequire {
		background: url(./img-xx.jpg);
	}
</style>