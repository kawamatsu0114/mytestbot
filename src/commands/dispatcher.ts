import { Message } from "discord.js";
import { schedule } from "./schedule";

const commands = [schedule];

export default function (message: Message) {
  for (const command of commands) {
    if (message.content.split(" ")[1] === command.prefix) {
      command.execute(message);
    }
  }
}
