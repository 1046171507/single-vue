<template>
	<div class="vuex">
		<h3>状态管理</h3>
		<link-component></link-component>
		<router-view name="left"></router-view>
		<router-view name="right"></router-view>
	</div>
</template>
<script>
	export default {
		name: 'hello',
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>