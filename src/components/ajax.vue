<template>
	<div class="ajax">
		<h3>基于axios的ajax,操作JQ化</h3>
		<link-component></link-component>
		<p><input type="button" name="" id="" value="$.ajax,有参数" @click="ajaxFn1" /></p>
		<p><input type="button" name="" id="" value="$.ajax,无参数" @click="ajaxFn2" /></p>
		<p><input type="button" name="" id="" value="$.get,有参数" @click="getFn1" /></p>
		<p><input type="button" name="" id="" value="$.get,无参数" @click="getFn2" /></p>
		<p><input type="button" name="" id="" value="$.post,有参数" @click="postFn1" /></p>
		<p><input type="button" name="" id="" value="$.post,无参数" @click="postFn2" /></p>
	</div>
</template>
<script>
	/*common封装的ajax,cookie,本地存储*/
	import $ from 'assets/js/common';
	export default {
		name: 'ajax',
		components: { //组件
		},
		data() {
			return {}
		},
		computed: { //计算
		},
		props: {},
		methods: { //方法
			ajaxFn1() {
				$.ajax({
					'type': "post",
					//'type': "get",
					'url': '/datapost/new.json',
					'data': {
						"name": "John",
						time: "2pm,参数传过去的值",
					},
					'success': function(result) {
						console.log(result, 'axios-post有参数')
					},
					'error': function(error) {
						console.log('服务器错误404,500等')
					}
				});
			},
			ajaxFn2() {
				$.ajax({
					'type': "post",
					//'type': "get",
					'url': '/datapost/new.json',
					'success': function(result) {
						console.log(result, 'axios-post没有参数')
					},
					'error': function(error) {
						console.log('服务器错误404,500等')
					}
				});
			},
			getFn1() {
				$.get("/datapost/new.json", {
					"?=+name": "John",
					time: "2pm,参数传过去的值",
				}, function(data) {
					console.log(data, 'get有参数');
				});
			},
			getFn2() {
				$.get("/datapost/new.json", function(data) {
					console.log(data, 'get没有参数,(get一般用于提交,不传值很奇怪)');
				});
			},
			postFn1() {
				$.post("/datapost/new.json", {
					"?=+name": "John",
					time: "2pm,参数传过去的值",
				}, function(data) {
					console.log(data, 'post有参数');
				});
			},
			postFn2() {
				$.post("/datapost/new.json", function(data) {
					console.log(data, 'post没有参数');
				});
			},
		},
		mounted: function() { //类似于回调函数(初次实例化完成后调用)
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>