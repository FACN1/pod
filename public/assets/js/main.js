'use strict';

var makeRequest = function makeRequest(method, url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        callback(null, xhr.responseText);
      } else {
        callback(new Error('Status Code: ', xhr.status));
      }
    }
  };

  xhr.open(method, url);
  xhr.send();
};

var clickLinkListener = function clickLinkListener(element) {
  element.addEventListener('click', function (event) {
    event.preventDefault();

    var originalUrl = document.getElementById('loadLink').href;

    console.log(event);
    makeRequest('GET', document.getElementById('loadLink').href, function (err, res) {
      if (err) {
        console.error(err);
        return;
      }
      document.getElementById('outerContainer').innerHTML = res;
      window.history.pushState(null, null, originalUrl.split('?ajax=true')[0]);

      clickLinkListener(document.getElementById('loadLink'));
    });
  });
};

clickLinkListener(document.getElementById('loadLink'));

var geo = navigator.geolocation;

// If supported run:
var displayLocation = function displayLocation(position) {
  // Shop Coordinates
  var NE = shopCoordinates.location.NE;
  var NW = shopCoordinates.location.NW;
  var SW = shopCoordinates.location.SW;
  var SE = shopCoordinates.location.SE;

  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;

  // Check if coordinates are within shop geofence

  if (latitude >= NW[0] && latitude <= NE[0] && latitude >= SW[0] && latitude <= SE[0]) {
    if (longitude >= NW[1] && longitude <= NE[1] && longitude >= SW[1] && longitude <= SE[1]) {
      return true;
    }
  }return false;
};

// Check for geo support
var getLocation = function getLocation() {
  if (geo) {
    geo.watchPosition(function (position) {
      if (displayLocation(position) === true) {
        var div = document.getElementById('location');
        div.innerHTML = 'Welcome to Khan El Shopa';
      } else {
        console.log('Not in the shop');
      }
    });
  } else {
    alert('Geolocation API not supported');
  }
};

window.onload = getLocation;
//# sourceMappingURL=main.js.map
