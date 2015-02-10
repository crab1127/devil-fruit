define(['avalon', 'text!index', 'slider'], function(avalon, temp, slide) {

  return function (el) {
    el.innerHTML = temp;

    var model = avalon.define({
        $id: "index",
        isshow : true,
        indexSlider : [],
        sort : []
    })
    
    setTimeout(function(){
      document.querySelector('#slider').addEventListener('slider');
    },1)

    
    avalon.get(cfec.baseUrl + '/data/slider.json', function(data){
      data = JSON.parse(data);
      model.indexSlider = data.index;
    }, 'json')

    avalon.get(cfec.baseUrl + '/data/index.json', function(data){
      //转为json
      data = JSON.parse(data);

      if (data && data.categories) {
        model.sort = data.categories;
      }     

    }, 'json')   


    avalon.scan(el, model);
  }
})

