import { Message } from "discord.js";
import { deleteMessage } from "./deleteMessage";

const botReactions = [deleteMessage];

export default function (message: Message, reaction: string) {
  for (const botReaction of botReactions) {
    if (reaction === botReaction.reaction) {
      botReaction.execute(message);
    }
  }
}
