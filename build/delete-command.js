"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const rest = new discord_js_1.REST().setToken(process.env.TOKEN);
rest
    .delete(discord_js_1.Routes.applicationGuildCommand(process.env.APPLICATION_ID, process.env.GUILD_ID, "commandId"))
    .then(() => console.log("Successfully deleted guild command"))
    .catch(console.error);
