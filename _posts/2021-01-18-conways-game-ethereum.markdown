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

ℹ️ Bored of reading already?<br>➡️ Visit [Conway's Game of Life for Ethereum](https://conwaysgame.github.io/solidity-ethereum/).

Since 2014 I have been slowly (very slowly) building [implementations of Conway's Game of Life for different programming languages and technologies](https://github.com/conwaysgame/).

A couple of weeks ago I set out to see if I could write a version of the Game of Life which "runs on Ethereum". In other words, it's a Smart Contract. In other words, it's a Distributed App (Dapp). In other words, it's a small application written in Solidity. There are many ways to describe it but the coolest way, in my opinion is, "it's Conway's Game of Life for Ethereum".

## Try it out

As I'll explain later, installing this on the Ethereum main-net was not on the cards - too expensive - but if you want to interact with it, you can do so using the [Rinkeby Test Network](https://www.rinkeby.io/#stats).

* Visit [the web application](https://conwaysgame.github.io/solidity-ethereum/).
* See the current state of the world.
* (Optional) Get some ETH from the [Rinkeby Faucet](https://faucet.rinkeby.io/).
* Transfer 0.00001 ETH to the contract address (and pay the gas charge) listed on the page<br>(you can do this easily via MetaMask, or just manually).
* Check the web app again, the state of the world should have changed.

I'd recommend also installing [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en), or using [Brave](https://brave.com/) as your browser, in order to make transactions more easily.

---

## How'd I do it?

I started by completing [a Hello World tutorial by Brij Mohan](https://techbrij.com/hello-world-smart-contract-solidity-ethereum-dapp-part-1), and then started from scratch with a new project.

I did it entirely using TDD, so I wrote my tests first (in JavaScript, thank goodness) and then slowly but surely implemented the rules of the game.

I've written many Games of Life, but this was the most challenging.

## Challenges

### "Proper" Programming

Before starting, I was vaguely aware that the more work my contract did, the more 'expensive' it was to run. So, I had to focus on trying to keep it simple and efficient. Normally when doing the game life, I create a two-dimensional array to represent the grid, I loop through all the possible neighbours of each cell and I check if it is on or off the grid. With the languages I've used so far this is straightforward - most use signed integers and automatically allocate memory to store them.

But with Solidity, I tried to make it efficient:

* Tried to make sure I wasn't going to even _try_ to reference a position in the grid that didn't exist (such as `-1`).
* Triedto avoid allocating too much memory for a number, e.g., 16 bits when all I needed was 8.
* Switch between byte arrays and strings, or other types

I suppose what I'm getting at is that I rarely have to deal with "proper" programming problems in my day-to-day, thanks to a combination of laziness, and laziness enabled by some very, very forgiving compilers and interpreters which do most of the work for me. So, this was actually pretty fun and more challenging than usual.

### That's too much gas

I thought I'd need to be careful about allocating memory, and I thought I'd need to use byte arrays instead of strings to avoid casting too often, but I was wrong. After I got it all working, I started thinking more seriously about how much work would be done to deploy and run my contract.

I used the Rinkeby Test network to estimate the gas by running `ConwaysGameOfLife.new.estimateGas()` - 722539 - then looked up how much 1 Gas would be on the main-net at [https://ethgasstation.info/](https://ethgasstation.info/). The number I got for 'standard' speed was 118 Gwei, which means `118 * 722539 = 85,259,602`. In ETH, that's 0.085259602, which is about $112.92 USD at the time of writing. This is hypothetical, of course, until I decide to deploy to the main-net.

To me, for a fun little project which probably nobody would use, that price was too high. I didn't know how much I would be willing to spend, but $112.92 is too much.

So, I set about reading how to improve the efficiency of a contract's deployment using [this little paper](http://article.nadiapub.com/IJGDC/vol10_no12/6.pdf) and implemented some changes. I got rid of some variables and hard-coded the values instead, among other changes. With each change, I'd `compile` and run `ConwaysGameOfLife.new.estimateGas()` again in the console. Down to `708354`, then `644904`. Then up again to `695936` - some things I did, weirdly, made it worse. Unintuitively, using larger integer types such as `uint` (256 bits) instead of smaller (`uint8`) somehow reduces gas costs.

In this process, I also reduced the gas price for a transaction from `370270` gas to `72213` gas. With a gas cost of 118 gwei, that's $57.87 down to $11.29 per transaction.

I also experimented with increasing the size of the world from 5x5 to 10x5 as it looks a lot more fun. That brought the deployment gas price up to `652508` and `106708` for a transaction. But that would have meant re-doing all the tests since the size is now hardcoded in the contract. Not worth it on a project like that.

In the end, I got the gas prices down:

* Deployment gas price: `611944`, which would be equivalent to about $95.63.
  * Saving: `110595`, or $17.29.
* Transaction gas price: `72213`, which would be equivalent to about $95.63.
  * Saving: `298057`, or $46.58.

I was happy with this amount of rewriting in order to get a more efficient contract working.

### Networks

During this project I was familiarised with the concept of "Web 3.0" In this "version" of the web, everything is distributed across a network rather than centralised in servers and served up to clients.

In order to make this work, I had to use a JavaScript library currently injected by wallets such as MetaMask, but which can be injected independently to make the necessary requests.

In this world, rather than my backend being located at an IP address, resolved by a domain such as `gameoflife.com`, it's located at an Ethereum address which is resolved by a contract name such as `GameOfLife`, which may or may not be on the specified network.

It's an interesting paradigm shift, but interacting with it through a web browser currently still involves using traditional HTTP-based servers. Maybe there's a future where that isn't the case?

## Why'd I do it?

The future of cryptocurrencies is uncertain. My own opinions about the future of cryptocurrencies change every day. Nonetheless, at the moment, Bitcoin and Ethereum are in the news more than, say, a year ago. There is a chance there'll be more demand for smart contracts and developers who know how to work with them in the future. In my opinion, it's important for me to keep on learning new skills not only to progress my career, but to make life more interesting.

## Where does the Ether go?

I've set up the contract to forward to (choose: EFF/GraceAid/Internet Archive)
