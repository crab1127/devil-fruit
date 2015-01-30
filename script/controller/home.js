define(['avalon', 'text!/view/home.html'], function(avalon, temp) {
	return function (el) {
		el.innerHTML = temp;
		avalon.scan(el)
	}
})