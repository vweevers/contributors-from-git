# contributors-from-git

> **Get an array of contributors from a git working tree.**  
> Requires git 1.7+. Forked from `git-contributors` to reduce its scope (no output formatters, command-line interface, sorting or filtering).

[![Build Status][travis_svg]][travis_link] [![Dependency Status][dm_svg]][dm_url]

[travis_svg]: https://travis-ci.org/vweevers/contributors-from-git.svg?branch=master
[travis_link]: https://travis-ci.org/vweevers/contributors-from-git
[dm_svg]: https://david-dm.org/vweevers/contributors-from-git.svg
[dm_url]: https://david-dm.org/vweevers/contributors-from-git

## Usage

```
npm install contributors-from-git
```

```js
var contributors = require('contributors-from-git')

contributors('.', function (err, result) {
  if (err) throw err
  console.log(result)
})
```

This yields an array of contributors:

```js
[
  { commits: 40, name: 'Maja',  email: 'maja@hive' },
  { commits: 10, name: 'Flip',  email: 'flip@meadow' },
  { commits: 80, name: 'Willi', email: 'willi@sunflower' }
]
```

## API

### `contributors(dir, callback)`

The `dir` argument must resolve to a git working tree.

## License

[MIT][LICENSE] © 2019 Vincent Weevers, © 2014 David Linse.
