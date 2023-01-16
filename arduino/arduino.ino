#include <MsTimer2.h>
#include <Adafruit_NeoPixel.h>
#ifdef __AVR__
#include <avr/power.h>
#endif

#define PIN        6
#define NUMPIXELS 10
Adafruit_NeoPixel pixels(NUMPIXELS, PIN, NEO_GRB + NEO_KHZ800);

#define DELAYVAL 50

int byteIndex = 0;
byte bytes[4] = {0, 0, 0, 0};

void write_color() {
  pixels.show();
}

void setup() {
#if defined(__AVR_ATtiny85__) && (F_CPU == 16000000)
  clock_prescale_set(clock_div_1);
#endif
  pixels.begin();
  delay(1000);
  pixels.clear();
  pixels.show();

  Serial.begin(9600);

  MsTimer2::set(100, write_color);
  MsTimer2::start();
}

void loop() {
  if (Serial.available() <= 0) {
    return;
  }

  String input = Serial.readStringUntil('\n');
  if (input.length() != 4) {
    return;
  }
  
  byte buf[4] = {0, 0, 0, 0};
  input.getBytes(buf, 4);
  uint16_t i = int(buf[0]);
  uint8_t r = int(buf[1]);
  uint8_t g = int(buf[2]);
  uint8_t b = int(buf[3]);
  pixels.setPixelColor(i, pixels.Color(r, g, b));
}
