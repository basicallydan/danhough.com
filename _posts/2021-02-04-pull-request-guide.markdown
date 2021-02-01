---
layout: post
title: How To Write Better Pull Requests
date_created: 04 January 2021
location: Vancouver, Canada
comments: true
description: I built Conway's Game of Life to run on the Ethereum Blockchain network, using Solidity - you can use it now!
time_to_read_estimate: 5
twitterCardType: summary_large_image
tags: [programming, process, pull requests]
thumbnail: "!SITE_URL!/img/game-of-life-ethereum/game-of-life-eth-tw.png"
ogthumbnail: "!SITE_URL!/img/game-of-life-ethereum/game-of-life-eth-og.png"
---

# The Goal

Over the years, I've seen many Pull Requests (many of them my own) languish for a week in the PR tab of a GitHub repo only to be hastily reviewed a day before the end of a sprint after some heavy encouragement from the author and a misguided sense of needing to wrap everything up in time for either a legitimate hard deadline, or even the arbitrary ones that many software teams set for themselves.

This is bad because at best, it increases the mental load of the author and reviewer, both of whom would probably rather just be coding, and at worst, it opens those teams up to shipping less-than-perfect code that could cost the team time or money.

So, let's go over some things I've learned over the past few years about writing the kinds of pull requests that people are happy to see land in their inbox.


## 2. Explain your Changes in Plain Language

## 3. Keep it Snappy

## 4. Review it Yourself in Draft, first

## 5. Provide Screenshots

Visual cues can really help get a reviewer in the right mindset. As we all know, [context switching is the mind killer](http://spacepod.org/uprising/context-switching-mind-killer/).

## 6. Provide QA Steps

This isn't a test of how intuitive your UI is - it's not a test of whether your reviewer is good at working out how to get from A to B. Give them an idea of what they should be doing and what they should expect your software to do.

## 6. Bonus: Delete the Template Placeholders

This is more of a pet peeve - some people really don't mind seeing this, but I am very much put off when I see things like `[Describe the problem in detail]` or `<INSERT QA STEPS HERE>` in the description of a pull request. It's just a bad first impression. It gives me the sense that you don't care about my experience of reading your pull request.
