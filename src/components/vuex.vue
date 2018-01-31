<template>
	<div class="vuex">
		<h3>状态管理</h3>
		<link-component></link-component>
		<p><span @click="click($event)">点击此处span后面的input聚焦</span><input type="text" /></p>
		<router-view name="left"></router-view>
		<router-view name="right"></router-view>
	</div>
</template>
<script>
	export default {
		name: 'hello',
		methods: {
			click(event) {
				var $input = event.currentTarget.nextElementSibling;
				$input.focus();
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>