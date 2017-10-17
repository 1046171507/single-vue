<template>
	<div id="app">
		<!--<img src="./assets/logo.png">-->
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		name: 'app'
	}
</script>

<style lang="less">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		padding-top: 60px;
	}
	/*webkit滚动条*/
	/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
	
	::-webkit-scrollbar {
		width: 7px;
		height: 7px;
		background-color: #F5F5F5;
	}
	/*定义滚动条轨道 内阴影+圆角*/
	
	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		border-radius: 5px;
		background-color: #F5F5F5;
	}
	/*定义滑块 内阴影+圆角*/
	
	::-webkit-scrollbar-thumb {
		border-radius: 5px;
		-webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
		background-color: #CCCCCC;
	}
</style>