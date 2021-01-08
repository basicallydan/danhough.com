---
layout: post
title: Conway's Game of Life on Blockchain
date_created: 10 January 2021
location: Vancouver, Canada
comments: true
description: I built Conway's Game of Life to run on the Ethereum Blockchain network, usign Solidity - here's how, and what I learned.
time_to_read_estimate: 7
twitterCardType: summary_large_image
tags: [opinions, reviews, podcasts]
thumbnail: "!SITE_URL!/img/gates-jones-questions/gates-jones-questions-thumbnail-tw.png"
ogthumbnail: "!SITE_URL!/img/gates-jones-questions/gates-jones-questions-thumbnail-og.png"
---

Since 2014 I have been slowly (very slowly) building [implementations of Conway's Game of Life for different programming languages and technologies](https://github.com/conwaysgame/).

A couple of weeks ago I set out to see if I could write a version of the Game of Life which "runs on Ethereum". In other words, it's a Smart Contract. In other words, it's a Distributed App (Dapp). In other words, it's a small application written in Solidity. There are many ways to describe it but the coolest way, in my opinion is, "it's Conway's Game of Life for Ethereum".

Believe it or not, it works. Here's the process for using it:

* Go to a web app which is connected to the relevant network
* See the current state of the world
* Get the contract address
* Transfer 0.0001 ETH to the contract address (and pay the gas charge)
* Check the web app again, the state of the world should have changed

I'd love to invite everybody to send me vast amounts of Ethereum in order to power this thing which is essentially a tech demo, but to do so would be irresponsible. Unfortunately, the cost of powering this thing - in terms of amount of Ether - is far too high at the current USD exchange rate.

### Enter the Rinkeby Test Network

TODO: How Rinkeby works and how to get on it to see GOL working.

---

## How'd I do it?

## Challenges

## Try it out
