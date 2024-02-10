import { SerialPort } from "serialport";
import * as dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import * as robot from "robotjs";

const PORT = "COM3";
const BAUD_RATE = 9600;
const SPIN_MESSAGE = "1";

let spinsLeft = 0;

// // Create serial port connection
// const serialPort = new SerialPort({
//   path: PORT,
//   baudRate: BAUD_RATE,
//   autoOpen: true,
// });
// serialPort.on("error", console.log);

// Get bot token from ./env
dotenv.config();
const { BOT_TOKEN } = process.env;
if (BOT_TOKEN == undefined) throw new Error("MAKE SURE TO PUT A BOT_TOKEN env variable");

// Creates discord bot client that increments spin whenever someone joins a server.
const client = new Client({ intents: [GatewayIntentBits.GuildMembers] });
client.on("guildMemberAdd", () => {
  console.log("New user joined, sending spin message");
  spin();
  spinsLeft++;
});
client.login(BOT_TOKEN);

function spin() {
  robot.setMouseDelay(2);

  var twoPI = Math.PI * 2.0;
  var screenSize = robot.getScreenSize();
  var height = screenSize.height / 2 - 10;
  var width = screenSize.width / 2;

  robot.moveMouse(width, height);
  robot.mouseClick();
}

// // Sends SPIN_MESSAGE through serial if there are unsent spins left.
// serialPort.on("data", () => {
//   if (spinsLeft) {
//     spinsLeft--;
//     serialPort.write(SPIN_MESSAGE);
//   }
// });

console.log("Bot Started");
