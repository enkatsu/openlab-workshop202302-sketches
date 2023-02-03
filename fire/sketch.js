
function setup() {
  const canvasSize = min([windowWidth - 15, windowHeight - 15, 600]);
  createCanvas(canvasSize, canvasSize);
  initUi();
}

function draw() {
  background(0);
  noStroke();
  const radius = 300;
  for (let i = 0; i < 10; i++) {
    const rad = TWO_PI / 10 * i;
    const n = cyclicNoise(rad, frameCount * 0.02);
    const x = cos(rad) *  radius * n + width / 2;
    const y = sin(rad) *  radius * n + height / 2
    const c = fireColor(n);
    
    if (frameCount % 5 == 0) {
      const isLast = i === (pixelNum - 1);
      sendPixelData(i, red(c), green(c), blue(c), isLast ? 1: 0);
    }
    fill(c);
    ellipse(x, y, 10, 10);
  }
}

function fireColor(v) {
  return color(map(v, 0, 1, 0, 255), map(v, 0, 1, 0, 64), 0);
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
