import { Message, TextChannel } from "discord.js";
import { BotCommand } from "../types";
import dotenv from "dotenv";

dotenv.config();

const prefix = "help";
const usage = `@${process.env.BOT_NAME} help`;
const description = "各コマンドの使い方等を表示します";
const errorMessage = `以下の形式で入力してください\n\`${usage}\``;

export const help = {
  prefix,
  usage,
  description,
  execute: async (message: Message, commands: BotCommand[]) => {
    const channel = message.channel as TextChannel;
    if (message.content.split(/\s+/).length !== 2) {
      await channel.send(errorMessage);
      return;
    }
    const sendMessage =
      createMessageFromPrefixUsageDescription(prefix, usage, description) +
      commands.map(
        (command) =>
          `\n${createMessageFromPrefixUsageDescription(command.prefix, command.usage, command.description)}`,
      );
    const thread = await message.startThread({
      name: "help",
      autoArchiveDuration: 60,
    });
    await thread.send(sendMessage);
    await thread.setArchived();
  },
};

function createMessageFromPrefixUsageDescription(
  prefix: string,
  usage: string,
  description: string,
) {
  return `- ${prefix}\n - description: ${description}\n - usage: \`${usage}\``;
}
