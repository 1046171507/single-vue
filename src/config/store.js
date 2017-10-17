import Vue from 'vue'
/*vuex*/
import Vuex from 'vuex'
Vue.use(Vuex)

/*https://vuex.vuejs.org/zh-cn/modules.html
 * 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：*/

/*common封装的ajax,cookie,本地存储*/
import $ from 'assets/js/common';

var massData;
if($.store.get('mass-data')) {
	console.log($.store.get('mass-data'), 'LocalStorage获取')
	massData = $.store.get('mass-data')
} else {
	massData = {
		named: '',
		timed: ''
	}
};

/*模块化的状态块*/
const vuexN = {
	strict: true, //开启严格模式//在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到//都能被vuex的插件捕捉到
	state: { //状态值
		number: $.cookie('number') || 1, //用法:this.$store.state.vuexN.number
		massData,
	},
	getters: { //状态计算
		square: state => { //用法:this.$store.getters.square
			return state.number * state.number;
		}
	},
	mutations: { //状态方法
		add(state) { //this.$store.commit('add')
			state.number++;
			$.cookie('number', store.state.vuexN.number, {
				expires: 1
			});
		},
		minus(state, n) { //this.$store.commit('minus',2)
			state.number -= n;
			$.cookie('number', store.state.vuexN.number, {
				expires: 1
			});
		},
		revise(state, n) {
			state.massData.named = state.massData.named + n;
			$.store.set('mass-data', store.state.vuexN.massData);
		},
		remove(state) {
			state.massData = {
				named: '',
				timed: ''
			};
			$.store.remove('mass-data');
		},
		setd(state, dnew) {
			state.massData = dnew;
			$.store.set('mass-data', store.state.vuexN.massData);
		},
	},
};
/*store的插件*/
const storeMounted = store => {
	$.cookie('number', store.state.vuexN.number, {
		expires: 1
	});
	$.store.set('mass-data', store.state.vuexN.massData);
};

/*状态模块化*/
const storeModule = {
	vuexN,
}

/*状态管理器*/
const store = new Vuex.Store({
	strict: true, //开启严格模式
	state: { //全局状态值
		number: 10
	},
	modules: storeModule,
	plugins: [storeMounted]
});

export default store;