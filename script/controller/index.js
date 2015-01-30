define(['avalon', 'text!/view/index.html'], function(avalon, temp) {

  return function (el) {
    el.innerHTML = temp;
    //avalon.templateCache.index = index
    var model = avalon.define({
        $id: "index",
        slides : [
          {"href" : "#!/pro/1", "src" : "http://placehold.it/480X200"},
          {"href" : "#!/pro/2", "src" : "http://placehold.it/480X200"},
          {"href" : "#!/pro/3", "src" : "http://placehold.it/480X200"},
        ],
        items : [
            {
              "href" : "#!/news/2",
              "img" : "http://placehold.it/64x64",
              "title" : "Ango",
              "desc" : "Lorem ipsum dolor sit amet, consectetur."
            },
            {
              "href" : "#!/news/2",
              "img" : "http://placehold.it/64x64",
              "title" : "Ango",
              "desc" : "Lorem ipsum dolor sit amet, consectetur."
            },
            {
              "href" : "#!/news/2",
              "img" : "http://placehold.it/64x64",
              "title" : "Ango",
              "desc" : "Lorem ipsum dolor sit amet, consectetur."
            },
            {
              "href" : "#!/news/2",
              "img" : "http://placehold.it/64x64",
              "title" : "Ango",
              "desc" : "Lorem ipsum dolor sit amet, consectetur."
            },
          ]
    })
    //avalon.vmodels.app.page = "index"
    avalon.scan(el, model);
  }
})