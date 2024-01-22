import { SerialPort } from "serialport";
import * as dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";

const PORT = "COM3";
const BAUD_RATE = 9600;

const READY_MESSAGE = "Y";
const NOT_READY_MESSAGE = "N";

const SPIN_MESSAGE = "a";
const NO_SPIN_MESSAGE = "b";

let spinsRemaining = 0;

async function pause(timeInMs: number) {
  await new Promise((res) => setTimeout(res, timeInMs));
}

function initSerialPort(): SerialPort {
  const serialPort = new SerialPort({
    path: PORT,
    baudRate: BAUD_RATE,
    autoOpen: true,
  });
  serialPort.on("error", console.log);
  serialPort.on("data", console.log);
  return serialPort;
}

function initDiscordClient() {
  dotenv.config();
  const { BOT_TOKEN } = process.env;
  if (BOT_TOKEN == undefined) throw new Error("MAKE SURE TO PUT A BOT_TOKEN env variable");

  const client = new Client({ intents: [GatewayIntentBits.GuildMembers] });

  client.on("guildMemberAdd", () => {
    console.log("New user joined. Spins remaining now at", spinsRemaining + 1);
    spinsRemaining += 1;
  });

  client.login(BOT_TOKEN);
}

async function initQueue(serialPort: SerialPort) {
  let latestMessage = NOT_READY_MESSAGE;

  serialPort.on("data", (chunk) => {
    latestMessage = Buffer.from(chunk).toString();
  });

  while (true) {
    if (spinsRemaining > 0 && latestMessage === READY_MESSAGE) {
      spinsRemaining -= 1;
      serialPort.write(SPIN_MESSAGE);
      await pause(20);
      serialPort.write(NO_SPIN_MESSAGE);
    }
    await pause(100);
  }
}

async function main() {
  const serialPort = initSerialPort();
  initDiscordClient();
  initQueue(serialPort);
}

main();
