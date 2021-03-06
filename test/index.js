/* global describe, it */
'use strict'

// TODO: switch to tape
const chai = require('chai')
const expect = chai.expect
const tempy = require('tempy')
const fs = require('fs')
const exec = require('child_process').exec
const contributors = require('..')

// expect(x).to.be.true => expect(x).to.be.true()
chai.use(require('dirty-chai'))

function read (file) {
  return fs.readFileSync(file, 'utf8')
}

function mockLog (file) {
  return function (opts, callback) {
    fs.readFile(file, 'utf8', callback)
  }
}

describe('contributors-from-git', function () {
  describe('arguments', function () {
    it('should invoke callback', function (done) {
      contributors('.', function (err, result) {
        expect(err).to.not.exist()
        expect(result).to.be.an('array')
        expect(result[0]).to.contain.keys(['commits', 'name', 'email'])
        done()
      })
    })

    it('throws when dir is not a string', function (done) {
      expect(contributors.bind(null, null, function () {})).to.throw()
      done()
    })

    it('yields an error if dir does not exist', function (done) {
      contributors('does-not-exist', function (err) {
        expect(err.code).to.equal('ENOENT')
        done()
      })
    })

    it('yields an error if dir is not a git working tree', function (done) {
      contributors(tempy.directory(), function (err) {
        expect(err.message).to.match(/not a git repository/i)
        done()
      })
    })

    it('yields an error if dir has no commits yet', function (done) {
      const dir = tempy.directory()

      exec('git init', { cwd: dir }, function (err) {
        if (err) throw err

        contributors(dir, function (err) {
          expect(err.message).to.match(/does not have any commits yet/)
          done()
        })
      })
    })
  })

  describe('contributors()', function () {
    it('can parse shortlog', function (done) {
      const inFixture = 'test/fixtures/a'
      const outFixture = 'test/fixtures/a.json'

      contributors('.', { log: mockLog(inFixture) }, function (err, result) {
        expect(err).to.not.exist()
        expect(result).to.deep.equal(JSON.parse(read(outFixture)))
        done()
      })
    })
  })
})
