import { Message } from "discord.js";
import { schedule } from "./schedule";
import { notreact } from "./notreact";
import { help } from "./help";
import { test } from "./test";

const commands = [test, schedule, notreact];

export default function (message: Message) {
  const prefix = message.content.split(/\s+/)[1];
  for (const command of commands) {
    if (prefix === command.prefix) {
      command.execute(message);
      return;
    }
  }
  if (prefix === "help") {
    help.execute(message, commands);
  } else {
    message.reply(
      `コマンドの形式が正しくありません。以下のコマンドで存在するコマンドを確認できます\n\`${help.usage}\``,
    );
  }
}
