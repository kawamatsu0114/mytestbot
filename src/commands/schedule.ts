import { TextChannel } from "discord.js";
import { BotCommand } from "../types";
import dotenv from "dotenv";

dotenv.config();

const prefix = "schedule";
const usage = `@${process.env.BOT_NAME} schedule hh:mm yyyy/mm/dd(option)`;
const description =
  "土曜日起点の翌週（日付が入力された場合はその日付を含む週）の日程調整メッセージを出力します";
const errorMessage = `以下の形式で入力してください\n\`${usage}\``;

export const schedule: BotCommand = {
  prefix,
  usage,
  description,
  execute: async (message) => {
    const channel = message.channel as TextChannel;
    const contents = message.content.split(/\s+/);
    if (contents.length !== 3 && contents.length !== 4) {
      await channel.send(errorMessage);
      return;
    }
    let date = new Date(
      Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000,
    );
    if (contents[2].match(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/) === null) {
      await channel.send(errorMessage);
      return;
    }
    if (contents.length === 4) {
      date = new Date(contents[3]);
      if (isNaN(date.getDate())) {
        await channel.send(errorMessage);
        return;
      }
    }
    const daysString = getDaysStringOfWeek(date);
    for (const dayString of daysString) {
      const sendMessage = await channel.send(`${dayString} ${contents[2]}～`);
      await sendMessage.react("⭕");
      await sendMessage.react("🔺");
      await sendMessage.react("❌");
    }
    await channel.send("@everyone 上記の日程調整に回答お願いします🙇");
  },
};

function getDaysStringOfWeek(date: Date) {
  const dayOfWeek = date.getDay();
  const diff = dayOfWeek === 6 ? 0 : dayOfWeek + 1;
  const temp = new Date(date);
  temp.setDate(date.getDate() - diff);

  const daysString: string[] = [];
  for (let n = 0; n < 7; n++) {
    daysString.push(dateToStringFormat(temp));
    temp.setDate(temp.getDate() + 1);
  }
  return daysString;
}

function dateToStringFormat(date: Date) {
  const weekdays = ["日", "月", "火", "水", "木", "金", "土"];
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const weekday = weekdays[date.getDay()];
  return `${month}月${day}日（${weekday}）`;
}
