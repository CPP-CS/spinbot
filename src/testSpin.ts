import { SerialPort } from "serialport";

const PORT = "COM3";
const BAUD_RATE = 9600;
const SPIN_MESSAGE = "1";

// Create serial port connection
const serialPort = new SerialPort({
  path: PORT,
  baudRate: BAUD_RATE,
  autoOpen: true,
});
serialPort.on("error", console.log);

// Once we begin receiving data, spin once and then close the connection
serialPort.on("data", () => {
  serialPort.write(SPIN_MESSAGE);
  serialPort.close();
});
