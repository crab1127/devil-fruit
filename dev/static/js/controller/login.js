define(['avalon', 'text!login', 'md5'], function(avalon, temp, md5){
  return function (el) {
    el.innerHTML = temp;
    el.className = 'login';
    isSgin = false;

    //登录  
    var loginCtrl = avalon.define({
      $id : 'login',
      name : '',
      password : '',
      logoImg : cfec.baseUrl + 'images/logo.png',
      isShow : false,
      ajax : function (e) {
        //验证值
        if (loginCtrl.name == '' || loginCtrl.name == 0) {
          return false;
        }
        if (loginCtrl.password == '' || loginCtrl.password ==0)  {
          return false;
        }

        var param = {
          j_username : loginCtrl.name,
          j_password : md5.hex_md5(loginCtrl.password)
        };

        avalon.post('/cfone/j_spring_security_check', param, function(data){
          data = JSON.parse(data);
          //登录成功
          if (data && data.status === 'success') {
            //记住账号
            localStorage.setItem('account', loginCtrl.name);
            var jD = data.data;
            jItem = {
              listenUrl : jD['listenUrl'],
              token : jD['token']
            };
            localStorage.setItem('msgSocket', JSON.stringify(jItem));

            //登录成功后，执行订制的交互操作或默认的交互操作
            var redirectUrl = location.search && location.search.substr(1).match(/(^|&)redirectUrl=([^&]*)(&|$)/g);
            if (redirectUrl) {
              location.href = decodeURIComponent(redirectUrl);
            } else {
              avalon.router.navigate('/home');
            }

          } else if ( data && data.status === 'unlogin') {
            console.log('账号名或密码错误')
          }
        }, 'json')

        e.preventDefault();
      },

      url : '',

      sginIn : function () {
        if (isSgin) {
          //avalon('.sgin-page').removeClass('ssd');
          loginCtrl.isShow = true;
        } else {
          loginCtrl.url = '/app/view/sginIn.html';
          isSgin = true;
          loginCtrl.isShow = true;
        }
      },
      back : function() {
       window.history.back(-1);
      }
    }) 

    //注册
    var sginInCtrl = avalon.define({
      $id : 'sginInCtrl',
      email : '',
      cantonfairId : '',
      password : '',
      firstName : '',
      companyName : '',
      countryId : '',
      phoneCode : '',
      back : function() {
        loginCtrl.isShow = false;
      },
      
      //验证邮箱是否存在
      fnEmail : function () {

      },

      //验证id
      Validate : function () {

      },
      //提交
      sginIn : function() {

      }
    });

    // sginInCtrl.email.$watch('length', function(){
    //   avalon.log(sginInCtrl.email)
    // })
    sginInCtrl.$watch("$all", function(a, b) {
      console.log(a, b)
      if (!/^avalon\-/.test(a)) {
          avalon.log([a, b, typeof b].join("   "))
      }
    })


    avalon.scan(el);
  }
})