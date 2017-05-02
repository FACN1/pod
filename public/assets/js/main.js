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
    console.log(event);
    makeRequest('GET', event.path[0].href, function (err, res) {
      if (err) {
        console.error(err);
        return;
      }
      document.getElementById('outerContainer').innerHTML = res;
      window.history.pushState(null, null, event.path[0].href.split('?ajax=true')[0]);

      clickLinkListener(document.getElementById('loadLink'));
    });
  });
};

clickLinkListener(document.getElementById('loadLink'));

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
