
function setup() {
  const canvasSize = min([windowWidth - 15, windowHeight - 15, 600]);
  createCanvas(canvasSize, canvasSize);
  initUi();
}

function draw() {
  background(0);

  noStroke();
  const rad = 50;
  for (let i = 0; i < pixelNum; i++) {
    const rx = cos(rotationX) * rad + width / 2;
    const ry = sin(rotationX) * rad + height / 2;
    const angle = TWO_PI / pixelNum * i;
    const x = cos(angle) * rad + width / 2;
    const y = sin(angle) * rad + height / 2;
    const d = dist(x, y, rx, ry);
    ellipse(x, y, d * 0.1, d * 0.1);
    if (serial) {
      sendPixelData(i, d, d, d);
    }
  }
}
