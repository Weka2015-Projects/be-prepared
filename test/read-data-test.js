const sinon = require('sinon')
const sinonChai = require('sinon-chai')
const expect = require('chai').use(sinonChai).expect
const proxyquire = require('proxyquire')

const fakePostTweet = sinon.spy()
proxyquire('../app/read-data', { './twitter': fakePostTweet });

const readData = require('../app/read-data')

describe('Read data', () => {
  it('tests', () => {
    readData()
    expect(fakePostTweet).to.have.been.calledWith('hello')
  })
  it('creates a tweet if quake is less than 10 minutes old')
  it('does not tweet if quake is older than 10 minutes')
  it('does not tweet if quake is under magnitude of 4')
})
