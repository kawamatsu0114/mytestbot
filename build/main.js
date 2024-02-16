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
    ],
});
client.once(discord_js_1.Events.ClientReady, (c) => {
    console.log(`準備OKです！ ${c.user.tag}がログインします。`);
});
client.on(discord_js_1.Events.MessageCreate, (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    if (((_a = message.mentions.users.first()) === null || _a === void 0 ? void 0 : _a.id) !== process.env.APPLICATION_ID)
        return;
    console.log(message.content.split(" "));
    if (message.content.split(" ")[0] !== `<@${process.env.APPLICATION_ID}>`)
        return;
    try {
        yield (0, dispatcher_1.default)(message);
    }
    catch (error) {
        console.log(error);
    }
}));
// client.on(Events.InteractionCreate, async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;
//   if (interaction.commandName === hey.data.name) {
//     try {
//       await hey.execute(interaction, client);
//     } catch (error) {
//       console.log(error);
//       if (interaction.replied || interaction.deferred) {
//         await interaction.followUp({
//           content: "コマンド実行時にエラーになりました。",
//           ephemeral: true,
//         });
//       } else {
//         await interaction.reply({
//           content: "コマンド実行時にエラーになりました。",
//           ephemeral: true,
//         });
//       }
//     }
//   } else {
//     console.error(
//       `${interaction.commandName}というコマンドには対応していません。`,
//     );
//   }
// });
client.login(process.env.TOKEN);
