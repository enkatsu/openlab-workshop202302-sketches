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
  redValue = parseInt(map(mouseX, 0, width, 0, 255));
  greenValue = parseInt(map(mouseY, 0, height, 0, 255));
  for (let i = 0; i < pixelNum; i++) {
    const isLast = i === pixelNum - 1;
    sendPixelData(i, redValue, greenValue, 0, isLast ? 1 : 0);
  }
}

function touchMoved() {
  redValue = map(mouseX, 0, width, 0, 255);
  greenValue = map(mouseY, 0, height, 0, 255);
  for (let i = 0; i < pixelNum; i++) {
    const isLast = i === pixelNum - 1;
    sendPixelData(i, redValue, greenValue, 0, isLast ? 1 : 0);
  }
}
