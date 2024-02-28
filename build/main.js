"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
// import hey from "./commands/hey/hey";
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
    ],
    partials: [discord_js_1.Partials.Message, discord_js_1.Partials.Channel, discord_js_1.Partials.Reaction],
});
client.once(discord_js_1.Events.ClientReady, (c) => {
    console.log(`準備OKです！ ${c.user.tag}がログインします。`);
    createServer();
});
// client.on(Events.MessageCreate, async (message) => {
//   if (message.mentions.users.first()?.id !== process.env.APPLICATION_ID) return;
//   if (message.content.split(" ")[0] !== `<@${process.env.APPLICATION_ID}>`)
//     return;
//   if (
//     !message.member?.permissions.has(PermissionsBitField.Flags.Administrator)
//   ) {
//     message.reply("botの利用はサーバー管理者のみが可能となっています");
//     return;
//   }
//   console.log(message.content.split(" "));
//   try {
//     await commandDispatcher(message);
//   } catch (error) {
//     console.log(error);
//   }
// });
// client.on(Events.MessageReactionAdd, async (reaction, user) => {
//   if (reaction.partial) {
//     try {
//       await reaction.fetch();
//     } catch (error) {
//       console.error("Something went wrong when fetching the message:", error);
//     }
//   }
//   if (!reaction.message.guild || !reaction.message.author) {
//     return;
//   }
//   const guild = await reaction.message.guild.fetch();
//   if (
//     guild.members.me?.id !==
//     guild.members.cache.get(reaction.message.author.id)?.id
//   ) {
//     return;
//   }
//   if (
//     !guild.members.cache
//       .get(user.id)
//       ?.permissions.has(PermissionsBitField.Flags.Administrator)
//   ) {
//     return;
//   }
//   if (!reaction.emoji.name) {
//     return;
//   }
//   const message = reaction.message.partial
//     ? await reaction.message.fetch()
//     : reaction.message;
//   await reactionDispather(message, reaction.emoji.name);
// });
try {
    client.login(process.env.TOKEN);
}
catch (e) {
    console.error(e);
}
function createServer() {
    const express = require("express");
    const app = express();
    const port = 3001;
    app.get("/", (req, res) => res.type("html").send(""));
    const server = app.listen(port, () => console.log(`listening on port ${port}!`));
    server.keepAliveTimeout = 120 * 1000;
}
/*eslint-enable*/
