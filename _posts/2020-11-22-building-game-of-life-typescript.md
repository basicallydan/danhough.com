---
layout: post
title: How I Built Conway's Game of Life in TypeScript
date_created: 22 November 2020
tags: [devlogs, tdd]
location: Vancouver, BC, Canada
---

## Preamble

I have an [ongoing project on GitHub](https://github.com/conwaysgame) to build a collection of implementations of Conway's Game of Life using various technologies. So far, I've done JavaScript, JavaScript with React, Python and Go. My friend Eddie built it in Guile.

I do this for completionist reasons: it's fun to have a collection of repos that all essentially do the same thing but with different technologies. I also do this because I really like the Game of Life as a concept. And finally, I do it because I'll never have time to learn all the programming languages, but I may have time to at least expose myself to a little bit of them. In some cases, it could be a good introduction which leads to more serious use of the language.

It's quite common these days for JS developers to espouse the benefits of TypeScript. I suspect one day I will have a job where I'll need to write a lot of TypeScript. So in this case, I think starting with the Game of Life is as good as any start with the language.

I'm going to write this devlog as I go, so I may include in it some challenges I've faced as they may be interesting to read about and learn from.

---

Whenever I build the GOL I insist on writing tests first. In fact, my first exposure to Conway's Game was during an exercise where I was shown, basically, how TDD works. It's a really effective tool for teaching basic TDD to junior developers, I'd recommend it. Anyway, let's begin.

## Setup for Testing

I could start by copying my tests from the JS implementation I wrote years ago, but that would ruin some of the fun and purpose of this exercise.

I'm going to use `jest` for the tests, which needs some help to work well with TS.

```bash
# Add dependencies needed to start testing. Yarn wasn't able to install
# ts-test for some reason so I jsut used npm.
npm install --save-dev @types/jest @types/node jest ts-jest typescript
```

I found a [pretty standard jest config for TypeScript](https://dev.to/muhajirdev/unit-testing-with-typescript-and-jest-2gln) and copied it over.

```typescript
// jest.config.js

module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
```

## Writing some Tests

My preferred way to design a game of life implementation is to separate rendering from logic - in other words, the application should be able to output a representation of the current state of the game which can be interpreted by a "rendering" engine. That could be a CLI output, or something in HTML, or something else entirely.

A common representation people use is a two-dimensional array like this, essentially a matrix:

```
[
  [0,0,0,1,0]
  [0,0,0,1,0]
  [1,0,0,0,0]
  [0,0,0,0,0]
  [0,0,1,1,0]
]
```

Each item in the array is a row on the game of life board represented by an array, and each item in those arrays is a cell - `0` meaning unpopulated, `1` meaning populated.

This is probably the simplest way to output the data, since it's easy to interpet. Now we now how we want that to look we can start writing our first test, which should guide the design of the API.

```ts

```
