"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schedule_1 = require("./schedule");
const notreact_1 = require("./notreact");
const help_1 = require("./help");
const commands = [schedule_1.schedule, notreact_1.notreact];
function default_1(message) {
    const prefix = message.content.split(/\s+/)[1];
    for (const command of commands) {
        if (prefix === command.prefix) {
            command.execute(message);
            return;
        }
    }
    if (prefix === "help") {
        help_1.help.execute(message, commands);
    }
    else {
        message.reply(`コマンドの形式が正しくありません。以下のコマンドで存在するコマンドを確認できます\n\`${help_1.help.usage}\``);
    }
}
exports.default = default_1;
