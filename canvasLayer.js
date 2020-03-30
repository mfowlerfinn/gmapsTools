var canvas = document.getElementById("myCanvas");
var dpr = window.devicePixelRatio || 1;
var rect = canvas.getBoundingClientRect();
// Give the canvas pixel dimensions of their CSS
// size * the device pixel ratio.
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
var ctx = canvas.getContext("2d");
ctx.scale(dpr, dpr);
ctx.moveTo(0, 0);
ctx.lineTo(200, 100);
ctx.stroke();

let started = false;
let lineData = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0
};

function evalDistance() {
  // let hypot = Math.hypot(lineData.x2-lineData.x1, lineData.y2-lineData.y1)
  let ftPerPixel = 400717.42329 / Math.pow(2, zoom);
  // let dist = hypot * ftPerPixel;
  let width = lineData.x2 * ftPerPixel;
  let height = lineData.y2 * ftPerPixel;
  let area = width * height;
  console.log({ width, height, area });
}

function handleLine(e) {
  console.log(e);
  let x = e.layerX;
  let y = e.layerY;
  console.log(lineData);

  if (started === false) {
    lineData.x1 = x;
    lineData.y1 = y;

    console.log("start");
    started = true;
  } else {
    lineData.x2 = x - lineData.x1;
    lineData.y2 = y - lineData.y1;
    ctx.beginPath();
    ctx.rect(lineData.x1, lineData.y1, lineData.x2, lineData.y2);
    ctx.stroke();
    console.log("end");
    started = false;
    evalDistance();
  }
}
// function handleLine(e) {
//   console.log(e);
//   let x = e.layerX;
//   let y = e.layerY;
//   console.log(lineData);

//   if (started === false) {
//     lineData.x1 = x;
//     lineData.y1 = y;

//     console.log('start');
//     started = true;
//   }
//   else {
//     lineData.x2 = x;
//     lineData.y2 = y;
//     ctx.beginPath();
//     ctx.moveTo(lineData.x1, lineData.y1);
//     ctx.lineTo(x, y);
//     ctx.stroke();
//     console.log('end');
//     started = false;
//     evalDistance();
//   }

// }

canvas.addEventListener("click", handleLine);
