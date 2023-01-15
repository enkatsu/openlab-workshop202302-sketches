let serial;
let hostNameInput, portNumberInput, portSelect, updateSerialConnectionButton;
const pixelNum = 10;
let pixelBrightness = 0;

function setup() {
  createCanvas(300, 300);
  hostNameInput = createInput('localhost');
  portNumberInput = createInput(8081, 'number');
  updateSerialConnectionButton = createButton('update serial connection');
  updateSerialConnectionButton.mousePressed(updateSerialConnection);
  portSelect = createSelect();
  updateSerialConnection();
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

function updateSerialConnection() {
  if (serial && serial.isConnected()) {
    serial.closePort();
  }

  serial = new p5.SerialPort(hostNameInput.value(), portNumberInput.value());
  serial.list();
  serial.on('list', gotList);
  serial.on('data', gotData);
}

function gotList(portList) {
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
