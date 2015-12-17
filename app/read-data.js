'use strict'

const request = require('superagent')


var array = []


// const usgs = (url, callback) => {
//   request(url)
//     .end(callback)
// }

request
  .get('http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2015-12-15')
  .end((err, res) => {
    var quakeData
    for ( var i = 0; i<res.body.features.length; i++) {

    }
    quakeData.url = (res.body.features[1].properties.url)
    quakeData.time = (res.body.features[1].properties.time)
    quakeData.mag = (res.body.features[1].properties.mag)
    quakeData.place = (res.body.features[1].properties.place)
    quakeData.coordinates = (res.body.features[1].geometry.coordinates)
    console.log(quakeData)










})





// 10 minutes interval between calling website.
// (set parameter within start time)
// o'parse response
// filter by magnitude & location
// persistence of pull it. make sure it's not the same data as before.
// push to el twitter
//


