---
published: true
layout: post
title: My First Hack
date_created: 11 August 2014
location: London, UK
comments: true
---

When I was about 15, I spent a lot of time on web forums. We all remember PHPBB forums, right?

Back in those days it was common to ask your fellow forumites  -  the ones with 'm4d photoshop skillz'  - for a new avatar based on a video game character, or with some crazy visual madness using the *Render Clouds* tool, or even an over-the-top typographic avatar with your username in it. (I was "Frag\_of\_lag" back then.)

As a fickle teenager, I would change mine a lot, so I came up with a PHP script which chose from three random images to cycle through whenever that script was hit. You would set the URL of your random avatar as your avatar URL (if the forum allowed it - otherwise it would go in your signature), and every time you came up on the forum you'd have a different avatar. There was a little control panel and you could upload new pictures whenever you liked, after logging into your account.

This was cool! I had made a Real Thing, and Real People used it. I think I probably had about 50-100 users. Nothing to write home about, but it felt good and I was really proud. I even allowed users to add more pictures if they sent me a little bit of money on PayPal. Premium features! What an app! I think only one person ever did this, and it might've been my mum.

On reflection, this app was ripe for abuse. I didn’t protect against SQL injection and I stored the images in the database. There was every chance that simply by putting someone else’s username as the query parameter, and encoding something in the right way, a malicious user with a hilarious sense of humour could replace their enemy’s avatar with something totally inappropriate. Luckily, nobody ever did this.

It wasn't pretty, and it wasn't clever, but it was cool to me. I'd found a problem that apparently some people had, and come up with a solution that they were willing to use. I was proud.

We all had to start somewhere. What was your first hack?

EDIT: With a bit of searching, I managed to find an Archive.org snapshot of the page. It doesn't work, but [this is what it looked like](http://web.archive.org/web/20070207043937/http://www.silverferret.co.uk/sigimage/).

If you like, you can [discuss this on Hacker News](https://news.ycombinator.com/item?id=8163493).