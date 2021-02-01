---
layout: post
title: Conway's Game of Life on Ethereum
date_created: 31 January 2021
location: Vancouver, Canada
comments: true
description: I built Conway's Game of Life to run on the Ethereum Blockchain network, using Solidity - you can use it now!
time_to_read_estimate: 7
twitterCardType: summary_large_image
tags: [cryptocurrency, ethereum, blockchain]
thumbnail: "!SITE_URL!/img/game-of-life-ethereum/game-of-life-eth-tw.png"
ogthumbnail: "!SITE_URL!/img/game-of-life-ethereum/game-of-life-eth-og.png"
---

Want to see it??<br>➡️ Visit [Conway's Game of Life for Ethereum](https://conwaysgame.github.io/solidity-ethereum/).

Since 2014 I have been slowly (very slowly) building [implementations of Conway's Game of Life for different programming languages and technologies](https://github.com/conwaysgame/).

Most recently I set out to write a version of the Game of Life which "runs on Ethereum". In other words, it's a Smart Contract. In other words, it's a Distributed App (Dapp). In other words, it's a small application written in Solidity. There are many ways to describe it but the coolest way, in my opinion is, "it's Conway's Game of Life for Ethereum."

{% include _figure.html src="https://media.giphy.com/media/iuAP1ssht7ufmaxLmo/source.gif" caption="Here's a transaction taking place." %}

## Try it out

As I'll explain later, I decided not to deploy this on the Ethereum main-net, so if you want to play with it, you can do so using the Rinkeby Test Network - or you can just watch as others do.

* Visit [the web application](https://conwaysgame.github.io/solidity-ethereum/).
* See the current state of the world.
* (Optional) Get some ETH from the [Rinkeby Faucet](https://faucet.rinkeby.io/).
* Transfer 0.00001 ETH to the contract address (and pay the gas charge) listed on the page<br>(you can do this easily via MetaMask, or just manually).
* Check the web app again, the state of the world should have changed.

I'd recommend also installing [MetaMask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en), or using [Brave](https://brave.com/) as your browser, in order to make transactions more easily.

---

## How'd I do it?

I started by completing [a Hello World tutorial by Brij Mohan](https://techbrij.com/hello-world-smart-contract-solidity-ethereum-dapp-part-1), and then started from scratch with a new project. This involved using Truffle, a CLI to help with writing and interacting with smart contracts and Ganache, a personal ethereum blockchain (for much quicker development), among some more common JavaScript tools.

I did it entirely using TDD, so I wrote my tests first (in JavaScript, thank goodness) and then slowly but surely implemented the rules of the game.

I've written many Games of Life, but this was the most challenging.

## Challenges

### Unforgiving

Before starting, I vaguely knew that the more work my contract did, the more 'expensive' it was to run. So I focused on trying to make it efficient. Normally when implementing the game of life, I create a two-dimensional array to represent the world, loop through all the possible neighbours of each cell and I check if it is on or off the grid. With the languages I've used so far this is straightforward: many allow signed, negative integers for indexes and automatically allocate memory, and often won't complain if I'm referencing an element which doesn't exist.

With Solidity, I tried to make sure I wasn't going to even _try_ to reference a position in the grid that didn't exist (such as `-1`), since I'd then need to handle an error. It's definitely better to _avoid_ an error here.

In an effort to make my contract more efficient, I tried to avoid allocating too much memory for a number, e.g., 16 bits when all I needed was 8. I also tried to avoid switching between byte arrays and strings, when replacing the old world with the new one, so that less casting would be necessary.

Thanks to a combination of laziness, and laziness enabled by some very, very forgiving compilers and interpreters which do most of the work for me, my day-to-day programming doesn't involve too much thought about performance. So, this was actually pretty fun and more challenging than usual.

### Deployment - too much Gas?!

After I got it all working, I started learning more seriously about the cost of Ethereum transactions. It turns out that despite all this thought about performance and the runtime cost, I had inadventedly made my contract expensive even to deploy onto a network.

Ethereum has this concept of "gas." Each time you perform a transaction of any kind (send ETH, deploy smart contract, interact with smart contract, etc) the initiating party must offer some ETH to the various miners on the network whose hardware processes the transactions. "One gas" is worth an amount in "Gwei", which is a denomination of the currency worth 0.000000001 ETH. That amount can be set by the person initiating, but the recommended price is a value which fluctuates based on supply and demand.

With all of this in mind, I decided to find out how much it might cost to deploy in a fiat currency such as the US Dollar. I opened up `truffle console` to estimate the gas by running `ConwaysGameOfLife.new.estimateGas()`, looked up how much 1 gas would be on the main-net at [https://ethgasstation.info/](https://ethgasstation.info/), and found out the rate of ETH to USD. This is how I worked out the cost.


```
gasPrice = 145                        # Obtained from ethgasstation
gasTxCost = 722539                    # Obtained using `estimateGas()`
ethToUSDPrice = 1305.33               # Obtained from Google
costInGwei = gasPrice * gasTxCost     # => 104768155
costInETH = costInGwei * 0.000000001  # => 0.104768155
costInUSD = costInETH * ethToUSDPrice # => $136.76
```

That's $136.76 USD at the time of writing. This is hypothetical, until I decide to deploy to the main-net.

To me, for a fun little project which probably nobody would use, that price was too high. I don't know how much I'd be willing to spend, but $136.76 is too much.

I Googled how to improve the efficiency of a contract's deployment and found [this little paper](http://article.nadiapub.com/IJGDC/vol10_no12/6.pdf). So I got rid of some variables and hard-coded the values instead, among other changes. With each change, I'd run `truffle compile` and `estimateGas()`.

First, I got it down to **708,354 gas**, then **644,904 gas**. Then it went up again to **695,936 gas**; some things I did made it worse. Unintuitively, using larger integer types such as `uint` (256 bits) instead of smaller (`uint8`) reduces gas costs.

I also experimented with increasing the size of the world from 5x5 to 10x5. That brought the deployment price up to **652,508 gas** and the transaction price to **106,708 gas**. Committing to this, though, would mean re-doing the tests since the size is now hardcoded in the contract. By this point, I had sunk more than enough time into it.

In the end, I settled on a solution with these hypothetical costs:

* Deployment price: **611,944 gas**, which would be equivalent to about $115.82.
  * Saving: **110,595 gas**, or $20.93.
* Transaction price: **72,213 gas**, which would be equivalent to about $13.66.
  * Saving: **298,057 gas**, or $56.41.

I was happy with this amount of rewriting in order to get a more efficient contract working.

### Networks

I've become quite familiar with the concept of "Web 3.0." In this "version" of the web, everything is distributed across a network rather than centralised in servers and served up to clients. It would appear though that for the time being, the only part of traditional web app which gets distributed is the backend.

In order to interact with this backend from a web browser, I had to install `web3`, a JavaScript API for Ethereum, which involved a lot of async `await` statements and polling.

In this world, rather than my backend being located at an IP address, resolved by a domain such as `gameoflife.com`, it's located at an Ethereum address which is resolved by a contract name such as `GameOfLife`, which may or may not be on the specified network.

It's an interesting paradigm shift, but interacting with it through a web browser currently still involves using traditional HTTP-based servers. Maybe there's a future where that isn't the case?

## Why'd I do it?

The future of cryptocurrency is uncertain, and my feelings about the subject change every day. However, Bitcoin and Ethereum are in the news a lot right now, so it feels relevant. There is a chance there'll be more demand for smart contracts and developers who know how to work with them in the future. It feels important for me to keep on learning new skills not only to progress my career, but to make life more interesting.

## Why not put it on the main-net?

As I explained earlier, the gas price for deployment is fairly high. After showing it to a few Ethereum enthusiasts, I came to the conclusion that there was no need to spend the money, buy the ETH and put it on the main-net. There are better uses of this blockchain out there than Conway's Game of Life. My goal here was experimentation and learning, both of which I achieved with the Rinkeby test network. Oh, and if you come across a contract called `ConwaysGameOfLife` on the main-net, unless I edit this post and mention it here, it isn't mine!

## Reflections

I learned that writing basic Smart Contracts for Ethereum isn't too tricky - like with any sofware, there's an input and an output. The challenge, as expected, was getting my environment set up. It wasn't too difficult to do that, though.

I also learned how one can create an interface between "web 2.0" applications and "web 3.0" applications, and the tooling available for that is pretty decent too. <span id="sendEthBlock">For instance, if I wanted to <a href="#" class="sendEthButton">ask for a donation in ETH I could make it super easy with a JavaScript function</a>.</span>

Also, a mind to application performance means a heck of a lot more when the operating cost can be measured in direct, immediate currency transactions, as opposed to a some-time-in-the-future slight increase in AWS fees over time, for example.

---

Remember, you can [take a look at Conway's Game of Life for Ethereum](https://conwaysgame.github.io/solidity-ethereum/) right now. If you'd like to check out the code or maybe make some improvements or raise an issue, [the code is on GitHub](https://github.com/conwaysgame/solidity-ethereum) and I'd love to hear from you.

As a final note, I'd like to offer sincere thanks to [ligi](https://twitter.com/mr_ligi) for trying it out and offering valuable opinions, as well as Reddit users /u/FrequentMushroom, /u/liberated, /u/Phistofeles, /u/hodak2 and /u/squeeze_tooth_paste for trying it also. I'd also like to thank my very good friends for their keen eyes and candid critique: the ever-encouraging and intelligent [Jon Finerty](https://twitter.com/jonfinerty) and [Matt Lewis](https://twitter.com/yjhda).

<script type="text/javascript">
  const sendEthButton = document.querySelector('.sendEthButton');

  if (typeof ethereum === 'undefined') {
    document.getElementById('sendEthBlock').style.display = 'none'
  } else {
    // Sending Ethereum to an address
    sendEthButton.addEventListener('click', e => {
      e.preventDefault()
      if (typeof ethereum === 'undefined') {
        alert('You don\'t have a wallet installed in your browser. Search for Metamask :)')
      } else {
        ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
          debugger
          ethereum
            .request({
              method: 'eth_sendTransaction',
              params: [
                {
                  from: accounts[0],
                  to: '0x860c8513dE758223C59D7dFc544298b4Bf059288',
                  value: '0x5af3107a4000',
                  gasPrice: '0x09184e72a000',
                  gas: '0x2710',
                },
              ],
            })
            .then((txHash) => console.log(txHash))
            .catch((error) => console.error);
        });
      }
    });
  }
</script>
