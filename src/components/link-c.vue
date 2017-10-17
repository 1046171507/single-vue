<template>
	<div>
		<router-link to="/vuex">to /vuex(状态管理器与cookie)</router-link>
		<span style="padding: 0 20px;"></span>
		<router-link to="/route">to /route(路由)</router-link>
		<span style="padding: 0 20px;"></span>
		<router-link to="/route?pass=123456">to /route?pass=123456(url传参)</router-link>
		<span style="padding: 0 20px;"></span>
		<router-link to="/ajax">to /ajax</router-link>
		<span style="padding: 0 20px;"></span>
		<router-link to="/myrequire">to /myrequire(外部懒加载)</router-link>
		<span style="padding: 0 20px;"></span>
		<router-link to="/props-slot">to /props-slot(父子级通信)</router-link>
		<span style="padding: 0 20px;"></span>
		<router-link to="/custom-event">to /custom-event(自己定义事件)</router-link>
		<span style="padding: 0 20px;"></span>
		<router-link to="/local-storage">to /local-storage(本地存储与vuex)</router-link>
		<span style="padding: 0 20px;"></span>
		<router-link to="/lazy-loading">to /lazy-loading(组件懒加载与过渡动画)</router-link>
		<span style="padding: 0 20px;"></span>
		<router-link to="/web-sql">to /Web SQL</router-link>
		<span style="padding: 0 20px;"></span>
		<router-link to="/swiper">to /swiper</router-link>
	</div>
</template>

<script>
	export default {
		name: 'link'
	}
</script>

<style scoped>
	div {
		text-align: left;
		padding: 20px 40px;
	}
	
	a {
		display: inline-block;
		width: 300px;
		margin-bottom: 20px;
		text-align: left;
	}
</style>