---
published: true
layout: post
title: Introducing Forkability
date_created: 27 August 2015
location: Seoul, South Korea
comments: false
---

## The Problem

You fork a GitHub repository because you've spotted a bug or want to implement a new feature. You're full of enthusiasm, you can't wait to get involved and write some code, but... well, you're not sure where to start. Maybe the CONTRIBUTING file can help you out here, perhaps there's some other platform for bug tracking, or someone you should contact.

Oh. No CONTRIBUTING file. That's a shame. Well, perhaps the README has something.

Nope, a pretty bare readme: only the minimum of documentation there.

Maybe the project is no longer maintained? Better check the CHANGELOG, see when the last release was.

Oh, no CHANGELOG. Nor any tags. Great. You know what? Let's just dive in and explore the code, run some tests, and...oh. No tests. That's a shame. Well, you can still explore the code, just gotta open the project file... oh, what's this? User-specific project settings, messing up your IDE? That's kinda annoying.

This repo is a mess. Maybe it's time to hit the issues page.

There are 50 unanswered issues. Some of them are about your bug or feature from other GitHub users. Is the maintainer of this project working on any of the issues already? Are they even still looking at the project or any of the issues? There's no real way to know.

## A linter for your repository

Forkability is a JavaScript library, command line application and web application which will read your repository details and make suggestions for ways to make it more "forkable", or in other words, easier for newcomers to contribute to. The best way to try it right now, to get the best idea of it, is to visit the [web application](https://basicallydan.github.io/forkability/) and enter your repository details.

Itll suggest to you files that you should or shouldn't have in the repository, it'll point out when there are a few issues or pull requests which haven't yet been addressed, and whether the repo is making use of git tags or not (a very useful way to mark versions, dontcha know).

It's also installable using `npm install forkability -g` so that you can use the `forkability` command-line application, or just `npm install forkability --save` in your JavaScript package/application. It works just fine both in NodeJS or in a browser.

I like to describe it as a "linter".

### Language Support

Forkability has language-specific feature rules and it's pretty easy to extend in that sense. For example, NodeJS projects tend to have `node_modules` folders to store dependencies' code, but these usually should not be committed to repositories. If you tell Forkability that your project is a NodeJS project, it'll point out mistakes like that.

As another example, C# projects normally have a `.proj` file, or some other project file. Forkability will point out if you've forgotten to commit it.

There are more rules in place for both of these languages, but Python and Perl are also supported at the moment. More languages or platforms can be supported with your help!

### Goals of the project

One of the things I like in a open-source repository is a description of the long-term goals of the project. It helps to align thinking and help people to understand whether their suggestion or pull request will be accepted, and why it might go either way. To quote directly from Forkability's README, here are the long term goals of the project.

* Give people a recognisable score for the open-source-friendliness ("forkability") of their project
* Inform people about the open-source movement
* Educate people on the benefits of open-sourcing their code
* Tell people about how they can improve the "forkability" of their project

### How to get involved

Forkability is extremely open to suggestions. It's still a fairly new project, and only four language-specific rulesets are currently in place.