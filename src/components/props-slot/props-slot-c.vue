<template>
	<div class="props-slot-c">
		<slot>
			<p>父级没有传导内容,显示默认内容</p>
		</slot>
		<p>父级向子级单向通信(选填):{{propsD}}</p>
		<p>父级向子级单向通信(必填):{{propsR}}</p>
		<p>父级改变子级的propsN值：{{propsN}}</p>
		<p><input type="button" value="子级向父级通信" @click="parentFn" /></p>
	</div>
</template>
<script>
	export default {
		name: 'propsslotc',
		components: { //组件
		},
		data() {
			return {}
		},
		computed: { //计算
		},
		props: {
			propsD: {
				default: '默认', //默认
			},
			propsR: {
				required: true //必填
			},
			propsN: {
				default: 1
			}
		},
		methods: { //方法
			parentFn() {
				this.$parent.parentN++
			}
		},
		mounted: function() { //类似于回调函数(初次实例化完成后调用)
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	div {
		border: 1px dashed #CCCCCC;
	}
</style>