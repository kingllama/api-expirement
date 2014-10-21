$(function() {
  var set1Pictures;
  var loop = 0;
  var choice1 = "dogs"
  var choice2 = "cats"
  
  function request () {
    var onSuccess = 
    $.ajax({
      url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bf7d8d5f5ff44a310a6df6b13f38ba93&per_page=500&tags=" + choice1 + "&format=json&jsoncallback=?",
      type: "GET",
      dataType: "jsonp",
      success: function(result){
        pictures = result.photos.photo;
        secondRequest();
      },
      error: function(){
        if(loop < 15){
          request();
          loop += 1;
        };
      }
    });
  };

  function secondRequest () {
    $.ajax ({
      url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bf7d8d5f5ff44a310a6df6b13f38ba93&per_page=500&tags=" + choice2 + "&format=json&jsoncallback=?",
      type: "GET",
      dataType: "jsonp",
      success: function(result){
        set2Pictures = result.photos.photo;
        chooseRandomPhoto()
      },
      error: function(){
        if(loop < 15){
          secondRequest();
          loop += 1;
        };
      }
    });
  };

  function run () {

  }

  function chooseRandomPhoto(photos) {
    randomIndex = Math.floor((Math.random() * 499) + 1);
    aOrB = Math.floor((Math.random() * 2));
    if(aOrB === 0){
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

  $('#choice1').on('blur', function(){
    console.log("event: Choice 1 fired.")
    choice1 = $('#choice1').text();
    request();
  });

  $('#choice2').on('blur', function(){
    console.log("event: Choice 2 fired.")
    choice2 = $('#choice2').text();
    request();
  });
});