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
  background(0);
  noStroke();
  const radius = 50;
  for (let i = 0; i < 10; i++) {
    const rad = TWO_PI / 10 * i;
    const n = cyclicNoise(rad, frameCount * 0.01);
    const x = cos(rad) *  radius * n + width / 2;
    const y = sin(rad) *  radius * n + height / 2;
    ellipse(x, y, 3, 3);
    const redValue = map(n, 0, 1, 127, 255);
    const greenValue = map(n, 0, 1, 0, 255);
    const blueValue = map(n, 0, 1, 0, 255);
    sendPixelData(i, redValue, greenValue, blueValue);
  }
}

/**
 * 参考文献: https://note.com/deconbatch/n/nc14219bfacc6
 * @param {*} rad 
 * @param {*} t 
 * @returns 
 */
function cyclicNoise(rad, t) {
  let xInit = 1000;
  let yInit = 1000;
  let rBase = 100;
  return noise(
    xInit + rBase * cos(rad) * 0.01 * t,
    yInit + rBase * sin(rad) * 0.01 * t,
  );
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
