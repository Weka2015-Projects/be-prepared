'use strict'

const request = require('superagent')
const postTweet = require('./twitter')

request
  .get('http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2015-12-16')
  .end((err, res) => {
    var array = []
    for ( var i = 0; i<res.body.features.length; i++) {
      array.push({
        time: (res.body.features[i].properties.time),
        url: (res.body.features[i].properties.url),
        mag: (res.body.features[i].properties.mag),
        place: (res.body.features[i].properties.place),
        coordinates: (res.body.features[i].geometry.coordinates)
      })
    }
    let time = []
    let tweets = []
    for (var j = 0; j < array.length; j++) {
      time.push(String(new Date(array[j].time)).split(' ')[4] + ' ' +
               String(new Date(array[j].time)).split(' ')[5])
      tweets.push(`M${array[j].mag} quake ${array[j].place} @ ${time[j]}. More info: ${array[j].url}`)
      // postTweet(tweets[j])
    }
  })

// 10 minutes interval between calling website.
// (set parameter within start time)
// o'parse response
// filter by magnitude & location
// persistence of pull it. make sure it's not the same data as before.
// push to el twitter
        // if quakeData.time of this index ocurred within 10 minutes of this time\
        // then add the data to the object

