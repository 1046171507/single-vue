// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//require('assets/css/common.css');
//import 'iview/dist/styles/iview.css'
/*//全局引入改为按需引入
import iView from 'iview'
Vue.use(iView);
*/

/*vuex*/
import store from './config/store'

//设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = false;

/* eslint-disable no-new */
var vueApp = new Vue({
	el: '#app',
	store,
	router,
	template: '<App/>',
	components: {
		App
	}
});

/*vue拓展*/
import vuePlus from 'assets/js/vue-plus';
Vue.use(vuePlus);

//window.Vue = Vue;

/*myrequire*/
import './config/myrequire'

/*全局主件*/
import linkc from 'components/link-c';
Vue.component('link-component', linkc);