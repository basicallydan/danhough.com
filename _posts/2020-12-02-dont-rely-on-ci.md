---
layout: post
title: Don't Rely on Just CI
date_created: 02 December 2020
description: Your pre-merge checks aren't always the best judge.
tags: [development,programming,ci,tdd]
location: Vancouver, BC, Canada
twitterCardType: summary_large_image
time_to_read_estimate: 10
thumbnail: "!SITE_URL!/img/ts-game-of-life/game-of-life-tw.png"
ogthumbnail: "!SITE_URL!/img/ts-game-of-life/game-of-life-og.png"
---

Today I faced a version control situation I rarely face these days and it reminded me that I sometimes rely a little too much on the green light from CI tools like CircleCI and GitHub Actions when choosing whether it's safe to merge a branch. Here's what happened:

1. On Day 1, my colleague merged in a change which involved adding some new `expect` clauses to a test spec, and, of course, the code which caused that clause to **pass**.
2. Later in Day 1, I forked off of the main branch, and created a new spec based on one of the existing ones including the new clause that my colleague added.
3. On Day 2, I made a pull request.
4. Soon after on Day 2, two colleagues reviewed my work, and approved it on GitHub. All the pre-merge checks on CircleCI were passing, including tests and style checks.
5. Later in Day 2, my colleague had to revert the work they merged in on Day 1.
6. On the morning of Day 3, I merged my code.

An hour or so later, another colleague tells me that a test I wrote was failing on the main branch in CircleCI. How could this be, they said? It appears to have been passing on the branch it came from!

I quickly worked out what it was from the test error.
