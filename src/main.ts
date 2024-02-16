import {
  Client,
  GatewayIntentBits,
  Events,
  PermissionsBitField,
} from "discord.js";
// import hey from "./commands/hey/hey";
import dotenv from "dotenv";
import dispatcher from "./commands/dispatcher";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c: Client<true>) => {
  console.log(`準備OKです！ ${c.user.tag}がログインします。`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.mentions.users.first()?.id !== process.env.APPLICATION_ID) return;
  console.log(message.content.split(" "));
  if (message.content.split(" ")[0] !== `<@${process.env.APPLICATION_ID}>`)
    return;
  if (
    !message.member?.permissions.has(PermissionsBitField.Flags.Administrator)
  ) {
    message.reply("botの利用はサーバー管理者のみが可能となっています");
    return;
  }
  try {
    await dispatcher(message);
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);

/*eslint-disable*/
declare function require(x: string): any;
const http = require("http");
const server = http.createServer(function (request: any, response: any) {
  response.statusCode = 200;
  response.setHeader("Content-type", "text/plain");
  response.write("Hello, TypeScript!");
  response.end();
});

server.listen(8080);
console.log("Server start.");
/*eslint-enable*/
