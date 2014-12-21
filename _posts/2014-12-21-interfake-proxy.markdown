---
published: true
layout: post
title: Interfake updates from 1.10 to 1.12
description: A round-up of the features introduced to Interfake between versions 1.10 and 1.12 incuding
date_created: 21 December 2014
location: 39000 feet above the Pacific Ocean
comments: true
---

Good news, everyone! Interfake 1.12 is now available on npm. If you're not familiar with Interfake already, I recommend checking out the [Interfake GitHub repository](https://github.com/basicallydan/interfake). If you're an existing user, head over to your repo and do this:

```
npm install interfake --save
```

This is the first blog post I've written in a while about Interfake so this could be a good opportunity to go over some features which have been released over the last few months.

### Proxy Support

This is my favourite new feature so I'll do this first. If you need a local API to proxy a remote API for some reason (e.g. for a CORS workaround) then Interfake now will allow you to do that. Not just that, though - Interfake will also allow you to specify headers to send along with your request to the proxied endpoint - maybe you want to save on having to specify them over and over elsewhere, or you need to add Authentication to the requests? That's what this is for.

A simple example:

```js
var Interfake = require('interfake');
var interfake = new Interfake();
interfake.get('/interfake-tags').proxy({
	url: 'https://api.github.com/repos/basicallydan/interfake/tags'
});
interfake.listen(3000);
```

And specifying headers:

```js
var Interfake = require('interfake');
var interfake = new Interfake();
interfake.get('/interfake-tags').proxy({
	url: 'https://api.github.com/repos/basicallydan/interfake/tags',
	headers: {
		'User-Agent': 'Interfake Proxy Whoop',
		'Accept': 'application/vnd.github.full+json',
		'Authorization': 'Basic notmyusername:notmypassword'
	}
});
interfake.listen(3000);
```

In both examples, Interfake will make a request behind-the-scenes to the URL you specify, and the response it gets back it will forward on. Any headers specified in the proxy function will be sent as request headers.

I can see this being very useful in the future!

### `PATCH` support

A good REST API open includes support for the `PATCH` HTTP method. The purpose of this method is represent a partial change to an existing resource. As an example, let's look at an instance of a resource called `Kingdom` located on a fictional API at `/kingdoms/5`. Below is the response to a `GET /kingdoms/5` request.

```json
{
	"id" : 5,
	"name" : "Candy Kingdom",
	"monarch" : "Princess Bubblegum",
	"population" : 10000,
	"hero" : "Finn the Human"
}
```

If we wanted to modify the `hero` property of this resource but leave all else untouched, a very suitable HTTP method to do this with would be the `PATCH` method, sending `{ "hero" : "Jake the Dog" }` to `PATCH /kingdoms/5`. This would probably return a `200` or whatever - but that's not important right now. The important thing is how to implement this kind of functionality using Interfake. We do this using `extends`, like so:

```js
var Interfake = require('interfake');
var interfake = new Interfake();
interfake.get('/kingdoms/5').body({
	'id' : 5,
	'name' : 'Candy Kingdom',
	'monarch' : 'Princess Bubblegum',
	'population' : 10000,
	'hero' : 'Finn the Human'
});
interfake.patch('/kingdoms/5').extends.get('/kingdoms/5').body({
	'hero' : 'Jake the Dog'
});
interfake.listen(3000);
```

There! Simple! Now, when we make a `PATCH` request to `/kingdoms/5`, the body of `GET /kingdoms/5` will change slightly. REST to your heart's content.

### Config Reload

If you're using the command-line interface to Interfake, and loading a file of Interfake requests using `interfake --file myRequests.json` or something like that, then you can now use the `--watch` or simply `-w` flag to make sure that whenever your file is modified, the endpoints will be reloaded with the new config.

This is particularly helpful if you're in a situation where you're trying to spec out an API quickly, and don't want to have to keep quitting and restarting Interfake.

---

That's all for now. Thanks should go to everybody who has opened issues and pull requests over the last few months. Interfake is looking really good now - it's come from being a pretty useful tool to being a really useful tool in a short time. There's still more to do though, and I'd be grateful to anybody who can take the time to [create a pull request](https://github.com/basicallydan/interfake/pulls) or [open an issue](https://github.com/basicallydan/interfake/issues).

As a side note, I'd like to encourage readers of this blog to check out a newer project of mine, [Forkability](https://basicallydan.github.io/forkability). It's the type of project which could really thrive with contribution from a lot of people with a wide range of skills, since it's a linting tool for open-source projects across all different languages. The goal is to encourage better open-source development and leadership by making it easy for people to learn about how well they're already doing. Check it out at https://basicallydan.github.io/forkability, and the source is available at https://github.com/basicallydan/forkability. Thanks!