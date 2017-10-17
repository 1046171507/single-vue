<template>
	<div class="route">
		<h3>路由相关</h3>
		<link-component></link-component>
		<p> URL: {{ $route.name }}</p>
		<p> routePage：{{ routePage }}</p>
		<p> URL传值pass：{{ pass }}</p>
		<p>在route/index.js中配置scrollBehavior,beforeEach</p>
		<p>
			<input type="button" value="浏览器记录中后退一步" @click="$router.go(-1)" />等同于 history.forward();
			<span style="padding: 0 20px;"></span>
			<input type="button" value="浏览器记录中前进一步" @click="$router.go(1)" />等同于 history.back()
		</p>
	</div>
</template>
<script>
	export default {
		name: 'route',
		components: { //组件
		},
		data() {
			return {}
		},
		computed: { //计算
			routePage() {
				return this.$route.meta.page
			},
			pass() {
				return this.$route.query.pass || ''
			}
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

</style>