let serial;
let portSelect;
const pixelNum = 10;

function setup() {
  createCanvas(300, 300);
  serial = new p5.SerialPort();
  serial.list();
  serial.on('list', gotList);
  serial.on('data', gotData);

  capture = createCapture(VIDEO);
  capture.hide();
}

function draw() {
}

function keyPressed() {
  const img = capture.get();
  img.loadPixels();
  const size = 50;
  const croppedImage = img.get(
    img.pixels.width / 2 - size / 2, img.pixels.height / 2 - size / 2,
    size, size
  );
  croppedImage.loadPixels();
  const redValue = 0;
  const greenValue = 0;
  const blueValue = 0;
  for (let i = 0; i < croppedImage.pixels.length; i++) {
    redValue += red(croppedImage.pixels);
    greenValue += green(croppedImage.pixels);
    blueValue += blue(croppedImage.pixels);
  }
  redValue /= croppedImage.pixels.length;
  greenValue /= croppedImage.pixels.length;
  blueValue /= croppedImage.pixels.length;
  for (let i = 0; i < pixelNum; i++) {
    sendPixelData(i, redValue, greenValue, blueValue);
  }
}

function gotList(portList) {
  portSelect = createSelect();
  for (let port of portList) {
    portSelect.option(port);
  }

  portSelect.changed(function() {
    serial.openPort(this.selected());
  });

  serial.openPort(portSelect.selected());
}

function gotData() {
  let currentString = serial.readLine();
  console.log(currentString);
}

function sendPixelData(i, r, g, b) {
  serial.write(parseInt(i));
  serial.write(parseInt(r));
  serial.write(parseInt(g));
  serial.write(parseInt(b));
  serial.write('\n');
}
