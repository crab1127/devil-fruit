define(['avalon', 'text!/view/news.html'], function(avalon, temp) {
	return function(el) {
		// avalon.templateCache.news = tmpl;
		// avalon.vmodels.app.page = "news";
		el.innerHTML = temp;
		avalon.scan(el)
	}	
})