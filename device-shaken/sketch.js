let serial;
let portSelect;
let pixelBrightness = 0;
const pixelNum = 10;

function setup() {
  createCanvas(300, 300);
  serial = new p5.SerialPort();
  serial.list();
  serial.on('list', gotList);
  serial.on('data', gotData);
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
