const { Client, GatewayIntentBits, SlashCommandBuilder, InteractionFlags } = require('discord.js');
require('dotenv').config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.MessageContent],
});

const localToken = process.env.BOT_TOKEN;

const serverToken = process.env.SERVER_DISCORD_TOKEN;

const TOKEN = localToken || serverToken;

client.once('ready', () => {
  console.log('Bot is ready');
  client.application.commands.create(
    new SlashCommandBuilder()
      .setName('tiny')
      .setDescription('Converts text to tiny text')
      .addStringOption(option =>
        option.setName('text').setDescription('The text to convert').setRequired(true)
      ),
  );
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'tiny') {
    const text = interaction.options.getString('text');
    const tinyText = convertToTiny(text);

    await interaction.reply({
      content: `Here’s your tiny text: \n${tinyText}`,
      flags: [InteractionFlags.FLAGS.EPHEMERAL], 
    });
  }
});

client.login(TOKEN);

function convertToTiny(text) {
  const normal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const tiny = 'ᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻᵃᵇᶜᵈᵉᶠᵍʰⁱʲᵏˡᵐⁿᵒᵖᵠʳˢᵗᵘᵛʷˣʸᶻ⁰¹²³⁴⁵⁶⁷⁸⁹';
  let tinyText = '';

  for (const char of text) {
    const index = normal.indexOf(char);
    if (index !== -1) {
      tinyText += tiny[index];
    } else {
      tinyText += char;
    }
  }
  return tinyText;
}