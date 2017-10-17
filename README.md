# xxx

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

``` bash
xxx						#项目名
├── node_modules		#node配置文件
├── build				#webpack项目配置文件
├── config				#开发生产配置文件
├── dist				#编译生成的生产文件
├── src					#开发需要关注的所有文件
│    ├──assets			#公共文件(公共样式字体脚本...)
│    ├──components		#模块组件
│    ├──config			#配置文件(状态管理配置,require加载配置...)
│    ├──router			#路由跳转及路由拦截设置
│    ├──static			#按需加载的静态文件(json文件,xml文件...)
│    ├──App.vue			#vue入口
│    └──main.js			#vue主配置文件
├── index.html			#单文件项目页面文件
├── package.json		#node配置文件列表说明
├── README.md			#项目说明文档
├── dev.bat				#启动开发环境的快捷方式
├── start.bat			#启动生产环境的快捷方式
├── ajax-data			#ajax请求启动的代理服务器文件
│    ├── data			#请求文件文件夹(json,xml)
│    ├── start.js		#代理服务器脚本
│    └── start.bat		#代理服务器启动的快捷方式
├── VueToApp.jpg		#vue转为app方法
└── ...  				# 根据实际情况可以扩展目录结构
```
