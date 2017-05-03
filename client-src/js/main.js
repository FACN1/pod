const makeRequest = (method, url, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
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

const clickLinkListener = (element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();

    const originalUrl = document.getElementById('loadLink').href;

    console.log(event);
    makeRequest('GET', document.getElementById('loadLink').href, (err, res) => {
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

const geo = navigator.geolocation;

// If supported run:
const displayLocation = (position) => {
  // Shop Coordinates
  const NE = shopCoordinates.location.NE;
  const NW = shopCoordinates.location.NW;
  const SW = shopCoordinates.location.SW;
  const SE = shopCoordinates.location.SE;

  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  // Check if coordinates are within shop geofence

  if (latitude >= NW[0] && latitude <= NE[0] && latitude >= SW[0] && latitude <= SE[0]) {
    if (longitude >= NW[1] && longitude <= NE[1] && longitude >= SW[1] && longitude <= SE[1]) {
      return true;
    }
  } return false;
};

// Check for geo support
const getLocation = () => {
  if (geo) {
    geo.watchPosition((position) => {
      if (displayLocation(position) === true) {
        const div = document.getElementById('location');
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
