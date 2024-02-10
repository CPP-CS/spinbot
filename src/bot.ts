import * as dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import * as robot from "robotjs";

// Get bot token from ./env
dotenv.config();
const { BOT_TOKEN } = process.env;
if (BOT_TOKEN == undefined) throw new Error("MAKE SURE TO PUT A BOT_TOKEN env variable");

// Creates discord bot client that increments spin whenever someone joins a server.
const client = new Client({ intents: [GatewayIntentBits.GuildMembers] });
client.on("guildMemberAdd", () => {
  console.log("New user joined, sending spin message");
  spin();
});
client.login(BOT_TOKEN);

function spin() {
  robot.setMouseDelay(2);

  var screenSize = robot.getScreenSize();
  var height = screenSize.height / 2 - 10;
  var width = screenSize.width / 2;

  robot.moveMouse(width, height);
  robot.mouseClick();
}

console.log("Bot Started");
