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

const cCardLink = document.getElementById('loadLink');

const clickLinkListener = (element) => {
  element.addEventListener('click', (event) => {
    event.preventDefault();

    const originalUrl = cCardLink.href;

    console.log(event);
    makeRequest('GET', cCardLink.href, (err, res) => {
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

const geo = navigator.geolocation;

// If supported run:
const displayLocation = (position) => {
  // Store position
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  // Set point to validate
  const P = [latitude, longitude];
  // Shop Coordinates
  const A = shopCoordinates.location.NE;
  const B = shopCoordinates.location.NW;
  const C = shopCoordinates.location.SW;
  const D = shopCoordinates.location.SE;
  // Set Array of latitude, Array of longitude
  let X = [A[0], B[0], C[0], D[0]];
  let Y = [A[1], B[1], C[1], D[1]];
  // Sort
  X = X.sort((a, b) => a - b);
  Y = Y.sort((a, b) => a - b);
  // Check if coordinates are within shop geofence
  if (P[0] >= X[0] && P[0] <= X[3]) {
    if (P[1] >= Y[0] && P[1] <= Y[3]) {
      return true;
    }
  }
  return false;
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
