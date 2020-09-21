---
layout: post
title: DoneApp Devlog 4
date_created: 31 May 2020
tags: [devlogs]
location: Vancouver, BC, Canada
---

[Read DoneApp Devlog 3 here](/blog/done-devlog-3).

Just a small update from last night. I decided today would be the day I got it online somewhere. It was not straightforward, but mainly because my VPS was really out-of-date.

As I may have mentioned before I started the API as a Docker-containerised Rails application, which has been nice as far as jumping in and out of work is concerned.

It should, in theory, make it super easy to get online, too. But I was not in the mood for messing around with AWS, but I turned to my handy, reliable VPS box. I logged in, tried to install docker, was thwarted by "missing x, y, z dependencies" messages and used that as a prompt to get my VPS in order. I realised that half of the websites configured to run were from projects I'd long since abandoned, so while it was updating from Ubuntu 14.04 -> 16.04 -> 18.04, I went through the DNS settings for my provider and deleted a bunch of stuff.

I realised that at one point, I had 15 domain names on the go. Luckily this wasn't my first round of digital spring cleaning, and a few months ago I went through my Hover settings and let a few of them expire.

Anyway, once the updates were complete, I configured an nginx site to forward traffic on a subdomain of this very website to `0.0.0.0:3000` where I expected the docker container for the API to be running. Then, cloned the repo, installed `docker` and `docker-compose`, and started it up. Then I set up [`react-native-config`](https://github.com/luggit/react-native-config) on the smartphone application and set up a config file for both local and production, and... it worked! Magic!

Although I'm still far from complete, this was a reasonably major hurdle. Now, I can test the app on a real device.

I don't think this is sustainable, though. This will do for now but eventually I'll want to run it separate from my VPS, somewhere more scalable, such as AWS ECS.

Next up is a bit of styling and state management on the frontend, so expect more screenshots/casts in the next update.

I'm tracking progress [here](https://trello.com/c/mV3MomJ6/42-doneapp).
