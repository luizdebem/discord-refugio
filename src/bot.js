require('dotenv').config();
const { Client } = require('discord.js');
const cronJobManager = require('./cron');
const roletaHandler = require('./roleta');

const client = new Client();
client.login(process.env.BOT_TOKEN);
const PREFIX = process.env.PREFIX;

const helpMessage = `Comandos disponíves:\n_roleta {número de 1 a 5}\n_roleta players\n_help`;

client.on('ready', async () => {
  console.log(`Bot is online!`);
  client.user.setPresence({
    activity: { name: 'roleta | _help', type: 'PLAYING' },
    status: 'online'
  });
  cronJobManager(client);
});

client.on('message', async (message) => {
  if (message.author.bot || !message.content.startsWith(PREFIX)) return;
  const [command, ...args] = message.content.trim().toLowerCase().substring(PREFIX.length).split(/\s+/);

  switch (command) {
    case 'roleta':
      roletaHandler(message, args);
      break;
    default:
      message.channel.send(helpMessage);
  }
});