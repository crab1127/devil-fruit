require.config({
    paths : {
      avalon : './vendor/avalon/avalon.mobile.shim',
      mmRequest : './vendor/avalon/mmRequest.modern',
      mmPromise : './vendor/avalon/mmPromise',
      mmRouter : './vendor/avalon/mmRouter',
      mmHistory : './vendor/avalon/mmHistory',
      text : './vendor/require/text',
      domReady : './vendor/require/domReady',
      css : './vendor/require/css',

      //页面
      index : './views/index.html',
      news : './views/news.html',
      pro : './views/pro.html',
      home : './views/home.html',
      login : './views/login.html',
      sginIn : './views/sginIn.html',
      newCon : './views/newCon.html',
      proCon : './views/proCon.html',

      //controller
      indexCtrl : './static/js/controller/index',
      newsCtrl : './static/js/controller/news',
      proCtrl : './static/js/controller/pro',
      homeCtrl : './static/js/controller/home',
      loginCtrl : './static/js/controller/login',
      newConCtrl : './static/js/controller/newCon',
      proConCtrl : './static/js/controller/proCon',

      //css
      //login : './css/dev/login.css',

      //插件
      md5 : './static/js/widget/md5',
      slider : './static/js/widget/sliders'
    },
    priority : ['text', 'css'],
    skim : {
      avalon : {
        exports : 'avalon'
      }
    }   
});


//定义命名空间
var cfec = cfec || {};
cfec.baseUrl = '';
cfec.NAV = [
  {
    "id" : 1,
    "tittle" : "首页", 
    "path" : "/",
    "template" : "/views/index.html"
  },
  {
    "id" : 2,
    "title" : "新品中心",
    "path": "",
    "itmes" : [
      {
        "id" : 21,
        "title" : "新品资讯",
        "path" : "news",
        "template" :　"/views/new.html"
      },
      {
        "id" : 22,
        "title" : "行业新品",
        "path" : "pro",
        "template" :　"/views/pro.html"
      },
    ]
  },
  {
    "id" : 3,
    "title" : "个人中心",
    "path" : "/home/:id",
    "template" : '/views/home.html'
  }
];


require(['avalon', 'mmRouter', 'mmRequest', 'domReady!'], function(){

  var container = document.getElementById('main'),
      loaded = {},
      els =  {},
      callbackCache = {};

  var app = avalon.define({
    $id : 'app',
    company: '广电商',
    title : '新品发布',
    newproMenu : cfec.NAV[1].itmes,
    pages : ["index", "new", "pro", "home"],
    curPage : '',
    isBack : false,
    sBack : '',
    back : function () {
      if (app.sBack) {
        avalon.router.navigate(app.sBack);
      } else {
        window.history.back(-1);
      }
    },
    goHome : function () {
      //判读是否登录
      //有个bug， 指定返回是json，接受的确是text
      avalon.get('/cfone/user/getUserInfo.cf', function(data) {
        //转为json
        data = JSON.parse(data);
        console.log(data);
        if ('unlogin' === data.status) {
          avalon.router.navigate('/login');
        } else {
          avalon.router.navigate('/home');
        }
      }, 'json');
    }
  });

  //首页
  avalon.router.get('/', function() {
    var state = 'index';    
    if (!loaded[state]) {
      //每个页面添加一个单独div， 通过ms-visible设置显示
      var el = document.createElement('div');
      el.setAttribute("ms-visible", "curPage === '" + state + "'");
      container.appendChild(el);
      loaded[state] = 1;
      avalon.scan(el, app);
      require(['indexCtrl'], function(controller) {
        app.curPage = state;
        controller(el)
      })
    } else {
      app.curPage = state;
    }
    app.isBack = false;
  })

  //列表页
  avalon.router.get('/:path', function(path) {
    var state = path.replace(/\.*/, "");

    if ('login' === state) {
      avalon.get('/cfone/user/getUserInfo.cf', function(data) {
        //转为json
        data = JSON.parse(data);
        console.log(data);
        if ('unlogin' !== data.status) {
          avalon.router.navigate('/');
        }
      }, 'json');
    }
    if (!loaded[state]) {
      //每个页面添加一个单独div， 通过ms-visible设置显示
      var el = document.createElement('div');
      el.setAttribute("ms-visible", "curPage === '" + state + "'");
      container.appendChild(el);
      loaded[state] = 1;
      avalon.scan(el, app);
      require(['./static/js/controller/'+state], function(controller) {
        app.curPage = state;
        controller(el)        
      })
    } else {
      app.curPage = state;
    }

    app.sBack = '/';
    app.isBack = true;
  })

  //资讯内容
  avalon.router.get('/news/{id}', function(path) {    
    if (!loaded['newCon']) {
      els['newCon'] = document.createElement('div');
      els['newCon'].setAttribute('ms-visible', "curPage==='newCon'");
      container.appendChild(els['newCon']);
      loaded['newCon'] = 1;
      avalon.scan(els['newCon'], app);
      require(['newConCtrl'], function(controller) {
        app.curPage = 'newCon';
        callbackCache['newCon'] = controller
        controller(els['newCon'], path)
      })
    } else {
      callbackCache['newCon'](els['newCon'], path)
      app.curPage = 'newCon';
    }
  })

  //产品内容
  avalon.router.get('/pro/{id}', function(path) {    
    if (!loaded['proCon']) {
      els['proCon'] = document.createElement('div');
      els['proCon'].setAttribute('ms-visible', "curPage==='proCon'");
      container.appendChild(els['proCon']);
      loaded['proCon'] = 1;
      avalon.scan(els['proCon'], app);
      require(['proConCtrl'], function(controller) {
        app.curPage = 'proCon';
        callbackCache['proCon'] = controller
        controller(els['proCon'], path)
      })
    } else {
      callbackCache['proCon'](els['proCon'], path)
      app.curPage = 'proCon';
    }
  })
  //开始监听url变化
  avalon.history.start({
    basepath: "/"
  })

  /**
   * 过滤器
   */

  //字符串剪切
  avalon.filters.slice = function(str, length){
    var ret = str.slice(0, length);
    var a =  str.length > length ? '...' : '';
    return ret + a;
  }
  //开始扫描
  avalon.scan();
})