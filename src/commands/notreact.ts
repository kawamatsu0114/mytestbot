import { TextChannel } from "discord.js";
import { BotCommand } from "../types";
import dotenv from "dotenv";

dotenv.config();

const prefix = "notreact";
const usage = `@${process.env.BOT_NAME} notreact`;
const description = "返信したメッセージに反応がないメンバーに通知を行います";
const errorMessage = `以下の形式で入力してください\n\`${usage}\``;

export const unreact: BotCommand = {
  prefix,
  usage,
  description,
  execute: async (message) => {
    const channel = message.channel as TextChannel;
    if (message.content.split(/\s+/).length !== 2) {
      await channel.send(errorMessage);
      return;
    }
  },
};
