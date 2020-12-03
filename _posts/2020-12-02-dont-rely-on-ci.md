---
layout: post
title: Don't Rely on Just CI
date_created: 02 December 2020
description: Your pre-merge checks aren't always the best judge.
tags: [development,programming,ci,tdd]
location: Vancouver, BC, Canada
twitterCardType: summary_large_image
time_to_read_estimate: 5
thumbnail: "!SITE_URL!/img/dont-rely-on-ci/ci-rebase-tw.png"
ogthumbnail: "!SITE_URL!/img/dont-rely-on-ci/ci-rebase-og.png"
---

Today I faced a version control situation I rarely face these days.

It reminded me that I sometimes rely a little too much on the green light from CI tools like CircleCI and GitHub Actions when deciding whether it's safe to merge a branch.

Here's what happened:

1. **On Day 1**, a colleague added new `expect` clauses to a spec, plus the code to **pass it**.
2. They merged this into the main branch via a PR.
3. Later in Day 1, I forked off of the main branch,
4. I created a new spec, based on one that my colleague had earlier modified.<br />I worked on it for the rest of the day.
4. **On Day 2**, I made a pull request.
5. Later that day, two colleagues reviewed my work, and approved it on GitHub.<br />All the pre-merge checks on CircleCI were passing, including tests and style checks.<br />I rebased, and decided to save the merge for the morning.
6. Soon after, an error was found related to the code my colleague had deployed<br />They reverted the PR they had merged on Day 1.
7. On the morning of **Day 3**, I merged my code.

An hour or so later, another colleague tells me that a test I wrote was failing on the main branch, according to CircleCI. How could this be, they said? It appears to have been passing on the branch it came from!

I quickly worked out what it was from the test error: In case you haven't figured it out yet, the test I'd written was failing because one of it's `expect` clauses relied on code which had been reverted the evening before.

As far as I can remember, I don't think I've been burned by this particular problem before, though I'm sure I don't always merge fully-up-to-date branches.

Perhaps I've never worked on a codebase as well-covered by tests as Jungle Scout's, or so well-served by CI tools. Or perhaps I've just been more diligent about rebasing my branches before merge in the past.

Either way, the lesson is clear: You can have people review the code, the tests and style checks can report that it's fine and GitHub can tell you there are no merge conflicts - but a last-minute rebase before merging might still be worth doing.

One way to automate a solution to this particular edge case would be for CI to create a merged branch behind-the-scenes and run tests on _that_ before passing. I'll bring it up at our next engineering standards meeting. In the meantime:

**Don't get lazy with the rebase!**
