Interfake is a new NodeJS module I've been developing on-and-off to help with some projects.

It's a quick, easy and platform-independent way for developers working on applications to spin up dummy APIs using a single JSON file. I'll show you how to use it in this quick guide.

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

This is particularly useful when you're running tests where the data isn't always the same, and sometimes depends on semi-random or time-related data, since you can tailor the request during the test.

### That's all for now: Fork it?

I'd like to add some more features to this tool. Particularly, I'd like to do the following:

* Create a guide/some examples for how to integrate this with existing test frameworks, whether written in JavaScript or not
* Improve the templating, so that a response might include a repeated structure with an incrementing counter or randomized data