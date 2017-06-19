$(document).ready(function() {
  getLocation();
});

var city = document.getElementById("city");
var state = document.getElementById("state");
var zip = document.getElementById("zip");
var weather = document.getElementById("weather");

function getLocation() {
    if (navigator.geolocation) {
      console.log("success?");
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
}

function showPosition(position) { // called if getCurrentPosition from getLoation is successful
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var latLng = latitude + "," + longitude;
  console.log(latLng);
  var mapAPI = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latLng + "&key=AIzaSyCrBXi8S59gACwn12nVTZzUWuWxzELnzKg";
  var weatherAPI = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/483032d484108a5b5b4e8ca7c41c40c0/" + latLng;
  getMapInfo(mapAPI);
  getWeatherInfo(weatherAPI);
  console.log(weatherAPI);
}

function getMapInfo(url) {
  fetch(url, {method: 'GET'}).then(function(response) {
    response.json().then(function(data) {
      city.innerHTML = data.results[0].address_components[3].long_name + ",";
      state.innerHTML = data.results[0].address_components[6].short_name;
      zip.innerHTML = data.results[0].address_components[8].long_name;
    })
  })
};

function getWeatherInfo(weatherURL) {
  fetch(weatherURL, {
    method: 'GET',
  }).then(function(response) {
    return response.json();
  }).then(function(data) {
      weather.innerHTML = data.currently.summary;
  });
}
