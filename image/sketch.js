let img;

function setup() {
  const canvasSize = min([windowWidth - 15, windowHeight - 15, 600]);
  createCanvas(canvasSize, canvasSize);
  initUi();

  input = createFileInput(handleFile);
}

function draw() {
  if (!img) {
    return;
  }

  background(255);

  // 表示する画像の横幅と縦幅を計算
  const ratio = img.width / img.height;
  const isLandscape = ratio > 1.0;
  const w = isLandscape ? width : width * ratio;
  const h = isLandscape ? height / ratio: height;
  image(img, 0, 0, w, h);
  // 画像の中心 50 x 50ピクセルを切り出す
  img.loadPixels();
  const size = 25;
  const croppedImage = get(
    mouseX - size / 2,
    mouseY - size / 2,
    size, size
  );
  const aveColor = averageColor(croppedImage);
  if (frameCount % 10 == 0) {
    for (let i = 0; i < pixelNum; i++) {
      const isLast = i === (pixelNum - 1);
      sendPixelData(i, red(aveColor), green(aveColor), blue(aveColor), isLast ? 1 : 0);
    }
  }

  push();
  noFill();
  stroke(0);
  rect(mouseX - size / 2, mouseY - size / 2, size, size);
  fill(aveColor);
  rect(0, 0, size, size);
  pop();
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = loadImage(file.data, '');
    // img.hide();
  } else {
    img = null;
  }
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
