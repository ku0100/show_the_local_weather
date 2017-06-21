$(document).ready(function() {
  getLocation();
});

var city = document.getElementById("cityState");
var zip = document.getElementById("zip");
var weather = document.getElementById("weather");
var temperature = document.getElementById("temperature");
var weatherIcon = document.getElementById("weatherIcon");

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
      cityState.innerHTML = data.results[0].address_components[3].long_name + ", " + data.results[0].address_components[6].short_name;
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
    console.log(data.currently.summary);
    var weatherType = data.currently.summary;
    var currentTemp = data.currently.temperature;
    updateWeather(currentTemp);
    updateIcon(weatherType);
  });
}

function updateWeather(temp) {
  temp = Math.floor(temp);
  switch (true) {
    case (temp >= 90):
      temperature.innerHTML = temp + "&#176";
      temperature.style.color = rgb(255, 239, 0);
      break;
    case (temp >= 70):
      temperature.innerHTML = temp + "&#176";
      temperature.style.color = rgb(102, 205, 0);
      break;
    case (temp >= 50):
      temperature.innerHTML = temp + "&#176";
      temperature.style.color = white;
      break;
    default:
      temperature.innerHTML = temp + "&#176";
      temperature.style.color = rgb(175, 238, 238);
      break; }
}
