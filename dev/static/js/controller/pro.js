define(['avalon', 'text!pro', 'slider'], function(avalon, temp) {

  return function(el) {
    el.innerHTML = temp;  
    
    var proCtrl = avalon.define({
      $id : 'proCtrl',
      slides : [],
      items : []
    });  
    avalon.vmodels.app.title = "新品资讯";

    document.querySelector('#slider').addEventListener('slider');

    avalon.get(cfec.baseUrl + '/data/slider.json', function(data){
      data = JSON.parse(data);
      proCtrl.slides = data.pro;
    }, 'json')

    avalon.get(cfec.baseUrl + '/data/pro.json', function(data) {
      data = JSON.parse(data);      
      if (data && data.itemList) {
        proCtrl.items = data.itemList;
      }
    })

    avalon.scan(el)
  } 
})