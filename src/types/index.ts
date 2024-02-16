import { Message } from "discord.js";

export type BotCommand = {
  prefix: string;
  usage: string;
  description: string;
  execute: (message: Message) => void;
};
