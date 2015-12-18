const readData = require('./app/read-data')
const request = require('superagent')
const CronJob = require('cron').CronJob
const today = new Date()
const currentDate = today.getUTCFullYear() + "-" + (today.getUTCMonth() + 1) + "-" + (today.getUTCDate() - 1)

new CronJob('* */10 * * * *', function() {
  request
  .get('http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + currentDate )
  .end(readData)
}, null, true, 'America/Los_Angeles')
