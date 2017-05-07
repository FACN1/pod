const makeRequest = (method, url, callback, payload, header) => {
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
  if (header) xhr.setRequestHeader(header[0], header[1]);
  if (payload) return xhr.send(payload);
  return xhr.send(payload);
};


const cCardLink = document.querySelector('.visa-img');

// const clickLinkListener = (element) => {
//   element.addEventListener('click', (event) => {
//     event.preventDefault();
//
//     const originalUrl = cCardLink.href;
//
//     console.log(event);
//     makeRequest('GET', cCardLink.href, (err, res) => {
//       if (err) {
//         console.error(err);
//         return;
//       }
//       document.getElementById('outerContainer').innerHTML = res;
//       window.history.pushState(null, null, originalUrl.split('?ajax=true')[0]);
//
//       clickLinkListener(cCardLink);
//     });
//   });
// };
//
// clickLinkListener(cCardLink);

const geo = navigator.geolocation;

// If geolocation supported run:
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
const getLocation = () => {
  const div = document.getElementById('location');
  if (geo) {
    geo.watchPosition((position) => {
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

document.querySelector('.visa-img').addEventListener('click', (/* event */) => {
  document.getElementById('cardCamera').click();
});

const camera = document.getElementById('cardCamera');
// const frame = document.getElementById('frame');
let token = '';

const scanCamera = (route, targetDestination, file) => {
  makeRequest('POST', 'card', (err, res) => {
    if (err) {
      return console.error(err);
    }
    const responseObj = JSON.parse(res);
    token = responseObj.token;

    return makeRequest('GET', `${targetDestination}?ajax=true`, (routeErr, cartRes) => {
      if (routeErr) {
        return console.error(routeErr);
      }
      document.getElementById('outerContainer').innerHTML = cartRes;

      const itemCamera = document.getElementById('itemCamera');
      itemCamera.addEventListener('change', (e) => {
        scanCamera(targetDestination, e.target.files[0]);
      });

      return window.history.pushState(null, null, targetDestination);
    }, null, ['Authorization', token]);
  }, file, token);
};

camera.addEventListener('change', (e) => {
  scanCamera('/card', '/cart', e.target.files[0]);
});
