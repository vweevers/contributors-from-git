'use strict'

var fs = require('fs')
var path = require('path')
var git = require('./lib/gitlog')
var _ = require('lodash')
var Q = require('q')

var verifyRepositoryExists = function () {
  var deferred = Q.defer()
  var repo = path.join(program.cwd, '.git')
  var ok = fs.existsSync(program.cwd) && fs.existsSync(repo)

  if (ok) { deferred.resolve(program) } else {
    deferred.reject(
      new Error('Could not find .git repository at "' + program.cwd + '"')
    )
  }

  return deferred.promise
}

var processLog = function (stdout) {
  var deferred = Q.defer()
  var list
  var entries = _.compact(stdout.split('\n'))
  var total = _.size(entries)

  list = _.map(_.uniq(entries), function (committer) {
    var parts = committer.split(' ')
    var email = _.last(parts)
    var author = _.without(parts, email).join(' ')
    var commits = _.size(_.filter(entries, function (e) {
      return e.indexOf(author) > -1 && e.indexOf(email) > -1
    }))

    var percentage = (commits / total * 100)

    return {
      commits: commits,
      name: author,
      email: email,
      percent: parseFloat(Math.max(0.1, percentage).toFixed(1), 10)
    }
  })

  list = _.sortBy(list, function (committer) {
    return -committer.commits
  })

  deferred.resolve(list)
  return deferred.promise
}

var format = function (data) {
  var deferred = Q.defer()

  if (program.json === true) {
    data = JSON.stringify(data)
  }

  deferred.resolve(data)
  return deferred.promise
}

var filter = function (data) {
  var deferred = Q.defer()

  var stripEmail = function (el) {
    return _.omit(el, 'email')
  }

  if (program.email === false) {
    data = _.map(data, stripEmail)
  }

  deferred.resolve(data)
  return deferred.promise
}

var program = {
  timeout: 5000,
  cwd: '.',
  maxBuffer: 25000 * 1024
}

var GitContributors = function GitContributors () {}

GitContributors.prototype.list = function (cwd, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = null
  }

  // TODO (refactor): don't use a semi-global and don't mutate the defaults
  program.json = null
  program = Object.assign({}, program, opts, { cwd })

  Q()
    .then(verifyRepositoryExists)
    .then(git.log)
    .then(processLog)
    .then(filter)
    .then(format)
    .done(function (result) {
      cb(null, result)
    }, function (err) {
      cb(err, null)
    })
}

exports.GitContributors = new GitContributors()
