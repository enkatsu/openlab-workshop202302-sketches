let redValue = 0;
let greenValue = 0;


function setup() {
  const canvasSize = min([windowWidth - 15, windowHeight - 15, 600]);
  createCanvas(canvasSize, canvasSize);
  initUi();
}

function draw() {
  background(redValue, greenValue, 0);
}

function mouseMoved() {
  if (serial) {
    redValue = parseInt(map(mouseX, 0, width, 0, 255));
    greenValue = parseInt(map(mouseY, 0, height, 0, 255));
    for (let i = 0; i < pixelNum; i++) {
      sendPixelData(i, redValue, greenValue, 0);
    }
  }
}

function touchMoved() {
  if (serial) {
    redValue = map(mouseX, 0, width, 0, 255);
    greenValue = map(mouseY, 0, height, 0, 255);
    for (let i = 0; i < pixelNum; i++) {
      sendPixelData(i, redValue, greenValue, 0);
    }
  }
}
