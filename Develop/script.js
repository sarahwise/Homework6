$(document).ready(function () {
  $("#search-button").on("click", function () {
    var searchValue = $("#search-value").val();


    // clear input box
    $("#search-value").val("");
    searchWeather(searchValue);

  });
  $(".history").on("click", "li", function () {
    searchWeather($(this).text());
  });

  function makeRow(text) {
    var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
    $(".history").append(li);
  }

  function searchWeather(searchValue) {
    $.ajax({
      type: "GET",
      url: "http://api.openweathermap.org/data/2.5/weather?q=" + searchValue + "&appid=27afc5b8ae6a5b4a4768c94dad5fc65f&units=imperial",
      dataType: "json",
      success: function (data) {
        console.log(data);
        // create history link for this search
        if (history.indexOf(searchValue) === -1) {
          history.push(searchValue);
          window.localStorage.setItem("history", JSON.stringify(history));

          makeRow(searchValue);

        }

        // clear any old content
        $("#today").empty();

        // create html content for current weather
        var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
        var card = $("<div>").addClass("card");
        var wind = $("<p>").addClass("card-text").text("Wind Speed: " + data.wind.speed + " MPH");
        var humid = $("<p>").addClass("card-text").text("Humidity: " + data.main.humidity + "%");
        var temp = $("<p>").addClass("card-text").text("Temperature: " + data.main.temp + " °F");
        var cardBody = $("<div>").addClass("card-body");
        var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png");

        // merge and add to page
        title.append(img);
        cardBody.append(title, temp, humid, wind);
        card.append(cardBody);
        $("#today").append(card);

        // call follow-up api endpoints
        getForecast(searchValue);
        //  getUVIndex(data.coord.lat, data.coord.lon);
      }
    });

    var history = JSON.parse(window.localStorage.getItem("history")) || [];
  }

  //Get Started 

});

//Obtaining uvIndex
function getUVIndex(lat, lon){
  $.ajax({
    type:"GET",
    url:"http://api.openweathermap.org/data/2.5/uvi?appid=27afc5b8ae6a5b4a4768c94dad5fc65f&lat" + lat + "&lon=" + lon,
    dataType: "json",
      success: function (data) {
        $("#uvindex").html("<h4 class = \"mt-3\" >Daily UV Index:</h4>").append("<div class=\"row\">");
        console.log(data);
        
 // create history link for this search
if (history.indexOf(searchValue) === -1) {
  history.push(searchValue);
  window.localStorage.setItem("history", JSON.stringify(history));

  makeRow(searchValue);

}

// create html content for current weather
var title = $("<h3>").addClass("card-title").text(data.name + " (" + new Date().toLocaleDateString() + ")");
var card = $("<div>").addClass("card");
var latitude = $("<p>").addClass("card-text").text("Latitude: " + data.uvindex.latitude + "Lat");
var longitude = $("<p>").addClass("card-text").text("Longitude: " + data.uvindex + "Lon");
var cardBody = $("<div>").addClass("card-body");
var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.uvindex[0].icon + ".png");

// merge and add to page
title.append(img);
cardBody.append(title, latitude,longitude, img);
card.append(cardBody);
$("#today").append(card);

}
});

var history = JSON.parse(window.localStorage.getItem("history")) || [];
}
//UV Index End

//Obatining forecast

function makeRow(text) {
  var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
  $(".history").append(li);
}

function getForecast(searchValue) {
  $.ajax({
    type: "GET",
    url: "http://api.openweathermap.org/data/2.5/forecast?q=" + searchValue + "&appid=27afc5b8ae6a5b4a4768c94dad5fc65f&units=imperial",
    dataType: "json",
    success: function (data) {
      console.log(data);
      
      $("#forecast").html("<h4 class = \"mt-3\" >5-Day Forecast:</h4>").append("<div class=\"row\">");

      //Create html content for forecast.
      for (var i = 0; i < data.list.length; i++) {
        if (data.list[i].dt_txt.indexOf("15:00:00") !== -1) {
          var card = $("<div>").addClass("card");
          var body = $("<div>").addClass("card-body p-2");
          var title = $("<h5>").addClass("card-title").text(new Date(data.list[i].dt_txt).toLocaleDateString());
          var cardBody = $("<div>").addClass("card-body");
          var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png");
          var p1 = $("<p>").addClass("card-text").text("Temp:" + data.list[i].main.temp_max + "F");
          var p2 = $("<p>").addClass("card-text").text("Humidity: " + data.list[i].main.humidity + "%");

          //Attaching results to the cards.
          //close.append(card.append(body.append(title, img, p1,p2)));
          title.append(img);
          cardBody.append(title,body, img, p1,p2);
          card.append(cardBody);
          $("#forecast").append(card)

        }
      }
    }
  });
  var dt_txt = JSON.parse(window.localStorage.getItem("dt_txt")) || [];
}






