//authored by Matt Fowlerfinn
const canvas = document.getElementById("myCanvas");
const buttons = document.querySelectorAll(".button");
let tool1;
let firstPoint;
let lastShape;

function clickThrough(bool) {
  if (bool === true) {
    canvas.classList.add("click-through");
  } else {
    map.setZoom(zoom);
    canvas.classList.remove("click-through");
  }
}

function switchTools(e) {
  toolId = e.target.id;
  document.getElementById(toolId).classList.toggle("active");
  buttons.forEach( button => {
    if (button.id != toolId) button.classList.remove("active");
  });
  // if (toolId === "pan-button") clickThrough();
  buttons.forEach( button => {
    let bool = button.classList.contains("active");
    switch (button.id) {
      case "pan-button": clickThrough(bool) 
        break;
      case "area-button": areaTool(bool) 
        break;
      default:
        break;
    }
  });
  // console.log(buttons);
}

function areaTool(bool) {
  (bool)? tool1.activate() : toolIdle.activate();
}

window.onload = function() {

  paper.setup(canvas);
  // console.log("loading tools...");
  with (paper) {  // instead of polluting global w/ paper.install(window);
    function onMouseDown(event) {
      firstPoint = event.point;
      // console.log(event.point);
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
      fillColor: "black",
      // strokeColor: "black",
      // strokeWidth: 1,
      // shadowColor: "black",
      // Set the shadow blur radius to 12:
      // shadowBlur: 5,
      // Offset the shadow by { x: 5, y: 5 }
      // shadowOffset: new Point(5, 5)
    });
    let dimVertLabel = new PointText({
      point: view.center,
      justification: "center",
      fontSize: 16,
      fillColor: "black",
      rotation: 90,
      // selected: true,
      background: "white"
    });

    toolIdle = new Tool();




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
        return (x.toFixed(n));
      }

      let boxWidth = decimal((rectangle.width * ftPerPixel), 1);
      let boxHeight = decimal((rectangle.height * ftPerPixel), 1);
      let boxArea = decimal((boxHeight * boxWidth), 0);

      areaLabel.content = `${boxArea} sf`;
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
      
      let radius = new Size(5,5);


      let dimVertBackRect = new Path.Rectangle(dimVertLabel.bounds.expand(1,10), radius);
      dimVertBackRect.fillColor = 'white';
      // dimVertBackRect.opacity = 0.8;

      // backRect.strokeColor = 'black';
      dimVertLabel.insertAbove(dimVertBackRect);
      dimVertBackRect.removeOn({
        drag: true,
        down: true
      });

      let dimHorzBackRect = new Path.Rectangle(dimHorzLabel.bounds.expand(10,1), radius);
      dimHorzBackRect.fillColor = 'white';
      // dimHorzBackRect.opacity = 0.8;
      // backRect.strokeColor = 'black';
      dimHorzLabel.insertAbove(dimHorzBackRect);
      dimHorzBackRect.removeOn({
        drag: true,
        down: true
      });


      let areaBackRect = new Path.Rectangle(areaLabel.bounds.expand(10,1),radius);
      areaBackRect.fillColor = 'white';
      // areaBackRect.opacity = 0.8;
      // backRect.strokeColor = 'black';
      areaLabel.insertAbove(areaBackRect);
      areaBackRect.removeOn({
        drag: true,
        down: true
      });

      

      console.log(lastShape);
    };
  }
  resizeMap();
  document.getElementById("area-button").click();

  
};
