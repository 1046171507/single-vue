var webpack = require('webpack')
var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: {
		app: './src/main.js',
		'vue-all': ['vue', 'vue-router', 'vuex'],
		//'iview': ['iview'],
		common: ['./src/assets/js/common'],
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
			'src': path.resolve(__dirname, '../src'),
			'assets': path.resolve(__dirname, '../src/assets'),
			'components': path.resolve(__dirname, '../src/components')
		}
	},
	module: {
		rules: [{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					//name: utils.assetsPath('img/[name].[ext]')
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					//name: utils.assetsPath('media/[name].[ext]')
					name: utils.assetsPath('media/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					//name: utils.assetsPath('fonts/[name].[ext]')
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			},
			{   //按需引入iview
				test: /iview.src.*?js$/,
				loader: 'babel-loader'
			},
		]
	},
	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			//name: ['vue-all', 'iview', 'common'], //对应于上面的entry的key
			name: ['vue-all', 'common'], //对应于上面的entry的key
			//name: 'vendor',
			//filename:'vendor.bundle.js',
			minChunks: Infinity //3
		})
		/*new webpack.ProvidePlugin({
			io: "socket.io",
			toastr: 'toastr'
		})*/
	],
	/*externals: {
		jquery: 'window.$'
	}*/
}