'use strict';

var geo = navigator.geolocation;

// If supported run:
var displayLocation = function displayLocation(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var div = document.getElementById('location');
  div.innerHTML = 'You are at Latitude: ' + latitude + ', Longitude: ' + longitude;
};

// Check for geo support
var getLocation = function getLocation() {
  if (geo) {
    geo.watchPosition(displayLocation);
  } else {
    alert('Geolocation API not supported');
  }
};

window.onload = getLocation;
//# sourceMappingURL=main.js.map
