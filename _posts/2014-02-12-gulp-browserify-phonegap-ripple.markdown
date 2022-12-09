---
layout: post
title: How to use Gulp, Browserify and Ripple in harmony for your PhoneGap app
date_created: 02/02/2014
location: Chamonix, France
---

Just like every other front-end developer who [likes to changes their mind about the best build tools at a moment's notice](http://www.100percentjs.com/just-like-grunt-gulp-browserify-now/), yesterday I decided that Gulp and Browserify were for me. However, I am currently working on a PhoneGap project and the workflow can be a little different. When developing PhoneGap applications some people like to use [Ripple](http://ripple.incubator.apache.org/), a little browser-based emulator for the various devices on which you might run your PhoneGap application.

I initially started with Martin Genev's `gulpfile` which included a LiveReload server, but soon found that making this work with the Ripple emulator is a bit of a faff and involves some unnecessary proxying. So, I created one which works better for Ripple. It's very simple, and this is what it looks like.

```js
var gulp = require("gulp");
var browserify = require("gulp-browserify");
var concat = require("gulp-concat");
var styl = require("gulp-styl");
var path = require("path");
var o = require("open");
var ripple = require("ripple-emulator");
var webPath = function (p) {
  return path.join("./www/", p);
};

// Builds the scripts based on a single entry point using browserify
gulp.task("scripts", function () {
  gulp
    .src([webPath("js/index.js")])
    .pipe(
      browserify({
        transform: ["hbsfy"],
        insertGlobals: true,
      })
    )
    .pipe(concat("scripts.min.js"))
    .pipe(gulp.dest(webPath("build")));
});

// Concatenates all the CSS files together.
gulp.task("styles", function () {
  gulp
    .src([webPath("css/**/*.css")])
    .pipe(
      styl({
        compress: true,
      })
    )
    .pipe(gulp.dest(webPath("build")));
});

// The default task
gulp.task("default", function () {
  // Watch the JS directory for changes and re-run scripts task when it changes
  gulp.watch(webPath("js/**"), function (evt) {
    gulp.run("scripts");
  });

  // Watch the CSS directory for changes and re-run styles task when it changes
  gulp.watch(webPath("css/**"), function (evt) {
    gulp.run("styles");
  });

  // Run scripts and styles tasks for the first time
  gulp.run("scripts");
  gulp.run("styles");

  var options = {
    keepAlive: false,
    open: true,
    port: 4400,
  };

  // Start the ripple server
  ripple.emulate.start(options);

  if (options.open) {
    o("http://localhost:" + options.port + "?enableripple=cordova-3.0.0");
  }
});
```

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
