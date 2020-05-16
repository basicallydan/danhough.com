---
layout: post
title: DoneApp Devlog 1
date_created: 15 May 2020
tags: [devlogs]
location: Vancouver, BC, Canada
---

I've been working on a sort of hybrid task manager/event reminder/habit tracker called _Done_, or _DoneApp_ (on my [ideas trello board since 8 Apr 2019](https://trello.com/c/mV3MomJ6/42-doneapp)). I'm not sure which name I prefer yet.

So far here's my progress:

## API

I started by just creating a blank Ruby on Rails project as that's what we use at [Jungle Scout](https://junglescout.com) and I don't think I've ever done a whole RoR project for myself from scratch. After starting I learned that I could make an API-only project which is a little slimmed down. Since I'm only doing this for smartphones for the time being I only really need an HTTP API but I kinda got quite deep before realising that it was an option so for now it's a regular Rails app which happens to only serve JSON.

I put it together by creating a docker container with a `db` service (on postgres) and a `web` service, which I think is a pretty common thing to do in this situation. Why postgres, you ask? Why not? I reply. I need a relational database and I'm currently using it a lot at work so it seemed like the right choice and there's plenty of resources online.

- CRUD on creating Tasks, which just name a name, interval unit (day/week/month) and interval (1, 2, etc)
- CRUD on creating a "Check In" for a task. These `belong_to` Tasks and they simply have an `occurred_at`
- Auth on all the above controllers ^ plus an endpoint to create a new User - although the auth currently just checks for any user - the user doesn't have to have access to any of the items.

I'm going for semi-RESTful. I was tempted to do GraphQL - and in fact I did start doing that last year at one point - but I decided I wanted to move quickly on this and work with something I'm much more comfortable with.

Next I'll probably be working on associating Tasks to Users. I am going to do it using a linker table so I can create many-to-many relationships, in case in future somebody wants to have a shared task. (couples/co-habiters who both need to keep track of a plant that needs watering?)

## iOS

I decided to go down the React Native route. I could've gone back to my iOS days and written something in Swift and/or Obj-C but I'm also writing a lot of React at the moment so it's nice to stay in the same headspace. Plus I wanted to see how slick I could make it with what feels very much like front-end code. The answer is: fairly slick so far.
