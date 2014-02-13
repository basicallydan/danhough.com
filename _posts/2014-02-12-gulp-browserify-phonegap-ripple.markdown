---
layout: post
title: How to use Gulp, Browserify and Ripple in harmony for your PhoneGap app
date_created: 02/02/2014
location: Chamonix, France
---

Just like every other front-end developer who [likes to changes their mind about the best build tools at a moment's notice](http://www.100percentjs.com/just-like-grunt-gulp-browserify-now/), yesterday I decided that Gulp and Browserify were for me. However, I am currently working on a PhoneGap project and the workflow can be a little different. When developing PhoneGap applications some people like to use [Ripple](http://ripple.incubator.apache.org/), a little browser-based emulator for the various devices on which you might run your PhoneGap application.

I initially started with Martin Genev's `gulpfile` which included a LiveReload server, but soon found that making this work with the Ripple emulator is a bit of a faff and involves some unnecessary proxying. So, I created one which works better for Ripple. It's very simple, and this is what it looks like.

{% gist 8951183 %}

Quite simply, the `scripts` and `styles` tasks are re-run whenever their files change and the ripple server starts when the default task is run. It even opens the browser to show you Ripple just like the globally-installed Ripple would. Any suggestions feel free to [leave them in this gist](https://gist.github.com/basicallydan/8951183). I hope this helps a few people out there.

Oh, and don't forget to keep your devDependencies in package.json nice and organised:

```
  "devDependencies": {
    "gulp": "~3.5.2",
    "gulp-browserify": "~0.4.4",
    "open": "0.0.4",
    "gulp-concat": "~2.1.7",
    "gulp-styl": "~0.2.0",
    "ripple-emulator": "~0.9.19",
    "handlebars": "~1.3.0",
    "hbsfy": "~1.3.1"
  }
```