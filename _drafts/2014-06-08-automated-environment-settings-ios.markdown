---
published: false
layout: post
title: Environment-specific settings for your iOS app in Xcode
date_created: 14 June 2014
location: London, UK
---

If you're like me you want to automate all the things. Like me you may also want to use a bunch of different settings for your app which change depending on whether you're debugging, or releasing for production, or whatever.

I like to use JSON for most settings-related things because it's a very portable format and easy to write and read. So, for an open-source app I'm working on at the moment I have in the root directory a file called settings.json, which is not part of the repository. It's generated from one of two other files: `settings.debug.json` or `settings.release.json`. Neither of these are in the repo either.

How did I do that? Follow the step-by-step guide below!