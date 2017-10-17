<template>
	<div>
		<h3>vuex-L</h3>
		<p>vuex-number:{{number}}</p>
		<p>vuex-square:{{square}}</p>
		<p>调用状态管理器中的方法,改变状态管理器中的值.<input type="button" name="" id="" value="number++" @click="numberAdd" /></p>
	</div>
</template>
<script>
	export default {
		name: 'vuex-L',
		components: { //组件
		},
		data() {
			return {}
		},
		computed: { //计算
			number() {
				return this.$store.state.vuexN.number
			},
			square() {
				return this.$store.getters.square
			}
		},
		props: {},
		methods: { //方法
			numberAdd() {
				this.$store.commit('add');
			},
		},
		mounted: function() { //类似于回调函数(初次实例化完成后调用)

		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
	div {
		float: left;
		width: 45%;
		border: 1px dashed #CCCCCC;
	}
</style>