const CronJob = require('cron').CronJob;

function cronJobManager(client) {
  const channelID = '757393616183230465'; // Canal "geral" do Refúgio

  const cron = new CronJob(
    '00 00 * * *',
    () => {
      // Todo anexar imagem
      client.channels.cache.get(channelID).send('Horário oficial do óleo de macaco');
    },
    null,
    true,
    'America/Sao_Paulo'
  );

  cron.start();
}

module.exports = cronJobManager;