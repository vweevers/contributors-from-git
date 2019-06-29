/* global describe, it */
'use strict'

var _ = require('lodash')
var chai = require('chai')
var expect = chai.expect
var GitContributors = require('..').GitContributors

// expect(x).to.be.true => expect(x).to.be.true()
chai.use(require('dirty-chai'))

describe('git-sorted-contributors', function () {
  describe('api', function () {
    it('is an object', function () {
      expect(GitContributors).to.be.an('object')
    })

    it('should have a #list method', function () {
      expect(GitContributors).to.have.property('list')
    })
  })

  describe('#list()', function () {
    it('should invoke callback', function (done) {
      GitContributors.list('.', function (err, result) {
        expect(err).to.not.exist()
        expect(result).to.be.an('array')

        var first = _.first(result)

        expect(first).to.contain.keys(['commits', 'name', 'percent', 'email'])
        done()
      })
    })

    it('should invoke callback with error', function (done) {
      GitContributors.list('./not-existing-directory', function (err, result) {
        expect(err).to.exist()
        expect(result).to.not.exist()
        done()
      })
    })

    it('should invoke callback with error and message', function (done) {
      var repo = './not-existing-directory'
      var msg = 'Could not find .git repository at "' + repo + '"'

      GitContributors.list(repo, function (err) {
        expect(err).to.exist()
        expect(err).to.have.property('message')
        expect(err.message).to.equal(msg)
        done()
      })
    })
  })
})
