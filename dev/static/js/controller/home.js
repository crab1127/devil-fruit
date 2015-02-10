define(['avalon', 'text!home'], function(avalon, temp) {
	return function (el) {
		el.innerHTML = temp;
		el.className = 'home-p'
		var userCtrl = avalon.define({
			$id : 'userCtrl',
			userPhoto : 'http://static.acfun.mm111.net/dotnet/artemis/u/cms/www/201409/190551176wz3.jpg',
			userName : '某年某月',
			cantonfairId : '',
			email :　'',
			companyEname : '',
			sex : '',
			skype : '',
			facebook : '',
			country : '中国',
			back : function() {
				window.history.back(-1)
			}

		});

		avalon.get('/cfone/user/getUserInfo.cf', function(data) {
			data = JSON.parse(data).data;

			userCtrl.userName = data.firstName + ' ' + data.lastName;
			userCtrl.cantonfairId = data.cantonfairId;
			userCtrl.email = data.email;
			userCtrl.companyEname = data.companyEname;
			userCtrl.sex = '男';
			userCtrl.skype = 'crab112@hotmail.com';
			userCtrl.facebook = '191815411'
		})

		avalon.scan(el)
	}
})