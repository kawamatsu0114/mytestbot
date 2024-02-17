import { GuildMember, TextChannel, User } from "discord.js";
import { BotCommand } from "../types";
import dotenv from "dotenv";

dotenv.config();

const prefix = "notreact";
const usage = `@${process.env.BOT_NAME} notreact test(option)`;
const description = "返信したメッセージに反応がないメンバーに通知を行います";
const errorMessage = `以下の形式でメッセージに返信してください\n\`${usage}\``;

export const notreact: BotCommand = {
  prefix,
  usage,
  description,
  execute: async (message) => {
    const channel = message.channel as TextChannel;
    const contents = message.content.split(/\s+/);
    if (
      contents.length !== 2 &&
      (contents.length !== 3 || contents[2] !== "test")
    ) {
      await channel.send(errorMessage);
      return;
    }
    const referenceMessageId = message.reference?.messageId;
    if (!referenceMessageId) {
      await channel.send(errorMessage);
      return;
    }
    const referenceMessage = await channel.messages.fetch(referenceMessageId);
    const guildMembers = Array.from(
      channel.members.filter((item) => !item.user.bot),
    );
    let reactedUsers: [string, User][] = [];
    for (const reaction of referenceMessage.reactions.cache) {
      const users = Array.from(await reaction[1].users.fetch()).filter(
        (value) => !value[1].bot,
      );
      reactedUsers = reactedUsers.concat(users);
    }
    const distinctReactedUsers = Array.from(new Set(reactedUsers));

    const distinctReactedUsersId = distinctReactedUsers.map((item) => item[0]);
    const reactedGuildMembers: [string, GuildMember][] = [];
    const notReactedGuildMembers: [string, GuildMember][] = [];

    guildMembers.forEach((item) => {
      if (distinctReactedUsersId.includes(item[0])) {
        reactedGuildMembers.push(item);
      } else {
        notReactedGuildMembers.push(item);
      }
    });

    if (contents.length === 3) {
      const sendMessage =
        "反応したユーザー：" +
        reactedGuildMembers.map((item) => item[1].displayName) +
        "\n" +
        "未反応のユーザー: " +
        notReactedGuildMembers.map((item) => item[1].displayName);
      await message.reply(sendMessage);
    } else if (notReactedGuildMembers.length > 0) {
      const sendMessage = `${notReactedGuildMembers.map((item) => `<@${item[0]}> `)} reacionいただけると助かります🙇`;
      await channel.send(sendMessage);
    } else {
      await channel.send(
        "みなさま回答済みです。ご回答ありがとうございました🙇",
      );
    }
  },
};
