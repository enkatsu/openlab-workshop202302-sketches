let pixelBrightness = 0;

function setup() {
  const canvasSize = min([windowWidth - 15, windowHeight - 15, 600]);
  createCanvas(canvasSize, canvasSize);
  initUi();
}

function draw() {
  background(pixelBrightness);
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
