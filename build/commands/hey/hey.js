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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = {
    data: new discord_js_1.SlashCommandBuilder()
        .setName("hey")
        .setDescription("挨拶に反応してbotが返事します"),
    execute: function (interaction, client) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = client.channels.cache.get(interaction.channelId);
            for (let s = 0; s < 7; s++) {
                const message = yield channel.send(`Fuck ${s}`);
                yield message.react("⭕");
                yield message.react("🔺");
                yield message.react("❌");
            }
        });
    },
};
