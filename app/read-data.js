'use strict'

const request = require('superagent')

request
  .get('http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2015-12-16')
  .end((err, res) => {
    var earthquakeArray = []
    for ( var i = 0; i<res.body.features.length; i++) {
      if ( res.body.features[i].properties.mag > 4) {
        earthquakeArray.push({
        time: (res.body.features[i].properties.time),
        url: (res.body.features[i].properties.url),
        mag: (res.body.features[i].properties.mag),
        place: (res.body.features[i].properties.place),
        coordinates: (res.body.features[i].geometry.coordinates)
      })
      }
    }
    console.log(earthquakeArray)
  })


// 10 minutes interval between calling website.
// (set parameter within start time)
// o'parse response
// filter by magnitude & location
// persistence of pull it. make sure it's not the same data as before.
// push to el twitter
        // if quakeData.time of this index ocurred within 10 minutes of this time\
        // then add the data to the object

