---
layout: post
title: PhoneGap isn't quite as bad as you think (if you know how to use it)
date_created: 23/05/2014
location: London, UK
---

If you read my blog you'll know that I have been using PhoneGap recently for a client's project. I published a post back in February titled [How to use Gulp, Browserify and Ripple in harmony for your PhoneGap app](http://danhough.com/blog/gulp-browserify-phonegap-ripple/), which is about using the Gulp task runner to make your life slightly less hellish when using PhoneGap, and it is still a fairly popular post now, probably because a lot of people struggle with PhoneGap early on.

So I figured that after about 3 and a half months of experience with the cross-platform development tool I might be able to share some of the things I've learned about using it effectively.

**Note:** I'm 99% sure that all the advice in this article will apply to Cordova *and* PhoneGap.

## Pre- and post- build scripts

It's not very well known that PhoneGap allows you to run scripts, or "hooks" as they are called, at various stages in the build cycle. 

## The relationship between PhoneGap and Cordova

It seems confusing at first, but the important thing to know is that as technologies they are mostly interchangeable. If that's all you needed to know, you can skip this section.

### Cordova

According to the Cordova website:

> Apache Cordova is a platform for building native mobile applications using HTML, CSS and JavaScript
	
