import { Message, PermissionsBitField } from "discord.js";
import { BotReaction } from "../types";

const reactionString = "🚫";

export const deleteMessage: BotReaction = {
  reaction: reactionString,
  execute: async (message) => {
    const afterMessages = await message.channel.messages.fetch({
      after: message.id,
      limit: 7,
    });
    const guild = message.guild!;
    const deleteMessages: Message[] = [message];
    for (const afterMessage of afterMessages.reverse()) {
      if (
        guild.members.me?.id ===
        guild.members.cache.get(afterMessage[1].author.id)?.id
      ) {
        deleteMessages.push(afterMessage[1]);
      } else {
        break;
      }
    }
    if (deleteMessages.length > 0) {
      const deleteMessage = await message.channel.send(
        `reactionをしたメッセージ以下${deleteMessages.length}個のbotによるメッセージを削除します\n取り消したい場合は10秒以内にreactionを取り消してください\n10秒後にこのメッセージは削除されます`,
      );
      setTimeout(() => checkBulkDelete(message, deleteMessages), 10000);
      setTimeout(() => bulkDelete([deleteMessage]), 10000);
    }
  },
};

async function checkBulkDelete(reactedMessage: Message, messages: Message[]) {
  reactedMessage.reactions.cache.forEach(async (reaction) => {
    if (reaction.emoji.name === reactionString) {
      try {
        const users = await reaction.users.fetch();
        for (const user of users) {
          if (
            reactedMessage.guild?.members.cache
              .get(user[1].id)
              ?.permissions.has(PermissionsBitField.Flags.Administrator)
          ) {
            bulkDelete(messages);
            return;
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  });
}

function bulkDelete(messages: Message[]) {
  for (const message of messages) {
    message.delete();
  }
}
