let pixelBrightness = 0;

function setup() {
  createCanvas(300, 300);
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
