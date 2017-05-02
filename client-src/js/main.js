const geo = navigator.geolocation;

// If supported run:
const displayLocation = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
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
