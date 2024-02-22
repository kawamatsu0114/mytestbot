"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deleteMessage_1 = require("./deleteMessage");
const botReactions = [deleteMessage_1.deleteMessage];
function default_1(message, reaction) {
    for (const botReaction of botReactions) {
        if (reaction === botReaction.reaction) {
            botReaction.execute(message);
        }
    }
}
exports.default = default_1;
