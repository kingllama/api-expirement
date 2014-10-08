$(function() {
  var set1Pictures;
  console.log("Ready")
  var loop = 0;
  
  function request () {
    $.ajax({
      url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bf7d8d5f5ff44a310a6df6b13f38ba93&per_page=500&tags=cats&format=json&jsoncallback=?",
      type: "GET",
      dataType: "jsonp",
      success: function(result){
        console.log("Passed 1");
        console.log(result);
        set1Pictures = result.photos.photo;
        secondRequest();
      },
      error: function(){
        if(loop < 50){
          request();
          loop += 1;
        };
      }
    });
  };

  function secondRequest () {
    $.ajax ({
      url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bf7d8d5f5ff44a310a6df6b13f38ba93&per_page=500&tags=dogs&format=json&jsoncallback=?",
      type: "GET",
      dataType: "jsonp",
      success: function(result){
        console.log("passed 2");
        console.log(result);
        set2Pictures = result.photos.photo;
        chooseRandomPhoto()
      },
      error: function(){
        if(loop < 50){
          secondRequest();
          loop += 1;
        };
      }
    });
  };

  function chooseRandomPhoto() {
    randomIndex = Math.floor((Math.random() * 499) + 1);
    birdOrMoon = Math.floor((Math.random() * 2));
    if(birdOrMoon === 0){
      image = set2Pictures[randomIndex];
    } else {
      image = set1Pictures[randomIndex];
    };
    displayImage(image);
  };

  function displayImage(photo) {
    $('#image').attr('src', 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg')
  };

  $('#image').on('click', function(){
    chooseRandomPhoto();
  });

  request();
});