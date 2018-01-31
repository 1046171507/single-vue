var http = (function() {

	"use strict";

	//http协议模块
	var http = require('http');
	//url解析模块
	var url = require('url');
	//文件系统模块
	var fs = require("fs");
	//路径解析模块
	var path = require("path");
	//查询字符串
	var querystring = require('querystring');

	return {
		//启动服务
		start: function() {
			var port = this.config.port;
			var ip = this.config.ip;

			//创建一个服务
			var httpServer = http.createServer(this.processRequest.bind(this));

			//在指定的端口监听服务
			httpServer.listen(port, function() {
				console.log("[HttpServer][Start]", "runing at http://" + ip + ":" + port + "/");
			});

			httpServer.on("error", function(error) {
				console.error(error);
			});
		},

		/**
		 * 请求处理
		 * @param request
		 * @param response
		 */
		processRequest: function(request, response) {

			var requestUrlParse = url.parse(request.url, true) //格式化请求信息
			var pathName = requestUrlParse.pathname; //请求路径
			var pathData = requestUrlParse.query; //请求传参

			pathName = decodeURI(pathName); //对请求的路径进行解码，防止中文乱码

			var rootPath = this.config.path;
			var filePath = path.join(rootPath, pathName); //获取资源文件的绝对路径

			var contentType = this.getContentType(filePath); //获取对应文件的文档类型

			var httpMethod = request.method; //请求方式

			fs.exists(filePath, function(exists) {
				if(exists) { //如果文件(夹)名存在

					if(contentType != "application/octet-stream") { //文件存在

						if(httpMethod == 'POST') {
							var postData = '';
							request.on('data', function(chunk) { //二进制流一节一节的接受文件
								postData += chunk;
							});
							request.on('end', function() { //文件接受完
								if(postData != '') {
									postData = unescape(postData); //解码二进制流
									pathData = querystring.parse(postData);
								}
						
								response.writeHead(200, {
									"Content-Type": "application/json"
								});
						
								var jsonText = JSON.stringify(pathData); //json转字符串
								response.end(jsonText); //返回json字符
							});
						} else {
							//git请求
							response.writeHead(200, {
								"content-type": contentType
							});
							var stream = fs.createReadStream(filePath, {
								flags: "r",
								encoding: null
							});
							stream.on("error", function() {
								response.writeHead(500, {
									"content-type": "text/html"
								});
								response.end("<h1>500 Server Error</h1>");
							});
							stream.pipe(response); //返回文件流
						}

						/* //重定向
						response.writeHead(302, {
							'Location': 'index.html'
						});
						response.end();*/

						/*//304缓冲
						var fsStat = fs.statSync(filePath); //获取文件信息
						var fsMtime = fsStat.mtime.toUTCString(); //获取文件修改时间

						if(request.headers["if-modified-since"] == fsMtime) { //如果需要请求的文件没有修改,返回304。服务器告诉客户，原来缓冲的文档还可以继续使用。
							response.writeHead(304);
							response.end();
						} else {
							response.writeHead(200, {
								"content-type": contentType,
								"Last-Modified": fsMtime
							});
							var stream = fs.createReadStream(filePath, {
								flags: "r",
								encoding: null
							});
							stream.on("error", function() {
								response.writeHead(500, {
									"content-type": "text/html"
								});
								response.end("<h1>500 Server Error</h1>");
							});
							stream.pipe(response); //返回文件流
						}
						*/

						/*
						response.writeHead(200, {
							"content-type": contentType,
						});
						var stream = fs.createReadStream(filePath, {
							flags: "r",
							encoding: null
						});
						stream.on("error", function() {
							response.writeHead(500, {
								"content-type": "text/html"
							});
							response.end("<h1>500 Server Error</h1>");
						});
						stream.pipe(response); //返回文件流
						*/

					} else { //文件夹存在
						var filedir = filePath.substring(filePath.lastIndexOf('\\') + 1); //用户访问的当前目录
						var files = fs.readdirSync(filePath); //获取用户访问路径下的文件列表
						if(filedir != '') filedir += '/';
						var html = "<head><meta charset='utf-8'></head>";
						//将访问路径下的所以文件一一列举出来，并添加超链接，以便用户进一步访问
						for(var i in files) {
							var filename = files[i];
							html += "<div><a  href='" + filedir + filename + "'>" + filename + "</a></div>";
						}
						response.writeHead(200, {
							"content-type": "text/html"
						});
						response.end(html);
					}
				} else { //文件(夹)不存在

					var html = "<head><meta charset='utf-8'></head><div>文件不存在</div>";
					response.writeHead(404, {
						"content-type": "text/html"
					});
					response.end(html);

					/*//中间层发起post请求
					var post_data = {
						a: 123,
						time: new Date().getTime()
					}; //这是需要提交的数据  

					var content = querystring.stringify(post_data);

					var options = {
						hostname: '127.0.0.1',
						port: 8081,
						path: '/view/upload.json',
						method: 'POST',
						//headers: {
						//	'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
						//}
					};

					var resData='';
					var req = http.request(options, function(res) {
						res.on('data', function(chunk) {
							resData += chunk;
						});
					});

					req.on('error', function(e) {
						console.log('problem with request: ' + e.message);
					});

					req.write(content); // write data to request body

					req.end();*/
				}
			});
		},

		/**
		 * 获取文档的内容类型
		 * @param filePath
		 * @returns {*}
		 */
		getContentType: function(filePath) {
			var contentType = this.config.mime;
			var ext = path.extname(filePath).substr(1);
			if(contentType.hasOwnProperty(ext)) {
				return contentType[ext];
			} else {
				return contentType.default;
			}
		},

		///配置信息
		config: {
			port: 8081,
			path: '../layui-cms',
			ip: '127.0.0.1',
			mime: {
				html: "text/html",
				js: "text/javascript",
				css: "text/css",
				gif: "image/gif",
				jpg: "image/jpeg",
				png: "image/png",
				svg: "image/svg+xml",
				ico: "image/icon",
				txt: "text/plain",
				json: "application/json",
				woff: "text/html",
				ttf: "text/html",
				eot: "text/html",
				default: "application/octet-stream",
			}
		}
	}
})();

http.start();