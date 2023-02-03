function setup() {
  const canvasSize = min([windowWidth - 15, windowHeight - 15, 600]);
  createCanvas(canvasSize, canvasSize);
  initUi();

  capture = createCapture(VIDEO);
  capture.elt.setAttribute('playsinline', '');
  capture.hide();
}

function draw() {
  const img = capture.get();
  img.loadPixels();
  
  // 画像の中心 50 x 50ピクセルを切り出す
  const size = 50;
  const croppedImage = img.get(
    img.width / 2 - size / 2,
    img.height / 2 - size / 2,
    size, size
  );
  const aveColor = averageColor(croppedImage);
  if (frameCount % 10 == 0) {
    for (let i = 0; i < pixelNum; i++) {
      const isLast = i === (pixelNum - 1);
      sendPixelData(i, red(aveColor), green(aveColor), blue(aveColor), isLast ? 1 : 0);
    }
  }

  const ratio = width / height;
  const w = ratio > 0 ? width : img.width * ratio;
  const h = ratio > 0 ? img.height * ratio: height;
  image(img, 0, 0, w, h);
  fill(aveColor);
  rect(img.width / 2 - size / 2, img.height / 2 - size / 2, size, size);
  image(croppedImage, 0, 0);
}

/**
 * 画像の平均色を計算する
 * @param {*} img 
 * @returns 
 */
function averageColor(img) {
  img.loadPixels();
  let r = 0;
  let g = 0;
  let b = 0;
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      r += red(img.get(x, y));
      g += green(img.get(x, y));
      b += blue(img.get(x, y));
    }
  }
  r /= img.width * img.height;
  g /= img.width * img.height;
  b /= img.width * img.height;
  return color(r, g, b);
}
