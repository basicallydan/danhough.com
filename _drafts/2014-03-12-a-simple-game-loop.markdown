---
layout: post
title: A really simple and flexible way to do a game loop in JavaScript
date_created: 12 March 2014
location: Chamonix, France
---

I've made a couple of little JavaScript games in my time, my favourite (and the one I return to the most) being [a port of SkiFree](https://basicallydan.github.io/skifree.js/).

An important aspect of getting started with a game is creating the loops that will be constantly updating the state and rendering the graphics. It's very easy at the start to fall for this trap:

```javascript
var game = new Game();
setInterval(function () {
	// Update the game state
	// Draw the game
	// This is wrong.
}, 100);
```

This causes a few problems in the long run. First of all, if you want to control the speed of the rendering (in terms of frame rate) independently from the speed of state updates, you can't.

Secondly, you need to keep the drawing and updating functions separate. Keeping the logic that determines how the game looks separate from the logic which determines how the game acts is useful. Reduces issues you may encounter later on with screen sizes, collision detection, sprite behaviour and so forth.

It therefore makes sense to have two separate loops which operate independently. It occurred to me that this should be pretty easy to achieve by creating two `setInterval` calls and putting the logic in there. Well, that's fine, but then I've got two `setInterval` calls to worry about. When I want to pause the game, for example, I'd have to stop them both. Plus, it's kind of ugly having `setInterval`s all over the place. I thought it might be much easier to create a simple class which sits on top of `setInterval` that takes much more human-readable parameters. It's an event-emitting loop class, so I called it [EventedLoop](https://github.com/basicallydan/eventedloop).

```javascript
var game = new Game();
var loop = new EventedLoop();
loop.every('100ms', function () { /* update the game here */ });
loop.every('200ms', function () { /* draw the game here */ });
loop.start();
loop.stop();
```

This is nice and clean. Furthermore, it allows you to do other, more flexible event-related things. For instance: spawning new enemies, doing a countdown timer or other frequent game events could be done separately from the update code, reducing the need to work out whether it's time to do those things again.

```javascript
var game = new Game();
var loop = new EventedLoop();
loop.every('20ms', function () { /* update the movements of all the sprites here  */ });
loop.every('50ms', function () { /* spawn a new enemy */ });
loop.every('1s', function () { /* tick a countdown timer */ });
loop.every('2s', function () { /* decrease the player's heath if they are poisoned */ });
loop.every('200ms', function () { /* draw the game here */ });
loop.start();
loop.stop();
```

As you can see, it's simple and flexible. You can give it loop times in milliseconds, seconds, minutes or hours. You can even add and remove events dynamically throughout the game.

```javascript
var game = new Game();
var loop = new EventedLoop();
var explosionEvent; // Create it so we can reference it later
loop.every('20ms', function () {
	if (game.playerHasBeenPoisonedInThisUpdate) {
		// Creating a new loop during the execution of a loop event!
		loop.every('1s', game.hurtThePlayerALittleBit);
	}

	if (explosionEvent && game.playerHasQuelledExposions) {
		explosionEvent.remove();
	}
});
explosionEvent = loop.every('1m', function() { /* create a massive explosion every minute! */ });
loop.every('200ms', function () { /* draw the game here */ });
loop.start();
```

So far I've used it in two instances. I [put it into SkiFree](https://github.com/basicallydan/skifree.js/blob/master/js/lib/game.js), and [recreated XKCD's Frequency comic using it](http://basicallydan.github.io/eventedloop/xkcd-example/).

## Limitations

JavaScript can of course only handle so many things happening at one time, so remember if that you're going to create a bunch of loops which execute a whole bunch of code, you're eventually going to notice some slowing down of things since ultimately, under the covers, [there is some synchronicity happening here](http://ejohn.org/blog/how-javascript-timers-work/).

## What's next: possible features

There are a few more things to be done with this. Commands in the vein of `loop.at('5 times per minute')` would be a useful way to trigger events.

EventedLoop could be a more powerful tool with a few extra pieces such as the ability to continue an event for a certain number of executions until it expires. Something like this:

```javascript
loop.every('20ms').until(5).do(function() { /* The stuff */ });
```

I've also toyed with the idea of randomness.

```javascript
loop.every('20ms').chance('1:10').do(function() { /* Maybe the stuff */ });
```

This would be especially useful for many simple games in which enemies or items appear semi-randomly.

Finally, I'm in the (very slow) process of building up a small GitHub repository with bootstrap code for JavaScript games, for anybody who likes to develop them in a similar way to me. This, I expect, will be a part of it.

---

**So, to conclude:** [Give it a go](https://github.com/basicallydan/eventedloop), and please fork and improve it if you think you spot something you can improve on, or perhaps [raise an issue](https://github.com/basicallydan/eventedloop/issues).
