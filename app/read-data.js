'use strict'
const postTweet = require('./twitter')

let callback = (err, res) => {
    var earthquakeArray = []
    const currentTime =  Math.floor(Date.now() / 1000)
    for (var i = 0; i<res.body.features.length; i++) {
     let earthquakeTime = res.body.features[i].properties.time /1000
     let timeDiff = currentTime - earthquakeTime

     if ( res.body.features[i].properties.mag > 4 && timeDiff < 3600 ) {
      earthquakeArray.push({
        time: (res.body.features[i].properties.time),
        url: (res.body.features[i].properties.url),
        mag: (res.body.features[i].properties.mag),
        place: (res.body.features[i].properties.place),
        coordinates: (res.body.features[i].geometry.coordinates)
      })
      let time = []
      let tweets = []
      for (var j = 0; j < earthquakeArray.length; j++) {
        time.push(String(new Date(earthquakeArray[j].time)).split(' ')[4] + ' ' +
         String(new Date(earthquakeArray[j].time)).split(' ')[5])
        tweets.push(`Mag ${earthquakeArray[j].mag} #quake ${earthquakeArray[j].place} @ ${time[j]}. More info: ${earthquakeArray[j].url}`)
        postTweet(tweets[j])
      }
    }
  }
}

module.exports = callback
