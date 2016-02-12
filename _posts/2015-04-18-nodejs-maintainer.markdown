---
published: true
layout: post
title: How to be a better NodeJS Module Maintainer
date_created: 18 April 2015
location: London, UK
comments: true
---

This post will share with you some of the lessons I've learned as a developer and maintainer of some NodeJS modules available on NPM, and from watching what others do with *their* projects. Naturally, this is just going to be the way that *I* do things. Others may have completely different ways, some of which I might find a lot better. This blog post is adapted from a talk I gave at LNUG in London, which [you can watch here if you're not in a reading mood](https://www.youtube.com/watch?v=rCM2paoike0).

## I've written my Node module. Now what?

Congratulations, you've finished a fine piece of work. Your hypothetical example module, `blogPostGenerator`, is going to make it easy for hypothetical example blog authors to write new hypothetical example articles with minimal effort.

But they can't benefit from your excellent work unless they know:

✓ How to use it
✓ That it does what it says it does
✓ Whether it's going to be maintained and kept up-to-date
✓ Whether it's reliable enough to use in production
✓ That is exists

Let's look at some of the things we can do to ensure your module is as inclusive and accessible as we can reasonably make it. Just so you know, most of the examples I give here are for some kind of command-line and generally use globally installed NodeJS modules, so they should work the same regardless of your operating system.

## Target Everyone

Examine your dependencies. Are any of them unsuitable for or incompatible with a web browser? If they're all compatible with a JavaScript browser runtime, there's no reason why your targeted set of users shouldn't include front-end developers.

By using a tool like [Browserify](http://browserify.org) you can compile your code into a single JavaScript file to be used in front-end projects. Stick this in a `/bin` or `/dist` folder, and don't forget to [ugilify](https://github.com/mishoo/UglifyJS) it too!

~~~bash
browserify index.js > blogPostGenerator.js
# see http://browserify.org
uglify blogPostGenerator.js > blogPostGenerator.min.js
# see https://github.com/mishoo/UglifyJS
~~~

## The Art of a good README

In case you've never noticed before, the README is a file in the root of a program's source code directory structure which should be read before using that program. Someone looking at your project for the first time should be given all the information they need to get started with it.

That doesn't mean it needs to include comprehensive documentation, but for simple modules that don't do many things, you might as well put it all in there.

Simply writing down how to use your API is not enough. **Include examples.** This is a very important rule. Think of some common use cases for your code and show people how your module can solve their problem in that use case.

<blockquote class="large center"><span markdown="1">Simply writing down how to use your API is not enough.<br />**Include examples.** This is a very important rule.</span></blockquote>

As for how to write it, you should **definitely** use [Markdown](http://en.wikipedia.org/wiki/Markdown) rather than plain text. Markdown is much easier to read on GitHub or npm.org (which is where most people will be reading it) because it will be rendered as HTML. It's easy to get started with Markdown - simply using headers (e.g. `###` for H3) is enough to make a big difference.

You should also include a **change history/log**, instructions on **how to test your module**, how to **compile and/or install it**, and, importantly, **how to contribute** to it.

There are many ways to specify this information. For how to install or compile you could use an `INSTALL.md` file, and for how to contribute you could use `CONTRIBUTING.md`. I would recommend this for larger, more mature projects, but when you're just starting out a `README` on its own is good.

## The Importance of Good Dependency Management

We're probably all familiar with `npm install` and `npm install --save` to install and save dependencies, but here are some other commands which are helpful for making sure your dependencies are properly managed.

### `npm version`

This is pretty cool: not only will `npm version` update the version code in `package.json`, it'll also create a new git commit for the version, and a new git tag at that commit that looks like `v1.3.2`. This tag structure is a common convention for version tags on GitHub. This version should follow the [Semantic Versioning system](https://semver.org), which `npm` expects modules to use in order to ensure compatibility with dependencies.

`npm version` takes an option to specify what type of a version bump this is: Major, meaning a change which alters existing APIs in some way; Minor, meaning an addition or change which does not modify existing APIs; and patch, usually meaning a bug fix, or some refactoring which does not affect behaviour. For example, if you've added some new config options you might use `npm version minor` - but if you change the `generateBlogPost` function to be called `writeBrilliantBlogPost`, then it's a major change because it changes an existing API.

Since `npm version` creates a git commit, you can specify a commit message. Just like with `git commit`, you can do this with the `-m` flag:

~~~bash
npm version minor -m "Up to version 3.4.3, yay!"
~~~

### `npm shrinkwrap`

What does it do? It will create a file called `npm-shrinkwrap.json` which will contain all the dependencies of your project, *their* dependencies, and so on, at specific versions - the versions you currently have in your project.

Why is this important? It's important because not everybody respects the rules of semantic versioning, and because even when people *do* respect the rules of semantic versioning, problems can still arise between minor "non-breaking" versions.

This means that whenever anybody installs your module or clones your project and runs `npm install`, the dependency versions they get will be exactly the same as the ones you had when you ran `npm shrinkwrap`.

You can also specify to shrinkwrap the `devDependencies`, which will be useful for people cloning your project from its source. Do that using `npm shrinkwrap --dev`. I would recommend this most of the time.

### `npm prune`

This is a useful command if you're using `npm shrinkwrap`, because it will remove any installed modules which are not added as dependencies, perhaps because you were trying them out temporarily, or something. If you have un-saved dependencies, and you try to run `npm shrinkwrap`, you'll get an error to do with `extraneous dependencies`. At this point you should run `npm prune`, and try `npm shrinkwrap` again.

## A pre-publish checklist

Let's go through a quick checklist of what to do when you've got a new version of your module that you'd like to publish.

1. What's the next version?<br />If you're currently on `0.23.3` and it's a bugfix/patch, it'll be `0.23.4` next.
2. Update the changelog either in `README.md` or `CHANGELOG.md`. Add an entry for the day you're publishing, saying what the change was.
3. Make sure your dependencies are locked down to certain. Run `npm prune` then `npm shrinkwrap --dev`.
4. If you're targeting the front-end, compile your code using `browserify`
5. Commit these changes, you don't need to mention the version code yet...
6. Run `npm version` with `major`, `minor`, or `patch` and a message, using `-m` - this will be your commit message.
7. Do a quick `git push`
8. You're done! `npm publish` will push changes to npm. Well done!

## Interacting with your community

Not specifically to do with Node modules, this is some general advice for open-source projects. Once you start open-sourcing your work and people start opening issues and pull requests, you've created a small community. Remember that in this community are real people with real feelings, who put real time into making your project a little bit better.

With that in mind, I think it is of huge importance to publicly recognise contributions. I normally make either a `contributors.md` file or put a list of contributors directly in the `README` with links to GitHub profiles so that they get a little bit of exposure for their projects when people see their names on yours. Also, whenever a new version is cut, if someone's hard work contributed to the completion of that version, I like to recognise them in the Changelog too.

<blockquote class="large center"><span markdown="1">Your community of contributors is made up of **real** people with **real** feelings, who put **real** time into making your project a little bit better.</span></blockquote>

I guarantee you that if you do this, not only will you encourage more contributors, you'll get a warm, fuzzy feeling inside, and so will your new open-source-co-workers.

People also need to be responded to as quickly as possible. If someone opens an issue or a pull request, you shouldn't put it off for weeks. I think it's safe to say that because you're doing this work for free, nobody expects you to treat it like a full-time job. But if you get a second simply to tell someone that their issue or PR has been seen, it's a nice thing to do. Nobody likes to be ignored! And if someone's PR isn't going to be merged, you should be honest: tell them so, and why it isn't going to happen. Perhaps they can fix a couple of things in their fork and then try again.

## Is it done?

Let's revisit our checklist from the beginning. How did we check off each of the points?

✓ **How to use it** -- You've written documentation *and* examples too. That should do it!
✓ **It does what it says it does** -- The examples should cover this, too.
✓ **Whether it's going to be maintained and kept up-to-date** -- Having a changelog, and responding quickly and usefully to issues and PRs should reassure people.
✓ **Whether it's reliable enough to use in production** -- You've told them how to compile and test it, so now your users can figure out how it does what it does.
✓ **That is exists** -- it's published, so if people search for it on npm, they'll find it!

I hope this has been helpful to some folks out there. If you have any more tips to share, leave them in the comments or drop me a line! :smile:

**Thanks to:** Jon Kelly for his comprehensive and feedback about content and language, and [Orlando Kalossakas](https://twitter.com/orliesaurus) for his feedback about layout and readability.
