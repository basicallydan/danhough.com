---
layout: post
title: Interfake, Just-Add-JSON HTTP APIs
date_created: 02 December 2013
location: London, UK
---

Interfake is a new NodeJS module I've been developing on-and-off to help with some projects.

It's a quick, easy and platform-independent way for developers working on applications to spin up dummy APIs using a single JSON file. I'll show you how to use it in this quick guide. Alternatively, skip this stuff and go [straight to GitHub to check it out](https://github.com/basicallydan/interfake).

### Install

```
npm install interfake -g
```

### Create your API Endpoints

Make a JSON file which matches this format:

```
[
	{
		"request": {
			"url": "/books",
			"method": "get"
		},
		"response": {
			"code":200,
			"body": {
				"books": [{
					"id":1,
					"title":"The War of the Worlds"
				}]
			}
		}
	}
]
```

At the root of the JSON we have an array, which contains any number of request/response pairs.

**The Request:** This just contains an absolute path for the `url` to respond to and an HTTP `method` which should match with this URL.

**The Response:** This contains an HTTP status `code` to send back to the client and the `body` (also just JSON, for now) which should be returned with that code.

### Mutating/Overwriting Responses

So, it's pretty simple to come up with a basic dummy API which services up GET requests. What about when you want your API to respond to requests which you'd expect to make changes? Consider this dummy request/response pair:

```
[
	{
		"request": {
			"url": "/books",
			"method": "post"
		},
		"response": {
			"code":201,
			"body": {}
		},
		"afterResponse": {
			"endpoints": [
				{
					"request": {
						"url": "/books",
						"method": "get"
					},
					"response": {
						"code":200,
						"body": {
							"books": [
								{
									"id":1,
									"title":"The War of the Worlds"
								},
								{
									"id":2,
									"title":"Ender's Game"
								}
							]
						}
					}
				}
			]
		}
	}
]
```

If we **add this to the original example**, we should end up with a GET request which, at first will return from `/books` just *The War of the Worlds* as one of the books in the response. But when we make *any* POST request to that same endpoint, the original GET request is overwritten, and the new one specified in the `afterResponse` property is used instead, because the `url` and `method` match the original.

This is a really useful feature for anybody who is using Interfake to run automated UI tests which require a dummy HTTP API underneath, since it can respond to user interactions which trigger changes.

### Static pages

Since this is platform-independent we need to be able to support single-page JavaScript apps which run off of APIs. One of the limitations of using the Web for your apps is the cross-origin domain policy that many older browsers have a problem with. If this is a problem for you for some reason, or you simply want the ease of having your API and your content on the same domain then you can specify a path from which to serve up static content. Keep in mind, though, that if you do this your API will be served up under the `/api` endpoint - in other words, our example above would be found at `/api/books` instead of just `/books`.

### Creating new endpoints on-the-fly

You can also spin up new endpoints using HTTP requests. Using the same structure as the example JSON above, send a `POST` request to the `/_request` endpoint. Here's a mathematical example:

```
curl -X POST -d '{ "request":{"url":"/whattimeisit", "method":"get"}, "response":{"code":200,"body":{ "theTime" : "Adventure Time!" } } }' http://localhost:3000/_request --header "Content-Type:application/json"
```

This is particularly useful when you're running tests where the data isn't always the same, and sometimes depends on semi-random or time-related data. In this case, you can tailor the requests you need during the test, as the data evolves.

### That's all for now: Fork it?

The code is all available at https://github.com/basicallydan/interfake, and I'd welcome some help to improve it in any way.

### The Future

In particular, I'd like to add the following features:

* Create a guide/some examples for how to integrate this with existing test frameworks, whether written in JavaScript or not
* Improve the templating, so that a response might include a repeated structure with incrementing counter variables and randomised bits of data, like so:

```
[
	{
		"repeat": 2
		"request": {
			"url": "/books/{id:int}",
			"method": "get"
		},
		"response": {
			"code":200,
			"body": {
				"books": [{
					"id":{id:int},
					"title":"{random:lorem-ipsum:30}"
				}]
			}
		}
	}
]
```

Would produce the following endpoints: **(Note this is still just an idea for a future feature - don't try this yet!)**

```
[
	{
		"request": {
			"url": "/books/0",
			"method": "get"
		},
		"response": {
			"code":200,
			"body": {
				"books": [{
					"id":0,
					"title":"Lorem ipsum dolor sit amet."
				}]
			}
		}
	},
	{
		"request": {
			"url": "/books/1",
			"method": "get"
		},
		"response": {
			"code":200,
			"body": {
				"books": [{
					"id":1,
					"title":"Duis a dapibus risus."
				}]
			}
		}
	},
]
```

Something like that, anyway.
