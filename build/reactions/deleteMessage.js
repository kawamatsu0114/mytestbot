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
exports.deleteMessage = void 0;
const discord_js_1 = require("discord.js");
const reactionString = "🚫";
exports.deleteMessage = {
    reaction: reactionString,
    execute: (message) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const afterMessages = yield message.channel.messages.fetch({
            after: message.id,
            limit: 7,
        });
        const guild = message.guild;
        const deleteMessages = [message];
        for (const afterMessage of afterMessages.reverse()) {
            if (((_a = guild.members.me) === null || _a === void 0 ? void 0 : _a.id) ===
                ((_b = guild.members.cache.get(afterMessage[1].author.id)) === null || _b === void 0 ? void 0 : _b.id)) {
                deleteMessages.push(afterMessage[1]);
            }
            else {
                break;
            }
        }
        if (deleteMessages.length > 0) {
            const deleteMessage = yield message.channel.send(`reactionをしたメッセージ以下${deleteMessages.length}個のbotによるメッセージを削除します\n取り消したい場合は10秒以内にreactionを取り消してください\n10秒後にこのメッセージは削除されます`);
            setTimeout(() => checkBulkDelete(message, deleteMessages), 10000);
            setTimeout(() => bulkDelete([deleteMessage]), 10000);
        }
    }),
};
function checkBulkDelete(reactedMessage, messages) {
    return __awaiter(this, void 0, void 0, function* () {
        reactedMessage.reactions.cache.forEach((reaction) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (reaction.emoji.name === reactionString) {
                try {
                    const users = yield reaction.users.fetch();
                    for (const user of users) {
                        if ((_b = (_a = reactedMessage.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(user[1].id)) === null || _b === void 0 ? void 0 : _b.permissions.has(discord_js_1.PermissionsBitField.Flags.Administrator)) {
                            bulkDelete(messages);
                            return;
                        }
                    }
                }
                catch (e) {
                    console.error(e);
                }
            }
        }));
    });
}
function bulkDelete(messages) {
    for (const message of messages) {
        message.delete();
    }
}
