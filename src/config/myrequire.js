myrequire.config({
	urlArgs: "time=" + (new Date()).getTime(),
	paths: {
		"text": "static/js/text.min",
		"link": "static/js/link",
		"iview":"https://cdn.bootcss.com/iview/2.4.0/styles/iview.css",
		"iviewL":"static/css/iview.min.css"
	},
	shim: {
		//'layer': {
		//	deps: ['link!layer_css']
		//},
	}
});