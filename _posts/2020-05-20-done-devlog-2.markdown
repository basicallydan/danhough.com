---
layout: post
title: DoneApp Devlog 2
date_created: 20 May 2020
tags: [devlogs]
location: Vancouver, BC, Canada
---

[Read DoneApp Devlog 1 here](/blog/done-devlog-1).

Every day that I don't work on _DoneApp_ I think to myself, I wish I had a habit tracker to keep track of when the last time I worked on _DoneApp_ was.

This evening after work I created the relationships between `User` and `Task`, and ensured that the relevant controllers were only returning data relevant to the user - and 404ing if they tried to get someone else's data.

It's always a debate whether to use 401, 403 or 404 when someone is trying to access someone else's data with invalid credentials.

As a rule I avoid `401` status codes - that implies no credentials at all. The next one, `403` implies that while you are logged in and the data you're looking for does exist, you don't have access to it.

On the other hand, `404` just says "nope, I don't know what you're talking about." In the case of data which is completely secret to another user, I think this is the best choice. But, say, you were allowed to know there was a Task at an endpoint, and you were logged in, but you didn't have sufficient permissions to, for example, edit that task... that may be call for a `403`.

It's a fun debate.
