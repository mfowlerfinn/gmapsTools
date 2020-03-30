// console.log(theme);
let map;
let myLatLng;
let zoom = 18;
let heading = -7;
let scaleImperial;
let ftPerPixel;

document.getElementById("rotate-label").textContent = `Heading: ${heading}`;
document.getElementById("zoom-label").textContent = `Zoom: ${zoom}`;
let startZoom = zoom * 100;
document.getElementById("zoom-slider").value = startZoom;
document.getElementById("rotate-slider").value = heading;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 38.60333840848405, lng: -90.25402877236166 },
    zoom: 18,
    // styles: theme,
    mapTypeId: 'satellite',
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
  // map.setCenter(myLatLng);
  // var marker = new google.maps.Marker({
  //   position: myLatLng,
  //   map: map,
  //   title: "Current Location!"
  // });
 
  
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

navigator.geolocation.getCurrentPosition(success, error, options);
const slider = document.getElementById("zoom-slider");
const rotate = document.getElementById("rotate-slider");
const scaleOptions = document.getElementById("scale-options");

let inch = 113.5; //ppi/2 macbook 13.3
// let inch = 109.5; //ppi/2 lg 4k 21.5

const getScale = () => {
  let pixelRatio = window.devicePixelRatio;
  // let metersPerPx = 156543.03392 / Math.pow(2, zoom);
  // let metersPerPx = 156543.03392 * Math.cos(myLatLng.lat * Math.PI / 180) / Math.pow(2, zoom);
  // let line = (lot / metersPerPx) * pixelRatio;
  //16.06  = length of tgp = 7625 ft = ( 1300px)
  // zoom = Math.log2(156543.03392 * Math.cos(myLatLng.lat * Math.PI / 180) * pixels / meters);
  // let ftMeters = 3.28084;
  ftPerPixel = 400717.42329 / Math.pow(2, zoom);
  let lot = 25;
  let line = lot * ftPerPixel;
  const scaleLine = document.getElementById("graphic-scale");

  scaleLine.style.width = `${inch}px`;
  let val = ftPerPixel * inch;


  scaleLine.innerText = `${val.toFixed(0)} ft`;
  // console.log({ metersPerPx, ftPerPixel, line });
  // let scaleRatio = 1 / (metersPerPx * pixelRatio);
  // document.getElementById("scale-ratio").innerText = `1:${scaleRatio}`;
};

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  zoom = this.value / 100;
  console.log({ zoom });
  map.setZoom(zoom);
  document.getElementById("zoom-label").textContent = `Zoom: ${zoom}`;
  getScale();
};

rotate.oninput = function() {
  heading = this.value;
  // console.log({ heading });
  document.getElementById("map").style.transform = `rotate(${heading}deg)`;
  document.getElementById("rotate-label").textContent = `Heading: ${heading}`;
  getScale();
  resizeMap();
};

scaleOptions.oninput = function() {
  scaleImperial = this.value; //in ft per in
  // ftPerPixel = 400717.42329 / Math.pow(2, zoom);
  zoom = Math.log2((400717.42329 * inch) / scaleImperial);
  map.setZoom(zoom);
  console.log({ zoom });
  getScale();
};



getScale();
