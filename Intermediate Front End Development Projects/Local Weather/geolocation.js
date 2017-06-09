var geocoder;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(successFunction, errorFunction);
}
//Get the latitude and the longitude;
function successFunction(position) {
  var lat = position.coords.latitude;
  var lng = position.coords.longitude;
  codeLatLng(lat, lng)
}

function errorFunction() {
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
        document.getElementById('main-container').innerHTML = results[5].formatted_address + ' ' + city.short_name + " " + city.long_name;
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
  var arr = document.getElementById('main-container').innerText;
  var farr = arr.split(',');
  console.log(farr);
  xhr.open("GET", "http://api.openweathermap.org/data/2.5/weather?q="+farr[0]+"&APPID=16b7c694b7b650ee8f7ceb88c85afc71", true);
  xhr.onload = function (e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        //console.log(xhr.responseText);
        var x = JSON.parse(xhr.responseText);
       console.log(x);
       //return x;
        document.getElementById('wether').innerHTML = JSON.stringify(x.main);
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