const pixelNum = 10;

function setup() {
  createCanvas(300, 300);
  initUi();
}

function draw() {
  background(0);
  noStroke();
  const radius = 50;
  for (let i = 0; i < 10; i++) {
    const rad = TWO_PI / 10 * i;
    const n = cyclicNoise(rad, frameCount * 0.01);
    const x = cos(rad) *  radius * n + width / 2;
    const y = sin(rad) *  radius * n + height / 2
    const c = fireColor(n);
    if (serial) {
      sendPixelData(i, red(c), green(c), blue(c));
    }    
    fill(c);
    ellipse(x, y, 3, 3);
  }
}

function fireColor(v) {
  return color(
    map(v, 0, 1, 127, 255),
    map(v, 0, 1, 64, 192),
    map(v, 0, 1, 0, 127),
  )
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
