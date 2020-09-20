---
layout: post
title: How to fix a slow terminal initialisation due to nvm - use fnm instead
date_created: 20 September 2020
tags: [devlogs]
location: Vancouver, BC, Canada
---

TLDR: [`fnm` is a faster alternative to `nvm`](https://github.com/Schniz/fnm) when it comes to initialising new shell. It isn't _quite_ as fully featured but it's worth it IMO.

Like many developers, I more-or-less follow the [instructions for installing `nvm`](https://github.com/nvm-sh/nvm#install--update-script) when I set up a new system, in order to be able to switch versions of `node` quickly.

> ...the script clones the nvm repository to `~/.nvm`, and attempts to add the source lines from the snippet below to the correct profile file (`~/.bash_profile`, `~/.zshrc`, `~/.profile`, or `~/.bashrc`).
>
> ```bash
> export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
> [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
> ```

The line which causes `nvm.sh` to run whenever you open your terminal adds somewhere from 500-1000ms to a shell init time for me. I'm certain I'm not the only person who has this problem because there are several results when you Google for `nvm slows down terminal zsh` which present solutions mainly attempting to lazy-load JavaScript tools whenever they're invoked.

I'm not too keen on creating a script to lazy-load Node, Yarn or whatever. Firstly because none of the snippets worked _immediately_, and I'm super lazy. Plus, at the end of the day, the objective here is to get the appropriate `node` binary on your shell's `PATH`, right? This shouldn't involve a long load. I don't want to wait 500ms every time I run `node` either, while it works out what version to use.

So I searched for `fasterr than nvm` and naturally, Google corrected my spelling. The first result was a [Hackernoon post](https://hackernoon.com/fnm-fast-and-simple-node-js-version-manager-df82c37d4e87), all about [@galstar](https://twitter.com/galstar)'s fantastic `fnm` tool, titled _fnm: Fast and Simple Node.js Version Manager_.

I immediately installed it, put `eval "$(fnm env --multi)` into my `.zshrc` and opened a new shell. No noticeable delay!

I tried `fnm install --lts` - sadly, this isn't an option. Thankfully, I happen to know that `v12` is the LTS version so I used `fnm install v12` and, unsurprisingly, that succeeded.

New terminal - no delay! Did `node` work? Yes!

**Problem solved!**

## Pros and cons

It's worth noting that `fnm` supports `.nvmrc` files, so whatever version a project needs will be installed by `fnm install`.

However, as I already demonstrated, the `nvm` option of `--lts` to fetch the latest Long Term Support version of `node`. There are relevant discussions and PRs about this in the `fnm` repo but I haven't been able to work out a way which will automatically figure out what the LTS version is and download it.

For my purposes, however, this so far has been sufficient, and has already saved me somewhere in the region of 5 or 6 seconds in the last 24 hours, which I of course have used up talking to whoever would listen about how great `fnm` is 😅

Great job, [Gal Schlezinger](https://github.com/Schniz).

## Why this post

First of all, I haven't posted in a while and this felt worthwhile writing about. Secondly, I wanted to give proper kudos to Gal. And finally, I hope that this post will end up being associated with the search term `nvm slows down terminal zsh`, and maybe save some developers some time in finding the alternative to `nvm` that they might be looking for.
