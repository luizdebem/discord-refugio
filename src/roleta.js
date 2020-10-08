let players = [];
const helpMessage = `Comandos disponíves:\n_roleta {número de 1 a 5}\n_roleta players\n_help`;

function roletaHandler(message, args) {
  if (args[0] === 'players') {
    // TODO repensar highscore
    let string = `- - - Pontuação atual - - -`;

    players.sort((a, b) => a - b)
      .forEach((player, index) => {
        string += `\n[${index + 1}] ${player.username}, streak atual: ${player.streak}`
      });

    return message.channel.send(string);
  }

  if (!Number.isInteger(parseInt(args[0]))) return message.channel.send(helpMessage);
  const roletaValue = getRandomInt(1, 5);

  if (parseInt(args[0]) === parseInt(roletaValue)) {
    const res = playerHandler(message.author.username, true);
    if (res.streak >= 3) {
      return message.channel.send(`${message.author.username} acertou ${res.streak} vezes seguidas!`);
    }
    return message.channel.send(`${message.author.username} acertou!`);
  }
  playerHandler(message.author.username, false);
  return message.channel.send(`${message.author.username} chutou ${args[0]} e errou, era ${roletaValue} TROXA`);
}

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

module.exports = roletaHandler;