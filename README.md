# git-sorted-contributors

> **Get contributors from a git repository sorted by commit count.**  
> Requires git 1.7+. Utilizes `git log --pretty=%an` to sum the contributions of each committer.

[![Build Status][travis_svg]][travis_link] [![Dependency Status][dm_svg]][dm_url]

[travis_svg]: https://travis-ci.org/vweevers/git-sorted-contributors.svg?branch=master
[travis_link]: https://travis-ci.org/vweevers/git-sorted-contributors
[dm_svg]: https://david-dm.org/vweevers/git-sorted-contributors.svg
[dm_url]: https://david-dm.org/vweevers/git-sorted-contributors

## Usage

```
npm install git-sorted-contributors
```

```js
var GitContributors = require('git-sorted-contributors').GitContributors;

var opts = '/path/to/repository-dir';
    // or
    opts = {cwd: '/path/to/repository-dir', markdown: false};

GitContributors.list(opts, function (err, result) {
    if (err) { throw err; }
    console.log(JSON.stringify(result, null, 2));
});
```

Which gives you an array of results, sorted by commit count in descending order:

```js
[
  { commits: 200, name: 'Maja',  email: 'maja@hive', percent: 76.9 },
  { commits: 50,  name: 'Flip',  email: 'flip@meadow', percent: 19.2 },
  { commits: 10,  name: 'Willi', email: 'willi@sunflower', percent: 3.8 }
]
```

## License

(The MIT License)

Copyright (c) 2014 David Linse <davidlinse@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation
files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
THEWARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
