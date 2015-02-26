---
layout: page
title: Projects
description: These are the projects I have worked on or are actively working on at the moment.
---
# Projects

[Interfake](https://github.com/basicallydan/interfake)
-------

Fake APIs for prototypes & automated tests. Written in JavaScript for NodeJS, based on the express API library.

```javascript
var Interfake = require('interfake');
var interfake = new Interfake();
interfake.get('/example').body({ message : 'So easy!'});
interfake.listen(3000);
```

<a href="https://github.com/basicallydan/interfake" class="cta--secondary inline">GitHub Page</a><a href="https://www.npmjs.com/package/interfake" class="cta--tertiary inline">npm Page</a>

[Forkability](https://github.com/basicallydan/forkability)
-------

A linter for your repository. Uses GitHub API to verify features of a requested repository. Works on the command line, in NodeJS, or in the Browser.

```bash
forkability basicallydan/interfake


# Features
✓ Contributing document
✓ Readme document
✓ Licence document
✓ Test suite

# Suggestions
! Changelog document
! Uncommented issue: Comment on the issue to indicate acknowledgement
├── Support other Content-Types: https://github.com/basicallydan/interfake/issues/31
! Untouched issue: Comment or label the issue to indicate acknowledgement
├── Support other Content-Types: https://github.com/basicallydan/interfake/issues/31
! Uncommented issue: Comment on the issue to indicate acknowledgement
└── Media Responses: https://github.com/basicallydan/interfake/issues/19
```

<a href="https://github.com/basicallydan/forkability" class="cta--secondary inline">GitHub Page</a><a href="https://www.npmjs.com/package/forkability" class="cta--tertiary inline">npm Page</a>

[SkiFree.js](https://github.com/basicallydan/skifree.js)
-------

The classic PC Game SkiFree, but in JS. Not feature-complete, but still pretty fun. Keeps track of your top score using `localStorage`.

{% include _figure.html src="/img/skifree.gif" caption="I developed this and I still suck at it." %}

<a href="http://basicallydan.github.io/skifree.js/" class="cta--secondary inline">Play it now.</a><a href="https://github.com/basicallydan/skifree.js" class="cta--tertiary inline">GitHub Page</a>

[StreetScout](https://streetscout.io/)
-------

A tool which gives you places to stop between a start location and destination based on a search query.

The HTTP API is written in NodeJS, the front-end is KnockoutJS, and I also developed an iPhone application which uses the same API, but the iPhone application is a little out-of-date these days.

<a href="https://streetscout.io/" class="cta--secondary inline">Try it out.</a><a href="http://streetscoutapp.com/" class="cta--tertiary inline">Get the iPhone application.</a>

[Conway's Game of Life](https://github.com/conwaysgame)
-------

Implementations of [Conway's Game of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life) in various languages. Partly a learning exercise, partly an archiving exercise.

<a href="https://github.com/conwaysgame" class="cta--secondary inline">GitHub Page</a>