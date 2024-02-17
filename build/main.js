"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
// import hey from "./commands/hey/hey";
const dotenv_1 = __importDefault(require("dotenv"));
const dispatcher_1 = __importDefault(require("./commands/dispatcher"));
dotenv_1.default.config();
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildMessageReactions,
    ],
});
client.once(discord_js_1.Events.ClientReady, (c) => {
    console.log(`準備OKです！ ${c.user.tag}がログインします。`);
});
client.on(discord_js_1.Events.MessageCreate, (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if (((_a = message.mentions.users.first()) === null || _a === void 0 ? void 0 : _a.id) !== process.env.APPLICATION_ID)
        return;
    if (message.content.split(" ")[0] !== `<@${process.env.APPLICATION_ID}>`)
        return;
    if (!((_b = message.member) === null || _b === void 0 ? void 0 : _b.permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator))) {
        message.reply("botの利用はサーバー管理者のみが可能となっています");
        return;
    }
    console.log(message.content.split(" "));
    try {
        yield (0, dispatcher_1.default)(message);
    }
    catch (error) {
        console.log(error);
    }
}));
client.login(process.env.TOKEN);
const express = require("express");
const app = express();
const port = 3001;
app.get("/", (req, res) => res.type("html").send(""));
const server = app.listen(port, () => console.log(`listening on port ${port}!`));
server.keepAliveTimeout = 120 * 1000;
/*eslint-enable*/
