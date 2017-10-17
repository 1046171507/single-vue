import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

//import Hello from '@/components/Hello';
const vuex = resolve => require(['@/components/vuex'], resolve); //路由懒加载
const vuexL = resolve => require(['@/components/vuex/vuex-L'], resolve);
const vuexR = resolve => require(['@/components/vuex/vuex-R'], resolve);
const route = resolve => require(['@/components/route'], resolve);
const myrequire = resolve => require(['components/myrequire'], resolve);
const propsslot = resolve => require(['components/props-slot'], resolve);
const customevent = resolve => require(['components/custom-event'], resolve);
const ajax = resolve => require(['components/ajax'], resolve);
const localStorage = resolve => require(['components/local-storage'], resolve);
const lazyLoading = resolve => require(['components/lazy-loading'], resolve);
const webSql = resolve => require(['components/webSQL'], resolve);
const swiper = resolve => require(['components/swiper'], resolve);

const router = new Router({
	mode: 'history',
	routes: [{
			path: '/',
			redirect: '/vuex'
		},
		{
			path: "/vuex",
			name: "vuex",
			component: vuex,
			children: [{
				path: "",
				components: {
					left: vuexL,
					right: vuexR,
				},
			}]
		},
		{
			path: "/route",
			//path: "/route/:id", //这样写,/route/y和 /route/y 都将映射到相同的路由;
			name: "route",
			component: route,
			meta: {
				page: "路由页面"
			}
		},
		{
			path: "/myrequire",
			name: "myrequire",
			component: myrequire,
		},
		{
			path: "/props-slot",
			name: "props-slot",
			component: propsslot,
		},
		{
			path: "/custom-event",
			name: "custom-event",
			component: customevent,
		},
		{
			path: "/ajax",
			name: "ajax",
			component: ajax,
		},
		{
			path: "/local-storage",
			name: "local-storage",
			component: localStorage,
		},
		{
			path: "/lazy-loading",
			name: "lazy-loading",
			component: lazyLoading,
			children: [{
				path: "i",
				component: vuexL,
			}]
		},
		{
			path: "/web-sql",
			name: "web-sql",
			component: webSql,
		},
		{
			path: "/swiper",
			name: "swiper",
			component: swiper,
		},
	],
	scrollBehavior(to, from, savedPosition) {
		//console.log(to, from, savedPosition, 'scrollBehavior');
		if(to.name == "home") {
			console.log('返回顶部');
			return {
				x: 0,
				y: 0
			};
		}
	}
});

/*vue-router 提供的导航钩子主要用来拦截导航，让它完成跳转或取消。*/
router.beforeEach((to, from, next) => {
 	next();
	/*
	if(window.myPath == undefined) {
		window.myPath = to.path.replace('vuex', '');
	}
	if(to.path.indexOf(window.myPath) != -1) {
		next();
	} else {
		next(window.myPath + to.path);
	}
	//console.log(to, from);
	*/
});

export default router;