/* global describe, it, afterEach */
'use strict'

var fs = require('fs')
var sinon = require('sinon')
var chai = require('chai')
var git = require('../lib/gitlog')
var expect = chai.expect
var GitContributors = require('..').GitContributors

// expect(x).to.be.true => expect(x).to.be.true()
chai.use(require('dirty-chai'))

var readIn = function readIn (file) {
  return fs.readFileSync(file, 'utf-8')
}

var stubFixture = function stubFixture (file) {
  sinon.stub(git, 'log').returns(readIn(file))
}

describe('git-sorted-contributors', function () {
  describe('#list()', function () {
    afterEach(function () {
      git.log.restore()
    })

    it('can parse a single user commit', function (done) {
      var inFixture = 'test/fixtures/actual/single-user-single-commit.log'
      var outFixture = 'test/fixtures/expected/single-user-single-commit.json'

      stubFixture(inFixture)

      GitContributors.list('.', function (err, result) {
        expect(err).to.not.exist()
        expect(result).to.deep.equal(JSON.parse(readIn(outFixture)))
        done()
      })
    })

    it('can parse multiple commits from a single user', function (done) {
      var inFixture = 'test/fixtures/actual/single-user-multiple-commit.log'
      var outFixture = 'test/fixtures/expected/single-user-multiple-commit.json'

      stubFixture(inFixture)

      GitContributors.list('.', function (err, result) {
        expect(err).to.not.exist()
        expect(result).to.deep.equal(JSON.parse(readIn(outFixture)))
        done()
      })
    })

    it('can parse same user with different emails ', function (done) {
      var inFixture = 'test/fixtures/actual/single-user-multiple-commit-different-mail.log'
      var outFixture = 'test/fixtures/expected/single-user-multiple-commit-different-mail.json'

      stubFixture(inFixture)

      GitContributors.list('.', function (err, result) {
        expect(err).to.not.exist()
        expect(result).to.deep.equal(JSON.parse(readIn(outFixture)))
        done()
      })
    })

    it('can parse multiple user with same email', function (done) {
      var inFixture = 'test/fixtures/actual/multi-user-same-mail.log'
      var outFixture = 'test/fixtures/expected/multi-user-same-mail.json'

      stubFixture(inFixture)

      GitContributors.list('.', function (err, result) {
        expect(err).to.not.exist()
        expect(result).to.deep.equal(JSON.parse(readIn(outFixture)))
        done()
      })
    })
  })

  describe('when given wrong arguments', function () {
    it('should not throw when no path given via string', function (done) {
      var f = function () {
        GitContributors.list(null, function (/* err, result */) {
          done()
        })
      }

      expect(f).to.not.throw()
    })
  })
})
