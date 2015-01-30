define(['avalon', 'text!/view/pro.html'], function(avalon, temp) {
	return function(el) {
		el.innerHTML = temp;
		avalon.scan(el)
	}
})