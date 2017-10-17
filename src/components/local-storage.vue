<template>
	<div class="localStorage">
		<h3>本地存储</h3>
		<link-component></link-component>
		<p>针对部分页面需要做大量数据长期存储</p>
		<p>name:{{named}}</p>
		<p>time:{{timed}}</p>
		<p><input type="button" value="修改name,并保存" @click="reviseFn" /></p>
		<p><input type="button" value="删除mass-data" @click="removeFn" /></p>
	</div>
</template>
<script>
	/*common封装的ajax,cookie,本地存储*/
	import $ from 'assets/js/common';
	export default {
		name: 'local-storage',
		components: { //组件
		},
		data() {
			return {}
		},
		computed: { //计算
			named() {
				return this.$store.state.vuexN.massData.named
			},
			timed() {
				return this.$store.state.vuexN.massData.timed
			}
		},
		props: {},
		methods: { //方法
			reviseFn() {
				this.$store.commit('revise', '-wang');
			},
			removeFn() {
				this.$store.commit('remove');
			},
		},
		mounted: function() { //类似于回调函数(初次实例化完成后调用)
			var v_this = this;
			if(!v_this.named) {
				$.post("/datapost/new.json", {
					"named": "John",
					"timed": "2pm",
				}, function(data) {
					console.log(data, 'ajax获取');
					v_this.$store.commit('setd', data);
				})
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>