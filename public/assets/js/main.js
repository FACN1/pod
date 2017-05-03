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

var cCardLink = document.getElementById('loadLink');

var clickLinkListener = function clickLinkListener(element) {
  element.addEventListener('click', function (event) {
    event.preventDefault();

    var originalUrl = cCardLink.href;

    console.log(event);
    makeRequest('GET', cCardLink.href, function (err, res) {
      if (err) {
        console.error(err);
        return;
      }
      document.getElementById('outerContainer').innerHTML = res;
      window.history.pushState(null, null, originalUrl.split('?ajax=true')[0]);

      clickLinkListener(cCardLink);
    });
  });
};

clickLinkListener(cCardLink);

var geo = navigator.geolocation;

// If geolocation supported run:
var displayLocation = function displayLocation(position) {
  // Store position
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  // Set point to validate
  var P = [latitude, longitude];
  // Shop Coordinates
  var A = shopCoordinates.location.NE;
  var B = shopCoordinates.location.NW;
  var C = shopCoordinates.location.SW;
  var D = shopCoordinates.location.SE;
  // Set Array of latitude, Array of longitude
  var X = [A[0], B[0], C[0], D[0]];
  var Y = [A[1], B[1], C[1], D[1]];
  // Sort
  X = X.sort(function (a, b) {
    return a - b;
  });
  Y = Y.sort(function (a, b) {
    return a - b;
  });
  // Check if coordinates are within shop geofence
  if (P[0] >= X[0] && P[0] <= X[3]) {
    if (P[1] >= Y[0] && P[1] <= Y[3]) {
      // Show link
      cCardLink.style.display = 'flex';
      return true;
    }
  }
  // Hide link
  cCardLink.style.display = 'none';
  return false;
};

// Check for geo support
var getLocation = function getLocation() {
  var div = document.getElementById('location');
  if (geo) {
    geo.watchPosition(function (position) {
      if (displayLocation(position)) {
        div.innerHTML = 'Welcome to Khan El Shopa';
      } else {
        div.innerHTML = '';
      }
    });
  } else {
    alert('Geolocation API not supported');
  }
};

window.onload = getLocation;
//# sourceMappingURL=main.js.map
