# OpenLab Workshop 2022

## 導入手順

### Arduinoにプログラムを書き込む

`arduino/arduino.ino` をArduinoに書き込む

### p5.serialserverを起動する

```bash
git clone https://github.com/p5-serial/p5.serialserver.git
cd p5.serialserver
node startserver.js
```

### p5.jsのサンプルスケッチをブラウザから開く

ローカルサーバを立ち上げて、p5.jsのサンプルスケッチをブラウザから開く。
ローカルサーバはPythonに標準で備わっている、
[http.server](https://docs.python.org/ja/3/library/http.server.html) を使用する。

```bash
git clone https://github.com/enkatsu/openlab-workshop202302-sketches.git
python -m http.server
```

[http://localhost:8000](http://localhost:8000)

## GitHub Pages URL

[sketches](https://enkatsu.github.io/openlab-workshop202302-sketches/)
