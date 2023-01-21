let bgColor;

function setup() {
  createCanvas(300, 300);
  initUi();

  capture = createCapture(VIDEO);
  capture.hide();

  bgColor = color(0, 0, 0);
}

function draw() {
  background(bgColor);
}

function keyPressed() {
  const img = capture.get();
  img.loadPixels();
  const size = 50;
  const croppedImage = img.get(
    img.width / 2 - size / 2,
    img.height / 2 - size / 2,
    size, size
  );
  croppedImage.loadPixels();
  let redValue = 0;
  let greenValue = 0;
  let blueValue = 0;
  for (let i = 0; i < croppedImage.pixels.length; i++) {
    redValue += red(croppedImage.pixels[i]);
    greenValue += green(croppedImage.pixels[i]);
    blueValue += blue(croppedImage.pixels[i]);
  }
  redValue /= croppedImage.pixels.length;
  greenValue /= croppedImage.pixels.length;
  blueValue /= croppedImage.pixels.length;
  for (let i = 0; i < pixelNum; i++) {
    sendPixelData(i, redValue, greenValue, blueValue);
  }
  bgColor = color(redValue, greenValue, blueValue);
}
