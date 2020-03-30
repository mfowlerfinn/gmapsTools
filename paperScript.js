// paper.install(window);
// Keep global references to both tools, so the HTML
// links below can access them.
let tool1;
let firstPoint;
let lastShape;
const canvas = document.getElementById("myCanvas");

function clickThrough() {
  // console.log(e);
  canvas.classList.toggle("click-through");
  console.log(canvas.classList);
  if (!canvas.classList.contains("click-through")) map.setZoom(zoom);
}

window.onload = function() {

  paper.setup(canvas);
  console.log("loading tools...");
  with (paper) {  // instead of polluting global w/ paper.install(window);
    function onMouseDown(event) {
      firstPoint = event.point;
      console.log(event.point);
    }

    let path;

    let areaLabel = new PointText({
      point: view.center,
      justification: "center",
      fontSize: 16,
      fillColor: "black"
    });

    let dimHorzLabel = new PointText({
      point: view.center,
      justification: "center",
      fontSize: 16,
      fillColor: "black"
    });
    let dimVertLabel = new PointText({
      point: view.center,
      justification: "center",
      fontSize: 16,
      fillColor: "black",
      rotation: 90
    });

    tool1 = new Tool();
    // tool1.minDistance = 20;
    tool1.onMouseDown = onMouseDown;

    tool1.onMouseDrag = function onFrame(event) {
      // use ftPerPixel from global namespace
      // Use the arcTo command to draw cloudy lines
      // path.arcTo(event.point);
      let secondPoint = event.point;
      let rectangle = new Rectangle(firstPoint, secondPoint);
      let path = new Path.Rectangle(rectangle);
      path.fillColor = "#e9e9ff";
      path.selected = true;
      path.insertBelow(areaLabel);
      path.opacity = 0.5;
      path.removeOn({
        drag: true,
        down: true
      });

      function decimal(x,n) {
        return Number(x.toFixed(n));
      }

      let boxWidth = decimal((rectangle.width * ftPerPixel), 1);
      let boxHeight = decimal((rectangle.height * ftPerPixel), 1);
      let boxArea = decimal((boxHeight * boxWidth), 0);

      areaLabel.content = boxArea;
      areaLabel.position = rectangle.center;
      dimHorzLabel.content = boxWidth;
      dimHorzLabel.position = rectangle.topCenter;
      dimHorzLabel.position.y -= 10;
      dimVertLabel.content = boxHeight;
      dimVertLabel.position = rectangle.rightCenter;
      dimVertLabel.position.x += 10;
      lastShape = {
        area: boxArea,
        width: boxWidth,
        height: boxHeight,
        y: rectangle.topLeft.y,
        x: rectangle.topLeft.x
      };

      console.log(lastShape);
    };
  }
  resizeMap();
};
