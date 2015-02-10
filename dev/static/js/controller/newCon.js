define(['avalon', 'text!newCon'], function (avalon, temp) {
  
 
  var init = function (el, id) {

    el.innerHTML = temp;
    el.className = 'over';

    var newConCtrl = avalon.define({
      $id : 'newConCtrl',
      newTitle : '',  
      newImg : '', 
      newTime : '', 
      newCon : '', 
      currentIndex : 1,
      back : function() {
        avalon.router.navigate('/news');
      }
    })

    avalon.get(cfec.baseUrl + '/data/new-'+ id + '.json', function(results){
      var data = JSON.parse(results);
      newConCtrl.newTitle = data.name;
      newConCtrl.newImg = data.img;
      newConCtrl.newCon = data.desc;
      newConCtrl.newTime = data.time;
    })

    avalon.scan(el, newConCtrl)
  }
  return init;
})