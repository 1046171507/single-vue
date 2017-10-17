<template>
	<div class="localStorage">
		<h3>web SQL(各个厂家不统一,此为chrome的)</h3>
		<link-component></link-component>
		<p><button @click="buttFn1">Web SQL</button></p>
		<p><button @click="buttFn2">Web SQL</button></p>
		<p><button @click="buttFn3">Web SQL</button></p>
		<p><button @click="buttFn4">Web SQL</button></p>
	</div>
</template>
<script>
	/*common封装的ajax,cookie,本地存储*/
	import $ from 'assets/js/common';
	export default {
		name: 'web-sql',
		components: { //组件
		},
		data() {
			return {}
		},
		computed: { //计算
		},
		props: {},
		methods: { //方法
			//插入数据
			buttFn1() {
				console.log(11);
				var db = openDatabase('testDB', '1.0', 'Test DB', 2 * 1024 * 1024); //创建数据库
				//创建或打开一个本地的数据库对象
				//openDatabase接收五个参数:数据库名字, 数据库版本号, 显示名字, 数据库保存数据的大小（ 以字节为单位), 回调函数（ 非必须)
				var e_id = 2,
					e_log = 'Frank';
				db.transaction(function(context) {
					context.executeSql('CREATE TABLE IF NOT EXISTS testTable (id unique, name)', msuc, merror); //创建表
					context.executeSql('INSERT INTO testTable (id,name) VALUES (0,"Byron")', msuc, merror);
					context.executeSql('INSERT INTO testTable (id,name) VALUES (1,"Casper")', msuc, merror);
					context.executeSql('INSERT INTO testTable (id,log) VALUES (?,?)', [e_id, e_log], msuc, merror);
				}, msuc, merror);
				//transaction方法用以处理事务，当一条语句执行失败的时候，整个事务回滚。
				//方法有三个参数:包含事务内容的一个方法, 执行成功回调函数（可选）, 执行失败回调函数（可选）

				//executeSql方法用以执行SQL语句，返回结果，
				//方法有四个参数:查询字符串, 用以替换查询字符串中问号的参数, 执行成功回调函数（可选）, 执行失败回调函数（可选）
			},
			//读取数据
			buttFn2() {
				console.log(22);
				var db = openDatabase('testDB', '1.0', 'Test DB', 2 * 1024);
				db.transaction(function(context) {
					context.executeSql('SELECT * FROM testTable', [], function(context, results) {
						console.log(context, results, results.rows);
					}, merror);
				}, msuc, merror);
			},
			//删除记录
			buttFn3() {
				console.log(33);
				var db = openDatabase('testDB', '1.0', 'Test DB', 2 * 1024);
				db.transaction(function(context) {
					//context.executeSql('DELETE FROM testTable WHERE id=?',[1]);
					context.executeSql('DELETE FROM testTable WHERE id=1', msuc, merror); //删除记录数据
				}, msuc, merror);
			},
			//更新记录
			buttFn4() {
				console.log(44);
				var db = openDatabase('testDB', '1.0', 'Test DB', 2 * 1024);
				db.transaction(function(context) {
					//context.executeSql('UPDATE testTable SET name=\'wangli\' WHERE id=?',[2]);
					context.executeSql('UPDATE testTable SET name=\'wangli\' WHERE id=2', msuc, merror);
				}, msuc, merror);
			},
		},
		mounted: function() { //类似于回调函数(初次实例化完成后调用)
			window.msuc = function() {
				console.log('成功')
			};
			window.merror = function() {
				console.log('失败')
			};
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

</style>