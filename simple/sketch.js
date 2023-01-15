let serial;
let hostNameInput, portNumberInput, portSelect, updateSerialConnectionButton;
const pixelNum = 10;
let redValue = 0;
let greenValue = 0;


function setup() {
  createCanvas(300, 300);
  initUi();
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

function initUi() {
  hostNameInput = createInput('localhost');
  portNumberInput = createInput(8081, 'number');
  updateSerialConnectionButton = createButton('update serial connection');
  updateSerialConnectionButton.mouseClicked(updateSerialConnection);
  updateSerialConnectionButton.touchEnded(updateSerialConnection);
  portSelect = createSelect();
  portSelect.changed(function() {
    serial.openPort(this.selected());
  });
}

function updateSerialConnection() {
  if (serial && serial.isConnected()) {
    serial.closePort();
  }

  serial = new p5.SerialPort(hostNameInput.value(), portNumberInput.value());
  serial.on('list', gotList);
  serial.on('data', gotData);
  serial.list();
}

function gotList(portList) {
  for (let port of portList) {
    portSelect.option(port);
  }

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
