title: On the benefits of API Prototyping

This article is aimed at developers, product managers and software architects who are already bought into the idea that developing and API which is functionally and conceptually separate from the UI part of a piece of software. You may be developing a web application or mobile application, but whatever it is you've decided to keep the UI completely separate from the backend. Specifically, I'm going to talk about prototyping HTTP APIs.

A common route to go down for this is for one developer/team to sit on one side of the desk and start developing a beautiful REST API, while another developer/team sits on the other side, hacking away at a front-end which points at the nascent API, or perhaps writing tests to create their front-end.

API prototyping is the process of rapidly creating and iterating on your API design with a real, working prototype which can be used by a consumer such as a web app or a mobile app.

This is a useful technique for developing both the front-end and back-end because it allows the developers to work out the contract between the two parts in practice instead of just in design and can speed up development of both. Let's talk about why with the help of our fictional friends, **Barry the front-end developer** and **Gemima the back-end developer**.

## Lower barrier to entry for front-end developers

Barry doesn't like developing APIs, which is why he became a front-end dev. His particular style of working is to get straight into the guts of the work. Set up the models, the API handlers, the templates and the views, and start working on real stuff. But instead of typing in hard-coded strings to represent the data, or intercepting API requests in his code, he sets up a quick fake API which he hosts locally and points his API handlers at.

Barry doesn't have to go and ask Gemima to set up an API for him because he has API prototyping tools at his disposal - tools which are designed specifically for the purpose of creating quick and dirty APIs. They may not be pretty and they may not be final but at least for now he has something to work with.

## Faster feedback loop for back-end developers

Gemima has a lot of tasks ahead of her for making a fully-fledged backend. Apart from creating the public-facing API she also has to come up with a decent way of connecting that to the data model, set up a queuing system for more complex requests, implement payment handlers and all manner of complex things, but she knows that Barry is relying on her input for getting the contract worked out between the API and the front-end.

With the same API prototyping tools she can work with Barry to come up with a sensible API. She can look at what Barry has come up with, refine it based on her vast wisdom of API best practices and send it back.

When Barry tells Gemima five minutes later that they're missing a couple of pieces of data or that the route for a particular endpoint is hugely ambiguous, they can refine it quickly and get on with some proper work.

## Zero up-front design

Barry and Gemima are developers, and they hate having to write huge design docs. If they have an API prototyping tool at their beck and call they don't actually need to specify how the API is gonna look, they can just start writing it *directly*.