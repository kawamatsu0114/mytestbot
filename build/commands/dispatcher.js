"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const schedule_1 = require("./schedule");
const commands = [schedule_1.schedule];
function default_1(message) {
    for (const command of commands) {
        if (message.content.split(" ")[1] === command.prefix) {
            command.execute(message);
        }
    }
}
exports.default = default_1;
