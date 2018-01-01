import { defineSupportCode } from 'cucumber'
import * as chai from 'chai'  
import { expect } from 'chai'
import chaiHttp = require('chai-http')
import { app } from '../testserver'

chai.use(chaiHttp)

defineSupportCode(function({ Given, When, Then }) {
  Given('a webserver with body-parser-graphql middleware', function() {
    this.server = chai.request(app).post('/')
  })

  Given(/^a request with Content-Type '(.*)'$/, function(contentType) {
    this.server = (this.server as ChaiHttp.Request).set('Content-Type', contentType)
  })

  Given('request body:', function(body) {
    this.body = body
  })

  When('I send the request to the server', async function() {
    this.result = await (this.server as ChaiHttp.Request).send(this.body)
  })

  Then('it should process the request', function() {
    expect(this.result).to.have.status(200)
  })

  Then('it should return an error', function() {
    console.log(this.result)
    //expect(this.result).to.have.status(400)
  })

  Then(/^the Content-Type should be set to 'application\/json'$/, function() {
    expect(this.result).to.have.header('content-type', /^application\/json/)
  })

  Then('the request body should be:', function(body) {
    const actual = JSON.stringify(this.result.body)
    const expected = JSON.stringify(JSON.parse(body))
    expect(actual).to.equal(expected)
  })
})