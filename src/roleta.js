let players = [];
const helpMessage = `Comandos disponíves:\n_roleta {chute um número de 1 a 5}\n_roleta players\n_help`;

function roletaHandler(message, args) {
  if (args[0] === 'players') {
    let string = `- - - TOP MAIS CAGADOS:  - - -`;

    players.sort((a, b) => a - b)
      .forEach((player, index) => {
        string += `\n[${index + 1}] ${player.username}, maior streak feito: ${player.highscore}`
      });

    return message.channel.send(string);
  }

  if (!Number.isInteger(parseInt(args[0]))) return message.channel.send(helpMessage);
  const roletaValue = getRandomInt(1, 5);

  if (parseInt(args[0]) === parseInt(roletaValue)) {
    const res = playerHandler(message.author.username, true);
    if (res && res.streak >= 3) {
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
    players = [...players, { username, streak: success ? 1 : 0, highscore: success ? 1 : 0 }];
    return;
  }
  let streak = players[foundIndex].streak;
  let highscore = players[foundIndex].highscore;
  success ? streak++ : streak = 0;
  success && streak > highscore ? highscore = streak : null;
  players[foundIndex] = { ...players[foundIndex], streak, highscore }//[...players, { username, streak: success ? 1 : 0, highscore: success ? 1 : 0 }];
  return players[foundIndex];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max) + 1;
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = roletaHandler;