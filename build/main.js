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
const dispatcher_2 = __importDefault(require("./reactions/dispatcher"));
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
client.on(discord_js_1.Events.MessageReactionAdd, (reaction, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e;
    if (reaction.partial) {
        try {
            yield reaction.fetch();
        }
        catch (error) {
            console.error("Something went wrong when fetching the message:", error);
        }
    }
    if (!reaction.message.guild || !reaction.message.author) {
        return;
    }
    const guild = yield reaction.message.guild.fetch();
    if (((_c = guild.members.me) === null || _c === void 0 ? void 0 : _c.id) !==
        ((_d = guild.members.cache.get(reaction.message.author.id)) === null || _d === void 0 ? void 0 : _d.id)) {
        return;
    }
    if (!((_e = guild.members.cache
        .get(user.id)) === null || _e === void 0 ? void 0 : _e.permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator))) {
        return;
    }
    if (!reaction.emoji.name) {
        return;
    }
    const message = reaction.message.partial
        ? yield reaction.message.fetch()
        : reaction.message;
    yield (0, dispatcher_2.default)(message, reaction.emoji.name);
}));
client.login(process.env.TOKEN);
function createServer() {
    const express = require("express");
    const app = express();
    const port = 3001;
    app.get("/", (req, res) => res.type("html").send(""));
    const server = app.listen(port, () => console.log(`listening on port ${port}!`));
    server.keepAliveTimeout = 120 * 1000;
}
/*eslint-enable*/
