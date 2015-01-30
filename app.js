require.config({
    baseUrl : '',
    paths : {
      avalon : '/vendor/avalon/avalon.mobile.shim',
      mmRouter : '/vendor/avalon/mmRouter',
      mmHistory : '/vendor/avalon/mmHistory',
      text : '/vendor/require/text',
      domReady : '/vendor/require/domReady',
      css : '/vendor/require/css',
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
cfec.NAV = [
  {
    "id" : 1,
    "tittle" : "首页", 
    "path" : "/",
    "template" : "/view/index.html"
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
        "template" :　"/view/new.html"
      },
      {
        "id" : 22,
        "title" : "行业新品",
        "path" : "pro",
        "template" :　"/view/pro.html"
      },
    ]
  },
  {
    "id" : 3,
    "title" : "个人中心",
    "path" : "/home/:id",
    "template" : '/view/home.html'
  }
];


require(['avalon', 'mmRouter', 'domReady!'], function(){

  var loaded = {},container = document.getElementById('main');

  var app = avalon.define({
    $id : 'app',
    company: '广电商',
    title : '新品发布',
    newproMenu : cfec.NAV[1].itmes,
    pages : ["index", "new", "pro", "home"],
    curPage: '',
    back : function () {
      window.history.back(-1);
    },
    goHome : function () {
      //判读是否登录
      var isLogin = 1;
      if (isLogin) {
        avalon.router.navigate('/home');
      } else {
        avalon.router.navigate('/login');
      }
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
      require(['./script/controller/'+state], function(controller) {
        app.curPage = state;
        controller(el)
      })
    } else {
      app.curPage = state;
    }
  })

  //其他页面
  avalon.router.get('/:path', function(path) {
    var state = path.replace(/\.*/, "");
    console.log(path);
    if (!loaded[state]) {
      //每个页面添加一个单独div， 通过ms-visible设置显示
      var el = document.createElement('div');
      el.setAttribute("ms-visible", "curPage === '" + state + "'");
      container.appendChild(el);
      loaded[state] = 1;
      avalon.scan(el, app);
      require(['./script/controller/'+state], function(controller) {
        app.curPage = state;
        controller(el)
      })
    } else {
      app.curPage = state;
    }
  })

  //开始监听url变化
  avalon.history.start({
    basepath: "/"
  })

  //开始扫描
  avalon.scan();
})