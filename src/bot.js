require('dotenv').config();
const { Client } = require('discord.js');

const client = new Client();
client.login(process.env.BOT_TOKEN);

const PREFIX = process.env.PREFIX;

let players = [];

client.on('ready', () => {
  console.log(`Bot is online!`);
});

client.on('message', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(PREFIX)) {
    const [command, ...args] = message.content.trim().substring(PREFIX.length).split(/\s+/);

    if (command === 'roleta') {
      if (args[0] === 'players') {
        let string = `- - - Pontuação atual - - -`;

        players.sort((a, b) => a - b)
          .forEach((player, index) => {
            string += `\n[${index + 1}] ${player.username}, streak atual: ${player.streak}`
          });

        return message.channel.send(string);
      }

      if (args[0] === 'help') {
        return message.channel
          .send(`Comandos disponíves da roleta:\n_roleta {número de 1 a 10}\n_roleta players`);
      }

      if (!Number.isInteger(parseInt(args[0]))) return message.channel.send('Argumento inválido');

      const roletaValue = getRandomInt(1, 10);

      if (parseInt(args[0]) === parseInt(roletaValue)) {
        const res = playerHandler(message.author.username, true);
        if (res && res.streak >= 3) {
          return message.channel.send(`${message.author.username} acertou ${res.streak} vezes seguidas!`);
        }
        return message.channel.send(`${message.author.username} acertou!`);
      }

      playerHandler(message.author.username, false);
      return message.channel.send(`${message.author.username} errou! Chute: ${args[0]} Roleta: ${roletaValue}`);
    }
  }
});

function playerHandler(username, success) {
  const foundIndex = players.findIndex(player => player.username === username);
  if (foundIndex === -1) {
    players = [...players, { username, streak: success ? 1 : 0 }];
    return;
  }
  success ? players[foundIndex].streak++ : players[foundIndex].streak = 0;
  return players[foundIndex];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min)) + min;
}