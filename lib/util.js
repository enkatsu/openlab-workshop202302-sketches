let hostNameInput, portNumberInput, portSelect, updateSerialConnectionButton;
let serial;


function initUi() {
    hostNameInput = createInput('localhost');
    portNumberInput = createInput(8081, 'number');
    updateSerialConnectionButton = createButton('update serial connection');
    updateSerialConnectionButton.mouseClicked(updateSerialConnection);
    updateSerialConnectionButton.touchEnded(updateSerialConnection);
    portSelect = createSelect();
    portSelect.changed(function() {
        serial.openPort(this.selected());
    });
}

function updateSerialConnection() {
    if (serial && serial.isConnected()) {
        serial.closePort();
    }

    serial = new p5.SerialPort(hostNameInput.value(), portNumberInput.value());
    serial.on('list', gotList);
    serial.on('data', gotData);
    serial.list();
}

function gotList(portList) {
    for (let port of portList) {
        portSelect.option(port);
    }

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
