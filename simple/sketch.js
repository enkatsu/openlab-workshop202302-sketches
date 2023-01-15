let serial;
let portSelect;
let redValue = 0;
let greenValue = 0;
const pixelNum = 10;

function setup() {
  createCanvas(300, 300);
  serial = new p5.SerialPort();
  serial.list();
  serial.on('list', gotList);
  serial.on('data', gotData);
}

function draw() {
  background(redValue, greenValue, 0);
}

function mouseMoved() {
  redValue = parseInt(map(mouseX, 0, width, 0, 255));
  greenValue = parseInt(map(mouseY, 0, height, 0, 255));
  for (let i = 0; i < pixelNum; i++) {
    sendPixelData(i, redValue, greenValue, 0);
  }
}

function touchMoved() {
  redValue = map(mouseX, 0, width, 0, 255);
  greenValue = map(mouseY, 0, height, 0, 255);
  for (let i = 0; i < pixelNum; i++) {
    sendPixelData(i, redValue, greenValue, 0);
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
