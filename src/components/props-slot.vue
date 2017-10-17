<template>
	<div class="props-slot">
		<h3>通信与插槽</h3>
		<link-component></link-component>
		<p>子级改变父级的ParentN值（此处用的vue源码,安全性未知）：{{parentN}}</p>
		<p><input type="button" value="父级改变自己的parentN" @click="parentN++" /></p>
		<p><input type="button" value="父级向子级通信" @click="childrenFn" /></p>
		<props-slot :props-d="propsD" :props-r="propsR" :props-n="childrenN">
			<p>父级传导过来的内容</p>
		</props-slot>
		<props-slot :props-r="propsR" :props-n="childrenN"></props-slot>
	</div>
</template>
<script>
	import propsSlot from 'components/props-slot/props-slot-c';
	export default {
		name: 'propsslot',
		components: { //组件
			propsSlot
		},
		data() {
			return {
				propsD: '父级通信参数选填',
				propsR: '父级通信参数必填',
				parentN: 1,
				childrenN: 1,
			}
		},
		computed: { //计算
		},
		props: {},
		methods: { //方法
			childrenFn() {
				this.childrenN++
			}
		},
		mounted: function() { //类似于回调函数(初次实例化完成后调用)

		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>