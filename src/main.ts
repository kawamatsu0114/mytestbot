import {
  Client,
  GatewayIntentBits,
  Events,
  PermissionsBitField,
} from "discord.js";
import dotenv from "dotenv";
import commandDispatcher from "./commands/dispatcher";
import reactionDispather from "./reactions/dispatcher";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

client.once(Events.ClientReady, (c: Client<true>) => {
  console.log(`準備OKです！ ${c.user.tag}がログインします。`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.mentions.users.first()?.id !== process.env.APPLICATION_ID) return;
  if (message.content.split(" ")[0] !== `<@${process.env.APPLICATION_ID}>`)
    return;
  if (
    !message.member?.permissions.has(PermissionsBitField.Flags.Administrator)
  ) {
    message.reply("botの利用はサーバー管理者のみが可能となっています");
    return;
  }
  console.log(message.content.split(" "));
  try {
    await commandDispatcher(message);
  } catch (error) {
    console.log(error);
  }
});

client.on(Events.MessageReactionAdd, async (reaction, user) => {
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.error("Something went wrong when fetching the message:", error);
    }
  }
  if (!reaction.message.guild || !reaction.message.author) {
    return;
  }
  const guild = await reaction.message.guild.fetch();
  if (
    guild.members.me?.id !==
    guild.members.cache.get(reaction.message.author.id)?.id
  ) {
    return;
  }
  if (
    !guild.members.cache
      .get(user.id)
      ?.permissions.has(PermissionsBitField.Flags.Administrator)
  ) {
    return;
  }
  if (!reaction.emoji.name) {
    return;
  }
  const message = reaction.message.partial
    ? await reaction.message.fetch()
    : reaction.message;
  await reactionDispather(message, reaction.emoji.name);
});

client.login(process.env.TOKEN);

/*eslint-disable*/
declare function require(x: string): any;
const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req: any, res: any) => res.type("html").send(""));

const server = app.listen(port, () =>
  console.log(`listening on port ${port}!`),
);
server.keepAliveTimeout = 120 * 1000;
/*eslint-enable*/
