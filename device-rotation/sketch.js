let serial;
let portSelect;
const pixelNum = 10;

function setup() {
  createCanvas(300, 300);
  serial = new p5.SerialPort();
  serial.list();
  serial.on('list', gotList);
  serial.on('data', gotData);
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
    sendPixelData(i, d, d, d);
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
