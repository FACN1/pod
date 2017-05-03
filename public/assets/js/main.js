"use strict";
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
  var latitude = position.coords.latitude;
  console.log(latitude);
  var longitude = position.coords.longitude;
  console.log(longitude);
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

console.log(shopCoordinates);

function addOne(input) {
  return input + 1;
}

addOne(1);
"use strict";
//# sourceMappingURL=main.js.map
