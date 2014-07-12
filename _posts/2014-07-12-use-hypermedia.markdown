---
published: true
layout: post
title: You should use hypermedia in your API
date_created: 12 July 2014
location: London, UK
---

Let's get something straight, API Developers of the World: **Your JSON API should [include hypermedia links](http://en.wikipedia.org/wiki/HATEOAS)**. (and [it might help to do it using HAL](http://stateless.co/hal_specification.html)). Why? I'll give you three reasons. This list is not exhaustive.

## Reduced coupling between API and Consumer

The consumer doesn't need to know the structure of your API URLs if they're being handed it. In fact, they never have to build a link again if they know where in the response to find the link they're looking for.

## Implied permissions

If you make an authenticated request, and a link is advertised in a response, (i.e., being sent on behalf of a logged-in user) that means the user can access that resource. If it doesn't, they can't. So, your app developer knows whether to grey out that button or not.

## Developer browsability

You want developers to use your API? You'd better make it easy to navigate and explore so they know what they're working with. [Try using the GitHub API](https://developer.github.com/v3/). It's easy, and it's a joy. Why? Hypermedia, that's why.

---

Convinced? Great, go to it.

For further reading, [Mike Kelly frequently writes about hypermedia and APIs](http://blog.stateless.co/).