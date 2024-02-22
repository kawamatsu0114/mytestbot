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
exports.notreact = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prefix = "notreact";
const usage = `@${process.env.BOT_NAME} notreact test(option)`;
const description = "返信したメッセージに反応がないメンバーに通知を行います";
const errorMessage = `以下の形式でメッセージに返信してください\n\`${usage}\``;
exports.notreact = {
    prefix,
    usage,
    description,
    execute: (message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const guild = yield message.guild.fetch();
        yield guild.members.fetch();
        const channel = (yield message.channel.fetch());
        const contents = message.content.split(/\s+/);
        if (contents.length !== 2 &&
            (contents.length !== 3 || contents[2] !== "test")) {
            yield channel.send(errorMessage);
            return;
        }
        const referenceMessageId = (_a = message.reference) === null || _a === void 0 ? void 0 : _a.messageId;
        if (!referenceMessageId) {
            yield channel.send(errorMessage);
            return;
        }
        const referenceMessage = yield channel.messages.fetch(referenceMessageId);
        const guildMembers = Array.from(channel.members.filter((item) => !item.user.bot));
        let reactedUsers = [];
        for (const reaction of referenceMessage.reactions.cache) {
            const users = Array.from(yield reaction[1].users.fetch()).filter((value) => !value[1].bot);
            reactedUsers = reactedUsers.concat(users);
        }
        const distinctReactedUsers = Array.from(new Set(reactedUsers));
        const distinctReactedUsersId = distinctReactedUsers.map((item) => item[0]);
        const reactedGuildMembers = [];
        const notReactedGuildMembers = [];
        guildMembers.forEach((item) => {
            if (distinctReactedUsersId.includes(item[0])) {
                reactedGuildMembers.push(item);
            }
            else {
                notReactedGuildMembers.push(item);
            }
        });
        if (contents.length === 3) {
            const sendMessage = "反応したユーザー：" +
                reactedGuildMembers.map((item) => item[1].displayName) +
                "\n" +
                "未反応のユーザー: " +
                notReactedGuildMembers.map((item) => item[1].displayName);
            yield message.reply(sendMessage);
        }
        else if (notReactedGuildMembers.length > 0) {
            const sendMessage = `${notReactedGuildMembers.map((item) => `<@${item[0]}> `)} reacionいただけると助かります🙇`;
            yield channel.send(sendMessage);
        }
        else {
            yield channel.send("みなさま回答済みです。ご回答ありがとうございました🙇");
        }
    }),
};
