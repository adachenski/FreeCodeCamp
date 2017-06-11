var geocoder;

if (navigator.geolocation) {
  //document.getElementById('main-container').style.display = 'none';
  navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}
//Get the latitude and the longitude;
function successFunction(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  codeLatLng(lat, lng)
}

function errorFunction() {
   var bodyObj = document.getElementsByTagName("BODY")[0];
  bodyObj.style.backgroundImage = "url('http://hdqwalls.com/wallpapers/404-error-girlfriend-not-found.jpg')";
  alert("Geocoder failed");
}

function initialize() {
  geocoder = new google.maps.Geocoder();

}

function codeLatLng(lat, lng) {

  var latlng = new google.maps.LatLng(lat, lng);
  geocoder.geocode({ 'latLng': latlng }, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
      if (results[1]) {
        //formatted address
        // alert(results[0].formatted_address)
        //find country name
        for (var i = 0; i < results[0].address_components.length; i++) {
          for (var b = 0; b < results[0].address_components[i].types.length; b++) {

            //there are different types that might hold a city admin_area_lvl_1 usually does in come cases looking for sublocality type will be more appropriate
            if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
              //this is the object you are looking for
              city = results[0].address_components[i];
              break;
            }
          }
        }
        //city data
        document.getElementById('main-address').innerHTML = "<h2>" + results[5].formatted_address + "</h2>";
        asincWether();
        // alert(city.short_name + " " + city.long_name)


      } else {
        alert("No results found");
      }
    } else {
      alert("Geocoder failed due to: " + status);

    }
  });
};

function asincWether() {
  var xhr = new XMLHttpRequest();
  var arr = document.getElementById('main-address').innerText;
  var city = arr.split(',');
  console.log(city);
  xhr.open("GET", "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?q=" + city[0] + "&APPID=16b7c694b7b650ee8f7ceb88c85afc71", true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var x = JSON.parse(xhr.responseText);
        var tempToFahrenheit = parseInt(JSON.stringify(x.main.temp) * (9 / 5) - 459.67);
        var tempToCelsius = parseInt(tempToFahrenheit - 32 * (5 / 9));
        var bodyObj = document.getElementsByTagName("BODY")[0];
        if (tempToCelsius > 5 && tempToCelsius < 20) {
          bodyObj.style.backgroundImage = "url('https://s-media-cache-ak0.pinimg.com/originals/bf/4d/09/bf4d0933bf5b3b2b106ba995d25121ff.jpg')";
        }
        else if (tempToCelsius > 20) {
          bodyObj.style.backgroundImage = "url('https://wallpaperscraft.com/image/spring_alpine_valley_mountains_fields_landscape_93132_1920x1080.jpg')";
        }
        else if (tempToCelsius < 5) {
          bodyObj.style.backgroundImage = "url('http://vunature.com/wp-content/uploads/2016/11/mountains-clouds-landscapes-cold-sun-winter-snow-sunlight-forest-sky-seasons-white-trees-nature-pictures-national-geographic-1920x1080.jpg')";
        }
        var humidity = x.main.humidity;
        var windMPH = parseInt(JSON.stringify(x.wind.speed) * 360000 / (5280 * 12 * 2.54));
        var windKPH = parseInt(windMPH * 1.609344);
        var weatherImg = x.weather[0].icon;
        var description = x.weather[0].description;
        console.log(x);
        document.getElementById('weather-img').innerHTML = "<img " + '<img  src="http://openweathermap.org/img/w/' + weatherImg + '.png">';
        document.getElementById('stats-usa').innerHTML = "Temp: " + tempToFahrenheit + " F</br> Wind: " + windMPH + " mph";
        document.getElementById('stats-europa').innerHTML = "Temp: " + tempToCelsius + " C</br> Wind: " + windKPH + " kph";
        document.getElementById('stats-two').innerHTML = "humidity: " + humidity + " % </br>" + description;
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.onerror = function (e) {
    console.error(xhr.statusText);
  };
  xhr.send(null);
}
function convertUnits() {
  var statsUsa = document.getElementById('stats-usa');
  var statsEuropa = document.getElementById('stats-europa');

  if (statsUsa.style.display == 'none' && statsEuropa.style.display == 'block') {
    statsUsa.style.display = 'block';
    statsEuropa.style.display = 'none'
  }
  else {
    statsUsa.style.display = 'none';
    statsEuropa.style.display = 'block';
  }
}