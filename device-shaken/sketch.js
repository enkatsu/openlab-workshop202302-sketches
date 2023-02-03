let pixelBrightness = 0;

function setup() {
  const canvasSize = min([windowWidth - 15, windowHeight - 15, 600]);
  createCanvas(canvasSize, canvasSize);
  initUi();
}

function draw() {
  background(pixelBrightness);
  fill(255);
  text(pixelBrightness, 100, 100)
}

function deviceShaken() {
  if (pixelBrightness > 255) {
    return;
  }

  pixelBrightness += 5;
  
  for (let i = 0; i < pixelNum; i++) {
    sendPixelData(i, pixelBrightness, pixelBrightness, pixelBrightness);
  }
}
