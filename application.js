$(function() {
  var set1Pictures;
  var set2Pictures;
  var loop = 0;
  var choice1 = "dogs"
  var choice2 = "cats"
  
  var request = function () {
    $.ajax({
      url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bf7d8d5f5ff44a310a6df6b13f38ba93&per_page=500&tags=" + choice1 + "&format=json&jsoncallback=?",
      type: "GET",
      dataType: "jsonp",
      success: function(result){
        set1Pictures = result.photos.photo;
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

  var secondRequest = function () {
    $.ajax ({
      url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=bf7d8d5f5ff44a310a6df6b13f38ba93&per_page=500&tags=" + choice2 + "&format=json&jsoncallback=?",
      type: "GET",
      dataType: "jsonp",
      success: function(result){
        set2Pictures = result.photos.photo;
        chooseRandomPhoto();
      },
      error: function(){
        if(loop < 15){
          secondRequest();
          loop += 1;
        };
      }
    });
  };

  var chooseRandomPhoto = function (photos) {
    randomIndex = Math.floor((Math.random() * 499) + 1);
    aOrB = Math.floor((Math.random() * 2));
    if(aOrB === 0){
      image = set2Pictures[randomIndex];
    } else {
      image = set1Pictures[randomIndex];
    };
    displayImage(image);
  };

  var displayImage = function (photo) {
    $('#image').attr('src', 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_b.jpg')
  };

  $('#image').on('click', function(){
    chooseRandomPhoto();
  });

  request();
  displayImage(image);

  $('#choice1').on('blur', function(){
    if($('#choice1').text() === ""){
      $('#choice1').text(choice1);
    } else {
      choice1 = $('#choice1').text();
      request();
    };
  });

  $('#choice2').on('blur', function(){
    if($('#choice2').text() === ""){
      $('#choice2').text(choice2);
    } else {
      choice2 = $('#choice2').text();
      secondRequest();
    };
  });
});