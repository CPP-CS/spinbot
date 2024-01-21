import { SerialPort } from "serialport";
// Port can be foudn in bash using `ls /dev/tty*`
const PORT = "COM3";
const MSG = "a";
const BAUD_RATE = 9600;

const serialPort = new SerialPort({
  path: PORT,
  baudRate: BAUD_RATE,
  autoOpen: true,
});
serialPort.on("error", console.log);

async function main() {
  // Opens port
  await new Promise((res) => serialPort.close(res));
  // Opens port
  await new Promise((res) => serialPort.open(res));

  // Prints any serial data from arduino
  serialPort.on("data", console.log);

  while (true) {
    // Sends message through serial to arduino
    serialPort.write(MSG);
    // Pauses for 10 ms
    await new Promise((resolve) => setTimeout(resolve, 10));
    // Sends "b" through serial to arduino
    serialPort.write("b");
    // Pauses for 10 seconds -10 ms
    await new Promise((resolve) => setTimeout(resolve, 10000 - 10));
  }
}

main();
