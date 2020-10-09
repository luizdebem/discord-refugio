const CronJob = require('cron').CronJob;
const Discord = require('discord.js');
const horarioOficialPath = './assets/horario-oficial.jpeg';

function cronJobManager(client) {
  const file = new Discord.MessageAttachment(horarioOficialPath);
  const channelID = '757393616183230465'; // Canal "geral" do Refúgio

  const cron = new CronJob(
    '00 00 * * *',
    () => {
      client.channels.cache.get(channelID).send('Meia noite!!!!', { files: [file] });
    },
    null,
    true,
    'America/Sao_Paulo'
  );

  cron.start();
}

module.exports = cronJobManager;