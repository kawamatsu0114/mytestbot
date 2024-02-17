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
exports.help = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prefix = "help";
const usage = `@${process.env.BOT_NAME} help`;
const description = "各コマンドの使い方等を表示します";
const errorMessage = `以下の形式で入力してください\n\`${usage}\``;
exports.help = {
    prefix,
    usage,
    description,
    execute: (message, commands) => __awaiter(void 0, void 0, void 0, function* () {
        const channel = message.channel;
        if (message.content.split(/\s+/).length !== 2) {
            yield channel.send(errorMessage);
            return;
        }
        const sendMessage = createMessageFromPrefixUsageDescription(prefix, usage, description) +
            commands.map((command) => `\n${createMessageFromPrefixUsageDescription(command.prefix, command.usage, command.description)}`);
        const thread = yield message.startThread({
            name: "help",
            autoArchiveDuration: 60,
        });
        yield thread.send(sendMessage);
        yield thread.setArchived();
    }),
};
function createMessageFromPrefixUsageDescription(prefix, usage, description) {
    return `- ${prefix}\n - description: ${description}\n - usage: \`${usage}\``;
}
