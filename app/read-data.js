'use strict'
const CronJob = require('cron').CronJob
const request = require('superagent')

const today = new Date()
const currentDate = today.getUTCFullYear() + "-" + (today.getUTCMonth() + 1) + "-" + (today.getUTCDate() - 1)


new CronJob('*/10 * * * *', function() {
  request
  .get('http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=' + currentDate )
  .end((err, res) => {
    var earthquakeArray = []
    const currentTime =  Math.floor(Date.now() / 1000)

    for ( var i = 0; i<res.body.features.length; i++) {
     let earthquakeTime = res.body.features[i].properties.time /1000
     let timeDiff = currentTime - earthquakeTime

     if ( res.body.features[i].properties.mag > 4 && timeDiff < 600 ) {
      earthquakeArray.push({
        time: (res.body.features[i].properties.time),
        url: (res.body.features[i].properties.url),
        mag: (res.body.features[i].properties.mag),
        place: (res.body.features[i].properties.place),
        coordinates: (res.body.features[i].geometry.coordinates)
      })
        console.log(timeDiff)
        console.log(earthquakeArray)
     }
    }
 })
}, null, true, 'America/Los_Angeles')


