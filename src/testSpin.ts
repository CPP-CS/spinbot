import * as robot from "robotjs";

function spin() {
  robot.setMouseDelay(2);

  var screenSize = robot.getScreenSize();
  var height = screenSize.height / 2 - 10;
  var width = screenSize.width / 2;

  robot.moveMouse(width, height);
  robot.mouseClick();
}

spin();
