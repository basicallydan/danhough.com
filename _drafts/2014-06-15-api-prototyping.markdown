---
published: false
layout: post
title: API Prototyping
date_created: 15 June 2014
location: London, UK
---

API prototyping is the process of iterating through simple, non-functional versions of an interface with little to no up-front design until you've come up with a beautiful interface that works for both it's creators and consumers.

Prototyping is used to test a concept, and save on the time and effort it takes to fully construct the software behind the API. In the modern world of app development (both web and mobile) this usually means creating an HTTP API which simply returns static data which isn't fetched from a database or some other dynamic data source.

One of the benefits of going through this process is a lower barrier to entry for **front-end developers**. Many front-end devs start projects these days with the intention of creating a Single Page App (SPA) which has no direct link to the back-end concerns.

They can create the endpoints they expect to see and give those endpoints status codes, response bodies and headers until they're satisfied that they're working with an API which fits their needs.

For **back-end developers** we get a similar benefit: the ability to iterate on the design of their API until it looks the way they think it should without having to faff about in the proper codebase. They can leave the complex logic until they know what that logic is supposed to produce.

It's important that the back- and front- end devs work together here. The back-ender should be sharing their wisdom and experience in developing APIs and introducing the constraints they think are important as soon as possible, and the front-ender needs to understand those constraints when deciding what they need returned in the response.

The front-end developer writes the code that hits the real API and the back-end developer works with them to come up with a water-tight interface. All the while *actual code* is being written and the design stage can be dramatically sped up.

If you're bogged down with API design work, I'd recommend trying a prototyping process as soon as possible.

## How to get started with API prototyping

There are a few tools available. One of them is something I have developed with the help of some folks on GitHub (Interfake) but there are alternatives if it isn't for you.

**[Interfake](https://github.com/basicallydan/interfake)** is an open-source library and command-line tool written in JavaScript which allows you to create a basic endpoint in a single line:

```new Interfake().get('/ping').status(200).body({ message: "Hello" }).listen(3000)```

That's all it takes to get started. It supports custom headers, dynamic creation of new endpoints and can be started on the command line by loading a JSON file containing your mocked API, as well as [many other features](https://github.com/basicallydan/interfake#api). It's also in active development, so expect new features and improvements. It currently only supports JSON as the response type, but that is the only real limitation; apart from that it is extremely unopinionated.

**Apiary** is a SaaS product which includes an API mocking solution, called [Blueprint](http://apiary.io/blueprint). It's fairly verbose and quite readable, and has many features including the ability to set headers and have parameter-based request URLs. I'd say the main benefit of using Apiary is that it's accessible anywhere, being an online solution, but you do need to have an account for it and it won't work well in tests.

**Fortune.js** is a framework for prototyping hypermedia APIs with built-in database adapters including the dependency-free NeDB. It also implements the work-in-progress [JSON API standard](http://jsonapi.org/), so it promotes a good approach to API design but as a result is quite opinionated, which isn't necessarily for everyone. It does a lot of the heavy lifting, though, so it's a good way to get a CRUD app set up quickly.
