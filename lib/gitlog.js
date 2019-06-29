'use strict'

var Q = require('q')
var exec = require('child_process').exec

var git = {
  log: function log (opts) {
    var deferred = Q.defer()

    process.chdir(opts.cwd)

    exec('git log --pretty="%an %ae"', opts, function (err, stdout) {
      if (err) {
        deferred.reject(err)
      } else {
        deferred.resolve(stdout)
      }
    })

    return deferred.promise
  }
}

module.exports = git
