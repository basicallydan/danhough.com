---
published: false
layout: post
title: Copy files to your iOS app bundle depending on the environment
date_created: 25 June 2014
location: London, UK
---

Sometimes, you can't store your settings in your project. For example, I'm developing an open-source application which uses third-party APIs with private API keys. That's the sort of thing you should neither hard-code nor use as an environment variable in your app, because that means adding it to the source. I didn't want to commit that data to git, and I couldn't add it to my project because the app won't build without missing files. So here's what I did: 

I like to use JSON for most settings-related things because it's a very portable format and easy to write and read. So, for an open-source app I'm working on at the moment I have in the root directory a file called settings.json, which is not part of the repository. It's generated from one of two other files: `settings.debug.json` or `settings.release.json`. Neither of these are in the repo either.

How did I do that? Follow the step-by-step guide below!