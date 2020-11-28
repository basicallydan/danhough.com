---
layout: post
title: The Game of Life in TypeScript
date_created: 22 November 2020
tags: [devlogs, tdd]
location: Vancouver, BC, Canada
---

## Preamble

I have an [ongoing project on GitHub](https://github.com/conwaysgame) to build a collection of implementations of [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life) using various technologies. So far, I've done JavaScript, JavaScript with React, Python and Go. My friend Eddie built it in Guile.

I do this for completionist reasons: it's fun to have a collection of repos that all essentially do the same thing but with different technologies. I also do this because I really like the Game of Life as a concept. And finally, I do it because I'll never have time to learn all the programming languages, but I may have time to at least expose myself to a little bit of them. In some cases, it could be a good introduction which leads to more serious use of the language.

It's quite common these days for JS developers to espouse the benefits of TypeScript. I suspect one day I will have a job where I'll need to write a lot of TypeScript. However, I haven't used it more than once or twice in small ways before. So, starting with the Game of Life is as good as any start with the language.

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

```js
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

I also added this to my `package.json`:

```json
  "scripts": {
    "test": "jest"
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
// game.test.ts

// I'm going with an OOP implementation, so an instance
// of Game should maintain the board state
import { Game } from './game'

test('should correctly output the intial cell configuration', () => {
  const startingBoard = [
    [0,0,0,1,0],
    [0,0,0,1,0],
    [1,0,0,0,0],
    [0,0,0,0,0],
    [0,0,1,1,0]
  ]
  // It's quite likely `board` will change - I'm not sure 
  expect(new Game(startingBoard).board).toBe(startingBoard)
})
```

Following the general principle of Red, Green Refactor, I created a `Game` module and ran `yarn test`:

```ts
// game.ts

export class Game {
  constructor(board: Array<Array<number>>) {
  }
}
```

That's enough to make the thing fail in a legitimate manner. Now it needs to be expanded to pass:

```ts
export class Game {
  board: Array<Array<number>>

  constructor(board: Array<Array<number>>) {
    this.board = board
  }
}
```

`yarn test` is now all green: 1/1 tests passing.

Before we continue, let's review the rules of the Game of Life:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
1. Any live cell with two or three live neighbours lives on to the next generation.
1. Any live cell with more than three live neighbours dies, as if by overpopulation.
1. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

The reason Conway's Game is so useful as tool for teaching TDD is that these rules are so easy to distill into test cases. Let's deal with the first one.

### Rule 1

**Any live cell with fewer than two live neighbours dies, as if by underpopulation.**

```ts
// game.test.ts
// ...

test('when there is one live cell in the middle, and fewer than two live neighbours, it dies as if by underpopulation', () => {
  const startingBoard = [
    [0,0,0],
    [0,1,0],
    [0,0,0],
  ]

  const nextStepBoard = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
  ]

  const game = new Game(startingBoard)

  game.step()

  // It's gotta be toEqual here, because toBe
  // expects them to be exactly the game object. We just need
  // them to _look_ the same.
  expect(game.board).toEqual(nextStepBoard)
})
```

The simplest way to make this pass is to simply set `this.board` to the expected end point. I won't bore you with that step - so I wrote another test which is a 4x3 grid with a live cell in the top-left instead. To make this test, and that one pass, I implemented the following function for `step`:

```ts
step() {
  this.board = this.board.map(row => {
    return row.map(c => 0)
  })
}
```

We now have the most boring version of the game of life available to us. Let's implement the next rule.

### Rule 2

**Any live cell with two or three live neighbours lives on to the next generation.**

We can write a nice isolated test for this:

```ts
test('when there is one live cell in the top-middle, and two live neighbours, it lives on to the next generation', () => {
  const startingBoard = [
    [1,1,1],
    [0,0,0],
  ]

  const nextStepBoard = [
    [0,1,0],
    [0,0,0],
  ]

  const game = new Game(startingBoard)

  game.step()

  expect(game.board).toEqual(nextStepBoard)
})
```

We also have to write a test for when there are three live neighbours, for which the starting and resulting boards should look like this:

```ts
  const startingBoard = [
    [1,1,1],
    [0,1,0],
  ]

  const nextStepBoard = [
    [1,1,1],
    [0,1,0],
  ]
```

Now we can expand the `step` function to have it work out the number of living neighbours for a cell:

```ts
step() {
  this.board = this.board.map((row, cellY) => {
    return row.map((cell, cellX) => {
      let numberOfLiveNeighbours = 0
      for (let y = cellY - 1; y <= cellY + 1; y++) {
        for (let x = cellX - 1; x <= cellX + 1; x++) {
          if (y === cellY && x === cellX) continue
          numberOfLiveNeighbours += (this.board?.[y]?.[x] || 0)
        }
      }

      if (cell && [2, 3].includes(numberOfLiveNeighbours)) return 1

      return 0
    })
  })
}
```

### Rule 3

**Any live cell with more than three live neighbours dies, as if by overpopulation.**

A test for this case looks like this:


```ts
test('when there is one live cell in the middle, and four live neighbours, it dies as if by overpopulation', () => {
  const startingBoard = [
    [1,0,1],
    [1,1,1],
    [0,0,0],
  ]

  const nextStepBoard = [
    [1,0,1],
    [1,0,1],
    [0,0,0],
  ]

  const game = new Game(startingBoard)

  game.step()

  expect(game.board).toEqual(nextStepBoard)
})
```

There isn't any additional implementation to make this one work - it already does because the parts of the code which drive the other cases are so specific to their cases.

### Rule 4

**Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.**

The test for this case:

```ts
test('when there is one dead cell in the middle, and three live neighbours, it becomes live, as if by reproduction', () => {
  const startingBoard = [
    [1,0,1],
    [0,0,0],
    [0,0,1],
  ]

  const nextStepBoard = [
    [0,0,0],
    [0,1,0],
    [0,0,0],
  ]

  const game = new Game(startingBoard)

  game.step()

  expect(game.board).toEqual(nextStepBoard)
})
```

This fails upon first run - we don't have any code covering this case yet. Hopefully I can easily implement it without breaking the other tests.

```ts
step() {
  this.board = this.board.map((row, cellY) => {
    return row.map((cell, cellX) => {
      let numberOfLiveNeighbours = 0
      for (let y = cellY - 1; y <= cellY + 1; y++) {
        for (let x = cellX - 1; x <= cellX + 1; x++) {
          if (y === cellY && x === cellX) continue
          numberOfLiveNeighbours += (this.board?.[y]?.[x] || 0)
        }
      }

      if (cell && [2, 3].includes(numberOfLiveNeighbours)) return 1

      // Adding this very specific case should cause our new test to pass
      if (!cell && numberOfLiveNeighbours === 3) return 1

      return 0
    })
  })
}
```

While it does in fact make our new test pass, it breaks some older tests:

```bash
✕ when there is one live cell in the top-middle, and two live neighbours, it lives on to the next generation (5 ms)
✕ when there is one live cell in the top-middle, and three live neighbours, it lives on to the next generation (1 ms)
✕ when there is one live cell in the middle, and four live neighbours, it dies as if by overpopulation (1 ms)
```

That's because I set up some configurations which would now be altered by **rule 4**. For example:

```ts
test('when there is one live cell in the top-middle, and three live neighbours, it lives on to the next generation', () => {
  // With rule 4, the two cells in the bottom left and right
  // would now come to life because they're each surrounded by three
  // live cells!
  const startingBoard = [
    [1,1,1],
    [0,1,0],
  ]

  // However, the test was mainly about making sure the bottom-middle
  // cell stayed alive, so the expectation needs to change.
  const nextStepBoard = [
    [1,1,1],
    [0,1,0],
  ]
  // ...
```

Fixing those three tests is a matter of looking at the initial state and, with the knowledge of what all the rules are, working out what the new state _should_ be.

### Writing better tests?

It occurred to me early on that I might come across this problem, and the `expect` lines should have been more specific. For example, in the case of the above test, I could have written

```ts
expect(game.board[1][1]).toEqual(1)
```

...since that's why I was writing the test. That way, they wouldn't have failed when new requirements were added.

On the other hand, writing it the way that I did - checking the state of the whole board - and coming back to modify the test means that every test, assuming they're re-written properly, will be looking out for side-effects of changes.

However, I think if I were to do it again I'd do it the first way - an assertion for each cell I am interested in - and then write a bigger, whole-board test. Speaking of which...

### Glider

One of the emergent behaviours of the rules of Conway's Game of Life is the "glider", an arrangement of cells which, unless interrupted by other cells, will continually "move" across the board indefinitely. If everything has been implemented properly, then this test should just pass:

```ts
test('when there is a glider on the board, it moves', () => {
  const startingBoard = [
    [0,0,0,0,0],
    [0,0,1,0,0],
    [1,0,1,0,0],
    [0,1,1,0,0],
    [0,0,0,0,0],
  ]

  const firstStepBoard = [
    [0,0,0,0,0],
    [0,1,0,0,0],
    [0,0,1,1,0],
    [0,1,1,0,0],
    [0,0,0,0,0],
  ]

  const secondStepBoard = [
    [0,0,0,0,0],
    [0,0,1,0,0],
    [0,0,0,1,0],
    [0,1,1,1,0],
    [0,0,0,0,0],
  ]

  const thirdStepBoard = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,1,0,1,0],
    [0,0,1,1,0],
    [0,0,1,0,0],
  ]

  const fourthStepBoard = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,1,0],
    [0,1,0,1,0],
    [0,0,1,1,0],
  ]

  const game = new Game(startingBoard)

  game.step()
  expect(game.board).toEqual(firstStepBoard)

  game.step()
  expect(game.board).toEqual(secondStepBoard)

  game.step()
  expect(game.board).toEqual(thirdStepBoard)

  game.step()
  expect(game.board).toEqual(fourthStepBoard)
})
```

And indeed it does pass. We now have a functioning Game of Life. The next step is to render it somehow. In this case, I'm going to have it run on the command line. In order to see that working, here's something I threw together:

{% include _figure.html src="/img/ts-game-of-life/glider.gif" caption="A glider on the CLI Game of Life" %}

And here's the code:

```ts
#!/usr/bin/env node

const clear = require('clear')
const chalk = require('chalk');

import { Game } from './game'

function printBoard(board: Array<Array<number>>) {
  let boardString = ''
  for (let row of board) {
    for (let cell of row) {
      boardString += (cell === 0) ? '   ' : chalk.bgWhite('   ')
    }
    boardString += '\n'
  }
  console.log(boardString)
}

clear()
const game = new Game([
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,0,0,0,0,0,0,0,0,0,0,0],
  [1,0,1,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0],
])


setInterval(() => {
  clear()
  printBoard(game.board)
  game.step()
}, 250)
```

You can check it all out on [the GitHub page for the repo](https://github.com/conwaysgame/typescript). If you're a TypeScript person and would like to change things, please feel free to raise an issue or open a pull request. Enjoy!