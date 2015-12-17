'use strict'
const dotenv = require('dotenv')
const Promise = require('bluebird')
const R = require('ramda')
const Twitter = require('twitter')
dotenv.load()

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

const twitter = Promise.promisifyAll(client)

const twitterResponse = twitter.getAsync('statuses/user_timeline', {screen_name: 'avianesc'})
twitterResponse
.then(twitterResponse => {
  const getText = status => {
    return status.text
  }
  let tweets = R.map(getText, twitterResponse)
  console.log(tweets)
})
.then(client.post('statuses/update', {status: 'hello'}, (error, tweet, response) => {
  if (error) {
    console.log(error)
    return tweet
  } else {
    console.log(tweet)
    return tweet
  }
}))
