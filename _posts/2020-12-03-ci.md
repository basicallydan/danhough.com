---
layout: post
title: CI and the Last Line of Defence
date_created: 03 December 2020
description: Your continuous integration tools and pre-merge checks aren't always the best judge.
tags: [development,programming,ci,tdd,continuous integration]
location: Vancouver, BC, Canada
twitterCardType: summary_large_image
time_to_read_estimate: 5
thumbnail: "!SITE_URL!/img/dont-rely-on-ci/ci-rebase-tw.png"
ogthumbnail: "!SITE_URL!/img/dont-rely-on-ci/ci-rebase-og.png"
---

Yesterday I faced a version control situation I rarely face.

It showed me that I may rely a little too much on the green light from CI tools like CircleCI and GitHub Actions when deciding whether it's safe to merge a branch.

Here's what happened:

1. **On Day 1**, a colleague added new `expect` clauses to a spec, plus the code to **pass it**.
2. They merged this into the main branch via a PR.
3. Later in Day 1, I forked off of the main branch,
4. I created a new spec, based on one that my colleague had earlier modified.<br />I worked on it for the rest of the day.
4. **On Day 2**, I made a pull request.
5. Later that day, two colleagues reviewed my work and approved it on GitHub.<br />All the pre-merge checks on CircleCI were passing, including tests and style checks.<br />I rebased and decided to save the merge for the morning.
6. Soon after, an error was found related to the code my colleague had deployed<br />They reverted the PR they had merged on Day 1.
7. On the morning of **Day 3**, I merged my code.

An hour or so later, another colleague tells me that, according to CircleCI, a test I wrote was failing on the main branch. How could this be, they said? It appears to have been passing on the branch it came from!

What is the cause of this mysterious failure?

Having so recently touched that test, I quickly worked out what it was from the error it showed me: In case you haven't figured it out yet, the test I'd written was failing because one of it's `expect` clauses relied on code which had been reverted the evening before.

So, is there a lesson to be learned here?

On one hand, the process is working. There was a merge error caused by the `git` equivalent of a race condition, we were told about it, and we were able to resolve it. Why bother running tests on the main branch before you deploy unless you are concerned that there is a chance they'll fail?

Maybe the lesson is to keep on doing what we're doing.

On the other hand, the process felt like it was disrupting the order of things. Something like this is often said: "if you have a reliable QA and CI process, then if something is on the main branch it should be deployable." And yet here was an anomalous case which suggested otherwise.

Perhaps, then, the lesson is that our QA and CI process isn't robust enough. Should CI create a merged branch behind-the-scenes and run tests on _that_ before allowing the branch to be merged?

I'm not sure. In the meantime, while I try to decide what the lesson is, I think I'll just rebase my branches more often.
