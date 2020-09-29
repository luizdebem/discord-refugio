const CronJob = require('cron').CronJob;
const { Client } = require('discord.js');

const client = new Client();
client.login(process.env.BOT_TOKEN);

const channelID = '757393616183230465'; // Canal "geral" do Refúgio

const cron = new CronJob(
  '0 0 * * *',
  () => {
    console.log('cron tickou');
    client.channels.get(channelID).send('Horário oficial do óleo de macaco');
  },
  null,
  true,
  'America/Sao_Paulo'
);

const startCron = () => {
    cron.start();
    console.log('Cron rodando');
}

module.exports = startCron;