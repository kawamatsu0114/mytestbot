import { AnyThreadChannel } from "discord.js";
import { BotCommand } from "../types";
import dotenv from "dotenv";

dotenv.config();

const prefix = "test";
const usage = `@${process.env.BOT_NAME} test`;
const description =
  "プロセスが単一で起動されるように修正します（render用のコマンド）。必ずスレッド外でコマンドを実行すること。スレッド内で実行するとbotが停止します。";

export const test: BotCommand = {
  prefix,
  usage,
  description,
  execute: async (message) => {
    let testThread: AnyThreadChannel<boolean>;
    message
      .startThread({ name: "test", autoArchiveDuration: 60 })
      .then((thread) => {
        testThread = thread;
        return thread.send("test");
      })
      .then(() => testThread.setArchived())
      .catch(() => process.exit(0));
  },
};
