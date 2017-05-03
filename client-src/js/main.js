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
  const latitude = position.coords.latitude;
  console.log(latitude);
  const longitude = position.coords.longitude;
  console.log(longitude);
  const div = document.getElementById('location');
  div.innerHTML = `You are at Latitude: ${latitude}, Longitude: ${longitude}`;
};

// Check for geo support
const getLocation = () => {
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
