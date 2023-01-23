const states = [false, false, false, false, false, false, false, false, false, false, ];


function setup() {
  const canvasSize = min([windowWidth - 15, windowHeight - 15, 600]);
  createCanvas(canvasSize, canvasSize);
  initUi();
}

function draw() {
  background(0);
  stroke(50, 200, 250);
  const size = width / pixelNum;
  for (let i = 0; i < pixelNum; i++) {
    if (states[i]) {
      fill(255);
    } else {
      fill(0);
    }
    rect(size * i, height / 2 - size / 2, size, size);
  }
}

function mousePressed() {
  const size = width / pixelNum;
  for (let i = 0; i < pixelNum; i++) {
    const x = size * i;
    const y = height / 2 - size / 2;
    const w = size;
    const h = size;
    if (x <= mouseX && mouseX <= x + w && y <= mouseY && mouseY <= y + h) {
      states[i] = !states[i];
      const b = states[i] ? 255: 0;
      sendPixelData(i, b, b, b, 1);
      return;
    }
  }
}
