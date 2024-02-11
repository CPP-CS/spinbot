import * as robot from "robotjs";
export function spin() {
  robot.setMouseDelay(2);

  robot.moveMouse(183, 549); //Change based on Boba's computer
  robot.mouseClick();

  // Cooldown
  setTimeout(() => {
    robot.moveMouse(784, 549); //Change based on Boba's computer
    robot.mouseClick();
  }, 1000);
}
