var http = (function() {

	"use strict";

	console.time('[HttpServer][Start]');

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
				console.timeEnd("[HttpServer][Start]");
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
			/*
			 * request.headers={
			 * 		host:'localhost:8888',
			 *		connection:'keep-alive',
			 *		'user-agent':'浏览器信息',
			 * 		accept:'* / *或text/html,application/xhtml+xml,...,...或text/css,* / *;q=0.1'
			 * 		referer:'http://localhost:8888/home',
			 * 		'accept-encoding':'gzip,deflate,br',
			 * 		'accept-language':'zh-CN,zh;q=0.8'
			 * }
			 * request.url='static/js/xx.js'
			 * request.method='GET'
			 */
			var hasExt = true;
			var requestUrl = request.url;
			var pathName = url.parse(requestUrl).pathname;
			//console.log(request.headers);
			//console.log(url.parse(requestUrl, true));
			//
			var httpData;
			var httpMethod = request.method;
			var postData = '';
			if(httpMethod == 'POST') {
				request.on('data', function(chunk) {
					postData += chunk;
				});
				request.on('end', function() {
					//console.log(postData);
					if(postData != '') {
						if(request.headers.accept.match('json')) {
							httpData = JSON.parse(unescape(postData))
						} else {
							httpData = querystring.parse(postData)
						}
					}
				});
			} else {
				httpData = url.parse(requestUrl, true).query;
			}
			/*request.on('data', function(chunk) {
				//console.log(chunk.toString());//post提交请求,伪form提交请求
				//console.log(querystring.parse(chunk));//纯form提交请求
			});*/

			//对请求的路径进行解码，防止中文乱码
			pathName = decodeURI(pathName);

			//获取资源文件的相对路径
			var filePath = path.join("data", pathName);

			//获取对应文件的文档类型
			var contentType = this.getContentType(filePath);

			//如果文件名存在
			fs.exists(filePath, function(exists) {
				if(exists) {
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
					//返回文件内容
					//stream.pipe(response);

					//判断请求是否有data值,如果有,返回"httpData"
					if(httpData != undefined) {
						response.writeHead(200, {
							"Content-Type": "application/json"
						});
						response.end(JSON.stringify(httpData));
					} else {
						stream.pipe(response);
					}
				} else { //文件名不存在的情况
					if(hasExt) {
						//如果这个文件不是程序自动添加的，直接返回404
						response.writeHead(404, {
							"content-type": "text/html"
						});
						response.end("<h1>404 Not Found</h1>");
					} else {
						//如果文件是程序自动添加的且不存在，则表示用户希望访问的是该目录下的文件列表
						var html = "<head><meta charset='utf-8'></head>";

						try {
							//用户访问目录
							var filedir = filePath.substring(0, filePath.lastIndexOf('\\'));
							//获取用户访问路径下的文件列表
							var files = fs.readdirSync(filedir);
							//将访问路径下的所以文件一一列举出来，并添加超链接，以便用户进一步访问
							for(var i in files) {
								var filename = files[i];
								html += "<div><a  href='" + filename + "'>" + filename + "</a></div>";
							}
						} catch(e) {
							html += "<h1>您访问的目录不存在</h1>"
						}
						response.writeHead(200, {
							"content-type": "text/html"
						});
						response.end(html);
					}
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
				default: "application/octet-stream"
			}
		}
	}
})();

http.start();