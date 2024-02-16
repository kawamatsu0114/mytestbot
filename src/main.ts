import { Client, GatewayIntentBits, Events } from "discord.js";
// import hey from "./commands/hey/hey";
import dotenv from "dotenv";
import dispatcher from "./commands/dispatcher";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, (c: Client<true>) => {
  console.log(`準備OKです！ ${c.user.tag}がログインします。`);
});

client.on(Events.MessageCreate, async (message) => {
  if (message.mentions.users.first()?.id !== process.env.APPLICATION_ID) return;
  console.log(message.content.split(" "));
  if (message.content.split(" ")[0] !== `<@${process.env.APPLICATION_ID}>`)
    return;
  try {
    await dispatcher(message);
  } catch (error) {
    console.log(error);
  }
});

// client.on(Events.InteractionCreate, async (interaction) => {
//   if (!interaction.isChatInputCommand()) return;
//   if (interaction.commandName === hey.data.name) {
//     try {
//       await hey.execute(interaction, client);
//     } catch (error) {
//       console.log(error);
//       if (interaction.replied || interaction.deferred) {
//         await interaction.followUp({
//           content: "コマンド実行時にエラーになりました。",
//           ephemeral: true,
//         });
//       } else {
//         await interaction.reply({
//           content: "コマンド実行時にエラーになりました。",
//           ephemeral: true,
//         });
//       }
//     }
//   } else {
//     console.error(
//       `${interaction.commandName}というコマンドには対応していません。`,
//     );
//   }
// });

client.login(process.env.TOKEN);
