import { SerialPort } from "serialport";
import * as robot from "robotjs";

// const PORT = "COM3";
// const BAUD_RATE = 9600;
// const SPIN_MESSAGE = "1";

// // Create serial port connection
// const serialPort = new SerialPort({
//   path: PORT,
//   baudRate: BAUD_RATE,
//   autoOpen: true,
// });
// serialPort.on("error", console.log);

// // Once we begin receiving data, spin once and then close the connection
// serialPort.on("data", () => {
//   serialPort.write(SPIN_MESSAGE);
//   serialPort.close();
// });

function spin() {
  robot.setMouseDelay(2);

  var twoPI = Math.PI * 2.0;
  var screenSize = robot.getScreenSize();
  var height = screenSize.height / 2 - 10;
  var width = screenSize.width / 2;

  robot.moveMouse(width, height);
  robot.mouseClick();
}

spin();
