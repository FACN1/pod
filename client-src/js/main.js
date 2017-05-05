const makeRequest = (method, url, callback, payload) => {
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
  xhr.send(payload);
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
  document.getElementById('camera').click();
});

const camera = document.getElementById('camera');
// const frame = document.getElementById('frame');

camera.addEventListener('change', (e) => {
  const file = e.target.files[0];
  // const fileObject = {
  //   image: file,
  // };
  // console.log(JSON.parse(JSON.stringify(fileObject)));

  makeRequest('POST', '/card', (err) => {
    if (err) {
      console.error(err);
    }
  }, file);

  // frame.src = URL.createObjectURL(file);
});
