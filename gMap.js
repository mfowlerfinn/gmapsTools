//authored by Matt Fowlerfinn
let map;
let myLatLng;
let zoom = 17.7949;
let heading = 0;
let scaleImperial;
let ftPerPixel;


function updateZoomSlider(zoom) {
  document.getElementById("zoom-label").textContent = `Zoom: ${zoom.toFixed(2)}`;
  document.getElementById("zoom-slider").value = zoom * 100;
}

function rotateOnStart(deg) {
  heading = deg;
  document.getElementById("rotate-label").textContent = `Heading: ${heading}`;
  document.getElementById("rotate-slider").value = heading;
  document.getElementById("map").style.transform = `rotate(${heading}deg)`;
  setInterval(function(){document.getElementById("map").classList.remove("one-sec-trans")}, 1500);
}

updateZoomSlider(zoom);

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    // styles: theme,
    mapTypeId: "satellite",
    // gestureHandling: 'none',
    disableDefaultUI: true
  });
  map.setTilt(0);
}

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  myLatLng = { lat: pos.coords.latitude, lng: pos.coords.longitude };

  console.log("Your current position is:");
  console.log(`Latitude : ${pos.coords.latitude}`);
  console.log(`Longitude: ${pos.coords.longitude}`);
  console.log(`More or less ${pos.coords.accuracy} meters.`);
  map.setCenter(myLatLng);
  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: "Current Location!"
  });
  rotateOnStart(heading);
}

function error(err) {
  // console.warn(`ERROR(${err.code}): ${err.message}`);
  alert("You didn't share your location, so I'll set the location to St. Louis, MO instead.");
  let stl = { lat: 38.6270, lng: -90.1994 };
  map.setCenter(stl);
  rotateOnStart(-17);
  resizeMap();
}

navigator.geolocation.getCurrentPosition(success, error, options);
const slider = document.getElementById("zoom-slider");
const rotate = document.getElementById("rotate-slider");
const scaleOptions = document.getElementById("scale-options");

let inch = 113.5; //ppi/2 macbook 13.3
// let inch = 109.5; //ppi/2 lg 4k 21.5

const getScale = () => {
  let pixelRatio = window.devicePixelRatio;
  ftPerPixel = 400717.42329 / Math.pow(2, zoom);
  let lot = 25;
  let line = lot * ftPerPixel;
  const scaleLine = document.getElementById("graphic-scale");

  scaleLine.style.width = `${inch}px`;
  let val = ftPerPixel * inch;

  scaleLine.innerText = `${val.toFixed(0)} ft`;
};

slider.oninput = function() {
  zoom = this.value / 100;
  console.log({ zoom });
  map.setZoom(zoom);
  document.getElementById("zoom-label").textContent = `Zoom: ${zoom}`;
  getScale();
};

rotate.oninput = function() {
  heading = this.value;
  document.getElementById("map").style.transform = `rotate(${heading}deg)`;
  document.getElementById("rotate-label").textContent = `Heading: ${heading}`;
  getScale();
  resizeMap();
};

scaleOptions.oninput = function() {
  scaleImperial = this.value; //in ft per in
  zoom = Math.log2((400717.42329 * inch) / scaleImperial);
  map.setZoom(zoom);
  console.log({ zoom });
  updateZoomSlider(zoom);
  getScale();
};

getScale();
