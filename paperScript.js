// paper.install(window);
// Keep global references to both tools, so the HTML
// links below can access them.
var tool1, tool2;
let firstPoint;
let lastShape;
let canvas = document.getElementById("myCanvas");

function clickThrough() {
  // console.log(e);
  canvas.classList.toggle("click-through");
  console.log(canvas.classList);
}

window.onload = function() {
  // paper.install(window);
  paper.setup(canvas);

  // Create two drawing tools.
  // tool1 will draw straight lines,
  // tool2 will draw clouds.

  // Both share the mouseDown event:
  // var path;
  with (paper) {
    function onMouseDown(event) {
      // path = new Path();
      // path.strokeColor = 'black';
      // path.add(event.point);
      firstPoint = event.point;

      console.log(event.point);
      // rect();
    }

    tool1 = new Tool();
    tool1.onMouseDown = onMouseDown;

    tool1.onMouseDrag = function(event) {
      // path.add(event.point);
      console.log("tool 1");
    };

    var text = new PointText({
      point: view.center,
      justification: "center",
      fontSize: 30,
      fillColor: "white"
    });

    // Define a random point in the view, which we will be moving
    // the text item towards.
    var destination = Point.random() * view.size;

    // var rectangle = new Rectangle(firstPoint, event.point);
    // var path = new Path.Rectangle(rectangle);

    // function rect() {
    //   path = new Path.Rectangle({
    //     from: firstPoint,
    //     to: [400,400],
    //     strokeColor: 'black'
    //   });
    // }
    var path;

    var areaLabel = new PointText({
      point: view.center,
      justification: "center",
      fontSize: 16,
      fillColor: "black"
    });

    var dimHorzLabel = new PointText({
      point: view.center,
      justification: "center",
      fontSize: 16,
      fillColor: "black"
    });
    var dimVertLabel = new PointText({
      point: view.center,
      justification: "center",
      fontSize: 16,
      fillColor: "black",
      rotation: 90
    });

    tool2 = new Tool();
    // tool2.minDistance = 20;
    tool2.onMouseDown = onMouseDown;

    tool2.onMouseDrag = function onFrame(event) {
      // use ftPerPixel from global namespace
      // Use the arcTo command to draw cloudy lines
      // path.arcTo(event.point);
      let secondPoint = event.point;
      var rectangle = new Rectangle(firstPoint, secondPoint);
      var path = new Path.Rectangle(rectangle);
      path.fillColor = "#e9e9ff";
      path.selected = true;
      path.insertBelow(areaLabel);
      path.opacity = 0.5;
      path.removeOn({
        drag: true,
        down: true
      });

      let boxWidth = rectangle.width * ftPerPixel;
      let boxHeight = rectangle.height * ftPerPixel;
      let boxArea = boxHeight * boxWidth;

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
};
