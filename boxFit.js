//box fitting
let clientH, clientW, percentH, percentW, offsetH, offsetW;

clientH = window.innerHeight;
clientW = window.innerWidth;
const degreesPerRadian = ( 2 * Math.PI ) / 360;
const rightAngle = (Math.PI / 2);

function boxFit() {
  clientH = window.innerHeight;
  clientW = window.innerWidth;
  let inputAngle = Math.abs(heading) * degreesPerRadian;
  let baseA = Math.atan2(clientH, clientW);
  let hypo = Math.hypot(clientH, clientW);
  let A = inputAngle + baseA;
  let overflowH = Math.sin(A) * hypo;

  let baseB = rightAngle - baseA;
  let B = baseB + inputAngle;
  let overflowW = Math.sin(B) * hypo;

  percentH = overflowH / clientH * 100;
  percentW = overflowW / clientW * 100;

  offsetH = (overflowH - clientH) / 2;
  offsetW = (overflowW - clientW) / 2;

  // console.log({clientH, clientW, percentW, percentH});
}


function resizeMap() {
  boxFit();
  let mapElement = document.getElementById("map");
  mapElement.classList.remove("full");
  mapElement.style.height = `${percentH}%`;
  mapElement.style.width = `${percentW}%`;
  mapElement.style.top = `-${offsetH}px`;
  mapElement.style.left = `-${offsetW}px`;
}

window.onresize = resizeMap;