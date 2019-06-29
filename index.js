'use strict'

const path = require('path')
const exec = require('child_process').exec

function contributors (dir, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts
    opts = null
  }

  const cwd = path.resolve(dir)
  const log = (opts && opts.log) || gitlog

  log({ cwd, maxBuffer: 32 * 1024 * 1024 }, function (err, stdout) {
    if (err) return callback(err)

    callback(null, parse(stdout))
  })
}

function gitlog (opts, callback) {
  exec('git log --pretty="%an %ae"', opts, callback)
}

function parse (stdout) {
  const entries = stdout.split('\n').filter(Boolean)
  const unique = Array.from(new Set(entries))

  return unique.map(function (committer) {
    const a = committer.split(' ')
    const email = a.pop()
    const name = a.join(' ')
    const commits = entries.filter(function (e) {
      return e.indexOf(name) > -1 && e.indexOf(email) > -1
    }).length

    return { name, email, commits }
  })
}

module.exports = contributors
