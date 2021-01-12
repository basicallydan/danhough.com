---
layout: post
title: Conway's Game of Life on Ethereum
date_created: 13 January 2021
location: Vancouver, Canada
comments: true
description: I built Conway's Game of Life to run on the Ethereum Blockchain network, usign Solidity - you can use it now!
time_to_read_estimate: 7
twitterCardType: summary_large_image
tags: [opinions, reviews, podcasts]
thumbnail: "!SITE_URL!/img/gates-jones-questions/gates-jones-questions-thumbnail-tw.png"
ogthumbnail: "!SITE_URL!/img/gates-jones-questions/gates-jones-questions-thumbnail-og.png"
---

Since 2014 I have been slowly (very slowly) building [implementations of Conway's Game of Life for different programming languages and technologies](https://github.com/conwaysgame/).

A couple of weeks ago I set out to see if I could write a version of the Game of Life which "runs on Ethereum". In other words, it's a Smart Contract. In other words, it's a Distributed App (Dapp). In other words, it's a small application written in Solidity. There are many ways to describe it but the coolest way, in my opinion is, "it's Conway's Game of Life for Ethereum".

Believe it or not, it works. Here's the process for using it:

* Visit [the web application](https://conwaysgame.github.io/solidity-ethereum/)
* See the current state of the world
* Transfer 0.00001 ETH to the contract address (and pay the gas charge) listed on the page<br>(you can do this easily via MetaMask, or just manually)
* Check the web app again, the state of the world should have changed

### Enter the Rinkeby Test Network

TODO: How Rinkeby works and how to get on it to see GOL working.

---

## How'd I do it?

I started by completing [a Hello World tutorial by Brij Mohan](https://techbrij.com/hello-world-smart-contract-solidity-ethereum-dapp-part-1), and then started from scratch with a new project.

I did it entirely using TDD, so I wrote my tests first (in JavaScript, thank goodness) and then slowly but surely implemented the rules of the game.

I've written many Games of Life, but this was the most challenging.

## Challenges

### Proper Programming

Before starting, I was vaguely aware that the more work my contract did, the more 'expensive' it was to run. So, I had to focus on trying to keep it simple and efficient. Normally when doing the game life, I create a two-dimensional array to represent the grid, I loop through all the possible neighbours of each cell and I check if it is on or off the grid. With the languages I've used so far this is straightforward - most use signed integers and automatically allocate memory to store them.

But with Solidity, I had to:

* Make sure I wasn't going to even _try_ to reference a position in the grid that didn't exist (such as `-1`).
* Try to avoid allocating too much memory for a number, e.g., 16 bits when all I needed was 8.
* Switch between byte arrays and strings, or other types

I suppose what I'm getting at is that I rarely have to deal with "proper" programming problems in my day-to-day, thanks to a combination of laziness, and laziness enabled by some very, very forgiving compilers and interpreters which do most of the work for me. So, this was actually pretty fun and more challenging than usual.

### Networks

During this project I was familiarised with the concept of "Web 3.0." In this "version" of the web, everything is distributed across a network rather than centralised in servers and served up to clients.

In order to make this work, I had to use a JavaScript library currently injected by wallets such as MetaMask, but which can be injected independently to make the necessary requests.

In this world, rather than my backend being located at an IP address, resolved by a domain such as `gameoflife.com`, it's located at an Ethereum address which is resolved by a contract name such as `GameOfLife`, which may or may not be on the specified network.

It's an interesting paradigm shift, but interacting with it through a web browser currently still involves using traditional HTTP-based servers. Maybe there's a future where that isn't the case?

## Try it out

I'd recommend starting by installing [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en), or using [Brave](https://brave.com/) as your browser.

## Why'd I do it?

The future of cryptocurrencies is uncertain. My own opinions about the future of cryptocurrencies change every day. Nonetheless, at the moment, Bitcoin and Ethereum are in the news more than, say, a year ago. There is a chance there'll be more demand for smart contracts and developers who know how to work with them in the future. In my opinion, it's important for me to keep on learning new skills not only to progress my career, but to make life more interesting.

## Where does the Ether go?

I've set up the contract to forward to (choose: EFF/GraceAid/Internet Archive)
