'use strict'
const CronJob = require('cron').CronJob;
const request = require('superagent')

new CronJob('*/10 * * * *', function() {
    request
  .get('http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2015-12-16')
  .end((err, res) => {
    var array = []
    for ( var i = 0; i<2; i++) {
      array.push({
        time: (res.body.features[0].properties.time),
        url: (res.body.features[0].properties.url),
        mag: (res.body.features[0].properties.mag),
        place: (res.body.features[0].properties.place),
        coordinates: (res.body.features[0].geometry.coordinates)
      })
    }
    console.log(array)
  })
  }, null, true, 'America/Los_Angeles');

// 10 minutes interval between calling website.
// (set parameter within start time)
// o'parse response
// filter by magnitude & location
// persistence of pull it. make sure it's not the same data as before.
// push to el twitter
        // if quakeData.time of this index ocurred within 10 minutes of this time\
        // then add the data to the object


