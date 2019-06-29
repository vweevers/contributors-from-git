/* global describe, it, beforeEach, afterEach */

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
  describe('with --markdown option', function () {
    var opts = { cwd: '.', markdown: true }

    beforeEach(function () {
    })

    afterEach(function () {
      git.log.restore()
    })

    it('can parse a single user commit', function (done) {
      var inFixture, outFixture

      inFixture = 'test/fixtures/actual/single-user-single-commit.log'
      outFixture = 'test/fixtures/expected/single-user-single-commit.md'

      stubFixture(inFixture, opts)

      GitContributors.list(opts, function (err, result) {
        expect(err).to.not.exist()
        expect(result).to.equal(readIn(outFixture))
        done()
      })
    })

    it('can parse multiple commits from a single user', function (done) {
      var inFixture = 'test/fixtures/actual/single-user-multiple-commit.log'
      var outFixture = 'test/fixtures/expected/single-user-multiple-commit.md'

      stubFixture(inFixture, opts)

      GitContributors.list(opts, function (err, result) {
        expect(err).to.not.exist()
        expect(result).to.equal(readIn(outFixture))
        done()
      })
    })

    it('can parse same user with different emails', function (done) {
      var inFixture = 'test/fixtures/actual/single-user-multiple-commit-different-mail.log'
      var outFixture = 'test/fixtures/expected/single-user-multiple-commit-different-mail.md'

      stubFixture(inFixture)

      GitContributors.list(opts, function (err, result) {
        expect(err).to.not.exist()
        expect(result).to.equal(readIn(outFixture))
        done()
      })
    })

    it('can parse options', function (done) {
      var inFixture = 'test/fixtures/actual/single-user-multiple-commit-different-mail.log'
      var outFixture = 'test/fixtures/expected/single-user-multiple-commit-different-mail.md'

      stubFixture(inFixture, opts)

      GitContributors.list(opts, function (err, result) {
        expect(err).to.not.exist()
        expect(result).to.equal(readIn(outFixture))
        done()
      })
    })
  })
})
