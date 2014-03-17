---
layout: post
title: Interfake 1.2.0: Fluency
date_created: 17 March 2014
location: Chamonix, France
---

A few months ago I released my first npm module, called [Interfake](https://github.com/basicallydan/interfake). It was a tool which could be used to create a HTTP API, serving up JSON, with ease.

Yesterday I published an update to npm which massively decreases the barrier to entry and hugely increases the usefulness of Interfake. With a fluent (aka method chaining) API, Interfake can now be included in tests and with two lines of JavaScript you can spin up an API to use your app with. A big-ass guide is available on [GitHub](https://github.com/basicallydan/interfake).

If you're gonna use these snippets don't forget to install interfake first, or update the version if you already have it:

```
$ npm install interfake
```

```javascript
var Interfake = require('interfake');
var interfake = new Interfake();
interfake.get('/hello');
```

You're done! `/hello` will now return a `200 OK` response with an empty JSON object as the body. The fluency is the ability to customise responses with chained methods.

```javascript
var Interfake = require('interfake');
var interfake = new Interfake();
interfake.get('/hello').status(200).body({ message : 'what up!' });
```

As you can probably guess, `/hello` now returns a 200, with a body which includes a little message. Great! So easy! But there's more. One of the coolest features of Interfake, in my opinion, is it's ability to dynamically create new endpoints when existing ones have been hit, and that's even easier now with the fluent API.

```javascript
var Interfake = require('interfake');
var interfake = new Interfake();
interfake.get('/hello').status(200).body({ message : 'what up!' }).creates.put('/update-something').creates.delete('/delete-me');
```

Now, when `GET /hello` is hit, `PUT /update-something` is created and will return `200`. When `PUT /update-something` is hit, `DELETE /delete-me` is created. Super easy.

## Quick example: testing a single-page app

I'm going to write a full blog post on this, but in the meantime I've knocked together a quick example of how to test a single-page application using [Zombie.js](http://zombie.labnotes.org), Interfake and NodeJS's native `assert` module.

### Install prerequisites

Create a new directory for the app, and run `npm install interfake zombie` in the directory

### Create test file `spa-test.js`

```javascript
// Include interfake
var Interfake = require('interfake');
var Browser = require('zombie');
var assert = require('assert');
var path = require('path');
var filePath = path.join(__dirname, './');

// Create an API and a browser
var interfake = new Interfake();
var browser = new Browser();

// Serve up this folder as a website so we can test it
interfake.serveStatic('/static', filePath);
// Create the /update endpoint
interfake.get('/update').body({ text : 'Updated text!'});
// Start the server
interfake.listen(3000);

// Use zombie to visit the page
browser.visit('http://localhost:3000/static/index.html')
	.then(function() {
		// When we start, the text of the #target element is 'Not updated!'
		assert.equal(browser.text("#target"), 'Not updated!');
	})
	.then(function() {
		// The 'Update' link will trigger an XHR call to /update and update the text with the response data
		return browser.clickLink('Update');
	})
	.then(function () {
		// Give it a sec...
		return browser.wait(150);
	})
	.then(function () {
		// Voila! It has updated. Magic.
		assert.equal(browser.text('#target'), 'Updated text!');
	})
	.fail(function(error) {
		console.log('Error', error);
		browser.close();
	})
	.done(function() {
		console.log('All asserts passed just fine!');
		browser.close();
	});
```

Now let's create an HTML file, which is the entirety of our single-page app, in the same directory.

### Create app file `index.html`
```javascript
<html>
<head>
	<title>Interfake it 'til you make it</title>
	<script type="text/javascript" src="http://code.jquery.com/jquery-2.1.0.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function () {
			$('#update').click(function (e) {
				e.preventDefault();
				$.getJSON('http://localhost:3000/update')
					.done(function (data) {
						$('#target').text(data.text)
					});
			});
		});
	</script>
</head>
<body>
	<span id="target">Not updated!</span>
	<a href="#" id="update">Update</a>
</body>
</html>
```

### Run those tests!

Back on the command line, type `node spa-test.js` and you should get a nice little confirmation message. Try messing around with the test and simple app that I made here to see what you can come up with.

My next steps are to try and see how best to integrate this with [PhantomJS](http://phantomjs.org) and possibly [PhantomCSS](https://github.com/Huddle/PhantomCSS), though a new solution may be required here.

Anyway, please let me know if you're using Interfake, and if you have any feedback or feature requests. There are more examples over at the [GitHub repo for Interfake](https://github.com/basicallydan/interfake).
