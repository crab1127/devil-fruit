define(['avalon', 'text!news', 'slider'], function(avalon, temp) {
  return function(el) {

    el.innerHTML = temp;  
    
    var newCtrl = avalon.define({
      $id : 'newCtrl',
      slides : [],
      items : []
    });  
    avalon.vmodels.app.title = "新品资讯";

    
    document.querySelector('#slider').addEventListener('slider');

    avalon.get(cfec.baseUrl + '/data/slider.json', function(data){
      data = JSON.parse(data);
      newCtrl.slides = data.news;
    }, 'json')

    avalon.get(cfec.baseUrl + '/data/new.json', function(data) {
      // console.log
      data = JSON.parse(data);      
      if (data && data.itemList) {
        newCtrl.items = data.itemList;
      }
    })    
    avalon.scan(el)
  } 
})