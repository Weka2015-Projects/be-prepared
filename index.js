var CronJob = require('cron').CronJob;

new CronJob('*/10 * * * *', function() {
    console.log('You will see this message every second');
  }, null, true, 'America/Los_Angeles');
