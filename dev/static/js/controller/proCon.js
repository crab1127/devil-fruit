define(['avalon', 'text!proCon'], function (avalon, temp, newCon) {

  //http://www.e-cantonfair.com/cfone/showroomproduct/productsViewInfo.cf?productIds=568815

  var init = function (el, id) {

    el.innerHTML = temp;
    el.className = 'over';

    var newConCtrl = avalon.define({
      $id : 'proConCtrl',
      productName : '',  // 产品名
      productImg : [], // 产品图片

      fobPrice : '', // 离岸价格
      startPort : '', // 启运港 
      monthSupply : '', // 启运港 
      minOrder : '', // 启运港 
      payMethods : '', // 支付 
      keywords : [], // 关键词
      shortDescription : '', //描述

      specifications : '', //详情

      //公司信息
      sellerImg : '',
      CompanyName : '',
      region : '',
      CorpContacter : '',
      CorpProduct : '',
      CorpCertification : '',
      CorpSkype : '',

      currentIndex : 1,

      fnSwitch : function(id) {
        newConCtrl.currentIndex = id;
      },
      back : function() {
        avalon.router.navigate('/pro');
      },
      singletap : function() {
        var obj = document.querySelector('#popover');
        console.log(this)
        if (obj.className.indexOf('visible') === -1) {
          obj.style.display = 'block';
          obj.className = 'popover visible'
        } else {
          obj.style.display = 'none';
          obj.className = 'popover';
        }
      },
      close : function() {
        document.querySelector('#popover').className = 'popover'
      },
      goHome : function() {
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

    })
    
    setTimeout(function(){
      document.querySelector('#slider').addEventListener('slider');
    },1)

    avalon.get(cfec.baseUrl + '/data/pro-'+ id + '.json', function(results){
      var data = JSON.parse(results);
      var product = data.product,
          seller = data.company,     
          aKeyword = [],
          aProductImg = [];

      for (var key in product.keywords) {
        aKeyword.push(product.keywords[key])
      }

      for (var key in data.picture) {
        aProductImg.push(data.picture[key])
      }

      

      newConCtrl.productName = product.productName;
      newConCtrl.fobPrice = product.fobPrice;
      newConCtrl.startPort = product.startPort;
      newConCtrl.monthSupply = product.monthSupply;
      newConCtrl.minOrder = product.minOrder;
      newConCtrl.payMethods = product.payMethods;
      newConCtrl.keywords = aKeyword;
      newConCtrl.shortDescription = product.shortDescription;

      newConCtrl.specifications = data.specifications;
      newConCtrl.productImg = aProductImg;

      newConCtrl.CompanyName = seller.companyName;
      newConCtrl.sellerImg = 'http://www.e-cantonfair.com/image/common/skype_head.gif',
      newConCtrl.region = seller.region.province + seller.region.city;
      newConCtrl.CorpContacter =  seller.contacter;
      newConCtrl.CorpProduct =  seller.product;
      newConCtrl.CorpCertification =  seller.certification;
      newConCtrl.CorpSkype =  seller.skype;

    })

    avalon.scan(el)
  }
  return init;
})