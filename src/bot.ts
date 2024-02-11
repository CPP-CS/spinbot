import * as dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import { spin } from "./spin";

// Get bot token from ./env
dotenv.config();
const { BOT_TOKEN } = process.env;
if (BOT_TOKEN == undefined) throw new Error("MAKE SURE TO PUT A BOT_TOKEN env variable");

// Creates discord bot client that increments spin whenever someone joins a server.
const client = new Client({ intents: [GatewayIntentBits.GuildMembers] });
client.on("guildMemberAdd", () => {
  console.log("New user joined, starting spin");
  spin();
});
client.login(BOT_TOKEN);

console.log("Bot Started");
