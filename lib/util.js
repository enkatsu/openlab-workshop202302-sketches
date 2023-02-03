const pixelNum = 10;
let hostNameInput, portNumberInput, portSelect, updateSerialConnectionButton;
let serial;

function initUi() {
  hostNameInput = createInput(location.hostname);
  portNumberInput = createInput(8081, "number");
  updateSerialConnectionButton = createButton("update serial connection");
  updateSerialConnectionButton.mouseClicked(updateSerialConnection);
  updateSerialConnectionButton.touchEnded(updateSerialConnection);
  portSelect = createSelect();
  portSelect.id("serial-port");
  portSelect.changed(function () {
    serial.openPort(portSelect.selected());
  });
}

function updateSerialConnection() {
  if (serial && serial.isConnected()) {
    serial.closePort();
  }

  serial = new p5.SerialPort(hostNameInput.value(), portNumberInput.value());
  serial.on("list", gotList);
  serial.on("data", gotData);
  serial.list();
}

function gotList(portList) {
  for (let port of portList) {
    portSelect.option(port);
  }

  if (portList.length !== 0) {
    portSelect.selected(portList[0]);
    serial.openPort(portSelect.selected());
  }
}

function gotData() {
  let currentString = serial.read();
  console.log(currentString);
}

function sendPixelData(i, r, g, b, command = 1) {
  if (serial) {
    serial.write(parseInt(i));
    serial.write(parseInt(r));
    serial.write(parseInt(g));
    serial.write(parseInt(b));
    serial.write(parseInt(command));
    serial.write("\n");
  }
}
