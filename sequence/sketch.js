const sequence = [
  [true, false, false, false, false, false, false, false, true, false, ],
  [false, true, false, false, false, false, false, false, false, true, ],
  [false, false, true, false, false, false, false, false, false, false, ],
  [false, false, false, true, false, false, false, false, false, false, ],
  [false, false, false, false, true, false, false, false, false, false, ],
  [false, false, false, false, false, true, false, false, false, false, ],
  [false, false, false, false, false, false, true, false, false, false, ],
  [false, false, false, false, false, false, false, true, false, false, ],
];
let current = 0;

function setup() {
  const canvasSize = min([windowWidth - 15, windowHeight - 15, 600]);
  createCanvas(canvasSize, canvasSize);
  initUi();
}

function draw() {
  background(0);

  for (let i = 0; i < sequence.length; i++) {
    const pixels = sequence[i];
    for (let j = 0; j < pixels.length; j++) {
      if (i === current) {
        stroke(255, 0, 0);
      } else {
        stroke(100);
      }
      if (pixels[j]) {
        fill(255);
      } else {
        fill(0);
      }

      const w = width / sequence.length;
      const h = height / pixels.length;
      rect(w * i + 1 * i, h * j + 1 * j, w - 1, h - 1);
    }
  }

  if (frameCount % 30 === 0) {
    current++;
    if (current >= sequence.length) {
      current = 0;
    }

    for (let i = 0; i < sequence[current].length; i++) {
      const isLast = i === (pixelNum - 1);
      if (sequence[current][i]) {
        sendPixelData(i, 255, 255, 255, isLast ? 1: 0);
      } else {
        sendPixelData(i, 0, 0, 0, isLast ? 1: 0);
      }
    }
  }
}

function mousePressed() {
  if (0 > mouseX || mouseX > width || 0 > mouseY || mouseY > height) return;

  const x = parseInt(map(mouseX, 0, width, 0, sequence.length));
  const y = parseInt(map(mouseY, 0, height, 0, sequence[x].length));
  sequence[x][y] = !sequence[x][y];
}
