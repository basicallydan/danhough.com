---
layout: post
title: Creating SkiFree.js
date_created: 17/02/2013
location: London, UK
---

Over Christmas I wanted a simple, little project to play around with which involved making a game. I've been kind of obsessed with creating a game (which was always an on-off interest of mine growing up) since my interest in game design was reinvigorated last year when I read [Valve's Employee Handbook](http://assets.sbnation.com/assets/1074301/Valve_Handbook_LowRes.pdf). I know, I'm a huge cliché. Given that my programming life very much revolves around JavaScript at the moment, it made sense to do this port in HTML & JS using Canvas - plus, I'd like to get more familiar.

Cliché or not, I was unswayed. So, given that for some reason people in the office were talking about it before the holidays I decided to create myself a port of SkiFree. I'm going to give you a bit of background, then outline the main things I learned whilst creating the port.

[SkiFree](http://en.wikipedia.org/wiki/SkiFree) is a game which was first created as we know it in 1991 by a programmer called [Chris Pirih](http://www.ihoc.net/). It was a huge hit, and most of my colleagues and friends remember it vividly, either from Windows or from the Game Boy Color port.

If you want to play the game as it is right now (at time of writing is still a work-in-progress, but it's still pretty fucking awesome) have a lil' click on [this link](http://basicallydan.github.com/skifree.js).

I started simple by just creating a nice little `Sprite` class, and having it take a `CanvasRenderingContext2D` from the canvas, and drawing itself onto that context.

{% gistnocache 4973324 %}

I grabbed some sprites from a place on the [Web](http://spriters-resource.com/submitter/Wing%20Wang%20Wao) where a chap called Wing Wang Wao had ripped them and posted them online, and then played the game for about 2 minutes before being consumed by excitement for the rest of the night. I added a monster, and made trees generate at random, and there it was: a simple port of SkiFree.

After I'd showed my family my handiwork and they'd given me the mandatory smile and nod, I put it on GitHub and continued the holiday fun by eating too much turkey and cake.

A couple of weeks go by and I'm back at work. Business software is fun and all, but sometimes a guy has gotta get his teeth into a more unconventional project. So, I picked it up again. I ironed out a few little issues, and showed it to [Reddit](http://www.reddit.com/r/webdev/comments/17nvx0/hey_reddit_i_made_a_skifree_port_in_the_browser/). Much to my surprise, they loved it! I was so pleased, and [some](https://github.com/tomgrim1 "tomgrim1 on GitHub") [folks](https://github.com/ddoolin "ddoolin on GitHub") even helped out with the game by contributing some enhancements and fixes.

Since then, large trees have made it in, as have small clumps of snow. There are also lives, and ways to dodge the Yeti if it starts chasing you.

The interesting thing for me was learning about the best way to structure the game and implement various mechanics. Rather than going through them in a story form, let me just list the main things I've learned so far:

h2. Don't represent position in terms of the canvas

At least for a game with a map of the size that SkiFree has, it didn't make sense to represent sprites' positions in terms of the canvas they were being drawn onto. Sadly, this is how I did it originally, and it made the game difficult to scale, as well as making the "movement" of stationary sprites unnecessarily complicated.

Instead, give each sprite a position on the map, and as part of the `draw` code, understand where the viewport is centered and work out the position in terms of the canvas from that (it was [surprisingly easy to do this](https://github.com/basicallydan/skifree.js/blob/master/js/lib/canvasRenderingContext2DExtensions.js)). That way, you can arbitrarily make things appear more easily at certain positions on the map, and even do things like create cutscenes.

h2. You can make hit-test reactions a lot nicer with callbacks

Originally, when I was having sprites test against each other for hits, I looped through all of the sprites, and then tested them against the skier.

Sooner or later I remembered what language I was working with, so I had each new sprite register the skier as being a potential target for hitting as well as a callback for what happens when that hit occurs. Now, the sprite is in charge of hit-testing, and it works [really nicely](https://github.com/basicallydan/skifree.js/blob/master/js/sprite.js#L213) by looping through in there, and if it looks like a hit, the callback is executed.